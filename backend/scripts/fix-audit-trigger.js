import { sequelize } from '../config/database.js';

/**
 * Script para corregir y enriquecer el sistema de auditoría de ConexCoffee:
 * 1. Actualiza la función de trigger `auditoria.fn_auditar_calidad()` para que
 *    capture siempre: usuario_id, direccion_ip, agente_usuario y fecha_evento.
 * 2. Lee automáticamente de la sesión de PostgreSQL (app.current_user_id) o
 *    resuelve inteligentemente la relación según la tabla (catador_id -> usuario_id,
 *    caficultor_id -> usuario_id, laboratorio_id -> usuario_id, etc.).
 * 3. Extiende la auditoría a las tablas principales del negocio.
 */
const fixAuditTrigger = async () => {
  console.log('====================================================');
  console.log('🛠️ ACTUALIZANDO SISTEMA DE AUDITORÍA (REGISTRO DE CAMBIOS)');
  console.log('====================================================');

  try {
    await sequelize.authenticate();
    console.log('✓ Conexión establecida con PostgreSQL.\n');

    // 1. Reemplazar la función del trigger con resolución de usuario_id e IP
    const updateFunctionSql = `
CREATE OR REPLACE FUNCTION auditoria.fn_auditar_calidad()
RETURNS TRIGGER AS $$
DECLARE
    v_usuario_id UUID := NULL;
    v_direccion_ip INET := NULL;
    v_agente_usuario TEXT := NULL;
    v_rec_json JSONB;
BEGIN
    v_rec_json := to_jsonb(COALESCE(NEW, OLD));

    -- A. Intentar obtener el usuario desde las variables de sesión de PostgreSQL
    BEGIN
        v_usuario_id := NULLIF(current_setting('app.current_user_id', true), '')::UUID;
    EXCEPTION WHEN OTHERS THEN
        v_usuario_id := NULL;
    END;

    BEGIN
        v_direccion_ip := NULLIF(current_setting('app.client_ip', true), '')::INET;
    EXCEPTION WHEN OTHERS THEN
        v_direccion_ip := NULL;
    END;

    BEGIN
        v_agente_usuario := NULLIF(current_setting('app.user_agent', true), '');
    EXCEPTION WHEN OTHERS THEN
        v_agente_usuario := NULL;
    END;

    -- B. Si no vino en la sesión, resolver inteligentemente según la entidad:
    IF v_usuario_id IS NULL THEN
        -- 1. Si la tabla tiene directamente usuario_id
        IF v_rec_json ? 'usuario_id' AND v_rec_json->>'usuario_id' IS NOT NULL THEN
            BEGIN
                v_usuario_id := (v_rec_json->>'usuario_id')::UUID;
            EXCEPTION WHEN OTHERS THEN
                v_usuario_id := NULL;
            END;
        END IF;

        -- 2. Si la tabla es de Hojas de Catación CVA (vincular catador -> usuario)
        IF v_usuario_id IS NULL AND TG_TABLE_NAME = 'hojas_catacion_cva' AND v_rec_json ? 'catador_id' THEN
            SELECT c.usuario_id INTO v_usuario_id 
            FROM personas.catadores c 
            WHERE c.id = (v_rec_json->>'catador_id')::UUID;
        END IF;

        -- 3. Si la tabla es de Fincas o Preofertas (vincular caficultor -> usuario)
        IF v_usuario_id IS NULL AND v_rec_json ? 'caficultor_id' THEN
            SELECT caf.usuario_id INTO v_usuario_id 
            FROM personas.caficultores caf 
            WHERE caf.id = (v_rec_json->>'caficultor_id')::UUID;
        END IF;

        -- 4. Si la tabla es de Evaluaciones Físicas (vincular laboratorio -> usuario)
        IF v_usuario_id IS NULL AND TG_TABLE_NAME = 'evaluaciones_fisicas' AND v_rec_json ? 'laboratorio_id' THEN
            SELECT lab.usuario_id INTO v_usuario_id 
            FROM personas.laboratorios lab 
            WHERE lab.id = (v_rec_json->>'laboratorio_id')::UUID;
        END IF;

        -- 5. Si la tabla es de Sesiones de Catación (buscar el catador de sus hojas)
        IF v_usuario_id IS NULL AND TG_TABLE_NAME = 'sesiones_catacion' THEN
            SELECT c.usuario_id INTO v_usuario_id
            FROM calidad.hojas_catacion_cva h
            JOIN personas.catadores c ON h.catador_id = c.id
            WHERE h.sesion_id = COALESCE(NEW.id, OLD.id)
            ORDER BY h.fecha_catacion DESC
            LIMIT 1;
        END IF;

        -- 6. Si la tabla tiene creado_por_usuario_id
        IF v_usuario_id IS NULL AND v_rec_json ? 'creado_por_usuario_id' AND v_rec_json->>'creado_por_usuario_id' IS NOT NULL THEN
            BEGIN
                v_usuario_id := (v_rec_json->>'creado_por_usuario_id')::UUID;
            EXCEPTION WHEN OTHERS THEN
                v_usuario_id := NULL;
            END;
        END IF;
    END IF;

    -- C. Insertar registro de auditoría completo
    INSERT INTO auditoria.registro_cambios (
        esquema,
        tabla,
        operacion,
        usuario_id,
        registro_id,
        datos_previos,
        datos_nuevos,
        direccion_ip,
        agente_usuario,
        fecha_evento
    ) VALUES (
        TG_TABLE_SCHEMA,
        TG_TABLE_NAME,
        TG_OP,
        v_usuario_id,
        COALESCE(NEW.id, OLD.id)::TEXT,
        to_jsonb(OLD),
        to_jsonb(NEW),
        v_direccion_ip,
        v_agente_usuario,
        NOW()
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
    `;

    await sequelize.query(updateFunctionSql);
    console.log('✓ Función auditoria.fn_auditar_calidad() actualizada con soporte para usuario_id, IP y agente.');

    // 2. Extender triggers de auditoría a las tablas clave que faltaban
    const tablasAdicionales = [
      { esquema: 'agronomia', tabla: 'fincas' },
      { esquema: 'agronomia', tabla: 'lotes_cultivo' },
      { esquema: 'cosechas', tabla: 'preofertas' },
      { esquema: 'logistica', tabla: 'sacos_cafe' },
      { esquema: 'finanzas', tabla: 'pedidos_internacionales' },
      { esquema: 'acceso', tabla: 'usuarios_sistema' }
    ];

    for (const item of tablasAdicionales) {
      const triggerName = `trg_auditar_${item.tabla}`;
      const createTriggerSql = `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_trigger WHERE tgname = '${triggerName}'
          ) THEN
            CREATE TRIGGER ${triggerName}
            AFTER INSERT OR UPDATE OR DELETE ON ${item.esquema}.${item.tabla}
            FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditar_calidad();
          END IF;
        END $$;
      `;
      await sequelize.query(createTriggerSql);
      console.log(`✓ Trigger de auditoría activo en: ${item.esquema}.${item.tabla}`);
    }

    console.log('\n🎉 ¡Sistema de auditoría de ConexCoffee actualizado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al actualizar auditoría:', error);
    process.exit(1);
  }
};

fixAuditTrigger();
