import { sequelize } from '../config/database.js';

const fixFunction = async () => {
  const query = `
CREATE OR REPLACE FUNCTION calidad.fn_exportar_evaluacion_cva_json(p_evaluacion_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_cva RECORD;
    v_f1 RECORD;
    v_f2 RECORD;
    v_f3 RECORD;
    v_f4 RECORD;
    v_f5 RECORD;
    v_f6 RECORD;
    v_f7 RECORD;
    v_f8 RECORD;
    v_def RECORD;
BEGIN
    SELECT * INTO v_cva FROM calidad.evaluaciones_sensoriales_cva WHERE id = p_evaluacion_id;
    IF NOT FOUND THEN
        RETURN NULL;
    END IF;

    SELECT * INTO v_f1 FROM calidad.cva_fase_1_descriptiva WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_f2 FROM calidad.cva_fase_2_afectiva WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_f3 FROM calidad.cva_fase_3_sabor_descriptiva WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_f4 FROM calidad.cva_fase_4_sabor_afectiva WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_f5 FROM calidad.cva_fase_5_acidez WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_f6 FROM calidad.cva_fase_6_dulzor WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_f7 FROM calidad.cva_fase_7_sensacion_boca WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_f8 FROM calidad.cva_fase_8_impresion_global WHERE evaluacion_id = p_evaluacion_id;
    SELECT * INTO v_def FROM calidad.cva_defectos_uniformidad WHERE evaluacion_id = p_evaluacion_id;

    RETURN jsonb_build_object(
        'evaluacion', jsonb_build_object(
            'codigo', v_cva.codigo,
            'titulo', v_cva.titulo,
            'objetivo', v_cva.objetivo,
            'total_muestras', v_cva.total_muestras,
            'puntuacion_sca_global', v_cva.puntuacion_sca_global,
            'estado_estandar', v_cva.estado_estandar,
            'fases', jsonb_build_object(
                'fase_1_descriptiva', jsonb_build_object(
                    'nivel_tueste', jsonb_build_object(
                        'valor', v_f1.nivel_tueste_valor,
                        'nombre', v_f1.nivel_tueste_nombre,
                        'termino_ingles', v_f1.nivel_tueste_termino_ingles
                    ),
                    'fragancia', jsonb_build_object(
                        'intensidad', v_f1.fragancia_intensidad,
                        'escala_maxima', COALESCE(v_f1.fragancia_escala_maxima, 15),
                        'categoria_intensidad', v_f1.fragancia_categoria_intensidad
                    ),
                    'aroma', jsonb_build_object(
                        'intensidad', v_f1.aroma_intensidad,
                        'escala_maxima', COALESCE(v_f1.aroma_escala_maxima, 15),
                        'categoria_intensidad', v_f1.aroma_categoria_intensidad
                    ),
                    'descriptores_seleccionados', COALESCE(to_jsonb(v_f1.descriptores_seleccionados), '[]'::jsonb)
                ),
                'fase_2_afectiva', jsonb_build_object(
                    'fragancia', jsonb_build_object(
                        'calidad_agrado', v_f2.fragancia_calidad_agrado,
                        'escala_maxima', COALESCE(v_f2.fragancia_escala_maxima, 9)
                    ),
                    'aroma', jsonb_build_object(
                        'calidad_agrado', v_f2.aroma_calidad_agrado,
                        'escala_maxima', COALESCE(v_f2.aroma_escala_maxima, 9)
                    )
                ),
                'fase_3_sabor_descriptiva', jsonb_build_object(
                    'sabor', jsonb_build_object(
                        'intensidad', v_f3.sabor_intensidad,
                        'escala_maxima', COALESCE(v_f3.sabor_escala_maxima, 15),
                        'categoria_intensidad', v_f3.sabor_categoria_intensidad
                    ),
                    'sabor_residual_aftertaste', jsonb_build_object(
                        'intensidad', v_f3.sabor_residual_aftertaste_intensidad,
                        'escala_maxima', COALESCE(v_f3.sabor_residual_escala_maxima, 15),
                        'categoria_intensidad', v_f3.sabor_residual_categoria_intensidad
                    ),
                    'gustos_predominantes', COALESCE(to_jsonb(v_f3.gustos_predominantes), '[]'::jsonb),
                    'descriptores_sabor', COALESCE(to_jsonb(v_f3.descriptores_sabor), '[]'::jsonb)
                ),
                'fase_4_sabor_afectiva', jsonb_build_object(
                    'sabor', jsonb_build_object(
                        'calidad_agrado', v_f4.sabor_calidad_agrado,
                        'escala_maxima', COALESCE(v_f4.sabor_escala_maxima, 9)
                    ),
                    'sabor_residual', jsonb_build_object(
                        'calidad_agrado', v_f4.sabor_residual_calidad_agrado,
                        'escala_maxima', COALESCE(v_f4.sabor_residual_escala_maxima, 9)
                    )
                ),
                'fase_5_acidez', jsonb_build_object(
                    'intensidad', jsonb_build_object(
                        'valor', v_f5.intensidad_valor,
                        'escala_maxima', COALESCE(v_f5.intensidad_escala_maxima, 15),
                        'categoria_intensidad', v_f5.categoria_intensidad
                    ),
                    'calidad_agrado', jsonb_build_object(
                        'valor', v_f5.calidad_agrado_valor,
                        'escala_maxima', COALESCE(v_f5.calidad_agrado_escala_maxima, 9)
                    ),
                    'tipo_acidez_nota', COALESCE(v_f5.tipo_acidez_nota, '')
                ),
                'fase_6_dulzor', jsonb_build_object(
                    'intensidad', jsonb_build_object(
                        'valor', v_f6.intensidad_valor,
                        'escala_maxima', COALESCE(v_f6.intensidad_escala_maxima, 15),
                        'categoria_intensidad', v_f6.categoria_intensidad
                    ),
                    'calidad_agrado', jsonb_build_object(
                        'valor', v_f6.calidad_agrado_valor,
                        'escala_maxima', COALESCE(v_f6.calidad_agrado_escala_maxima, 9)
                    ),
                    'tipo_dulzor_nota', COALESCE(v_f6.tipo_dulzor_nota, '')
                ),
                'fase_7_sensacion_boca', jsonb_build_object(
                    'intensidad', jsonb_build_object(
                        'valor', v_f7.intensidad_valor,
                        'escala_maxima', COALESCE(v_f7.intensidad_escala_maxima, 15),
                        'categoria_intensidad', v_f7.categoria_intensidad
                    ),
                    'textura_cualidad', COALESCE(to_jsonb(v_f7.textura_cualidad), '[]'::jsonb),
                    'calidad_agrado', jsonb_build_object(
                        'valor', v_f7.calidad_agrado_valor,
                        'escala_maxima', COALESCE(v_f7.calidad_agrado_escala_maxima, 9)
                    ),
                    'nota', COALESCE(v_f7.nota, '')
                ),
                'fase_8_impresion_global', jsonb_build_object(
                    'calidad_agrado_global', jsonb_build_object(
                        'valor', v_f8.calidad_agrado_global_valor,
                        'escala_maxima', COALESCE(v_f8.calidad_agrado_global_escala_maxima, 9)
                    ),
                    'nota_balance', COALESCE(v_f8.nota_balance, '')
                ),
                'defectos_y_uniformidad', jsonb_build_object(
                    'tazas_no_uniformes', jsonb_build_object(
                        'cantidad', COALESCE(v_def.tazas_no_uniformes_cantidad, 0),
                        'total_tazas', COALESCE(v_def.tazas_no_uniformes_total, 5),
                        'tazas_seleccionadas', COALESCE(to_jsonb(v_def.tazas_no_uniformes_seleccionadas), '[]'::jsonb)
                    ),
                    'tazas_defectuosas', jsonb_build_object(
                        'cantidad', COALESCE(v_def.tazas_defectuosas_cantidad, 0),
                        'total_tazas', COALESCE(v_def.tazas_defectuosas_total, 5),
                        'tazas_seleccionadas', COALESCE(to_jsonb(v_def.tazas_defectuosas_seleccionadas), '[]'::jsonb)
                    ),
                    'tipo_defecto', v_def.tipo_defecto
                )
            ),
            'conclusion_catador', COALESCE(v_cva.conclusion_catador, '')
        )
    );
END;
$$ LANGUAGE plpgsql;
  `;

  await sequelize.query(query);
  console.log('✓ Función calidad.fn_exportar_evaluacion_cva_json actualizada exitosamente.');
  process.exit(0);
};

fixFunction();
