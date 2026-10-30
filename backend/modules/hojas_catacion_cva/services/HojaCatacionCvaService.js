import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';
import Catador from '../../catadores/Catador.js';

class HojaCatacionCvaService extends BaseService {
  /**
   * @param {import('../repository/HojaCatacionCvaRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Hoja de Catación CVA');
  }

  /**
   * Ingesta un payload JSON CVA completo del panel de catación,
   * guardándolo transaccionalmente en la sesión, hoja y tablas de fases CVA.
   */
  async ingestarDesdeJson({ payload, catadorId, evaluacionFisicaId, puntuacionCatador }) {
    if (!payload || !payload.evaluacion) {
      throw new DomainError(
        ERROR_CATALOG.VALIDATION_ERROR.code,
        'Estructura de evaluación inválida: el payload debe contener el objeto raíz "evaluacion"',
        'Se esperaba: { "evaluacion": { "codigo": "...", "fases": { ... } } }',
        400
      );
    }

    if (!payload.evaluacion.codigo) {
      throw new DomainError(
        ERROR_CATALOG.VALIDATION_ERROR.code,
        'El código de la evaluación/sesión es requerido en el payload CVA',
        'Campo requerido: evaluacion.codigo (ej. EVAL-P01)',
        400
      );
    }

    if (!catadorId) {
      throw new DomainError(
        ERROR_CATALOG.UNAUTHORIZED.code,
        'Se requiere un catador válido autenticado para firmar la hoja CVA',
        'catador_id no proporcionado',
        400
      );
    }

    // Verificar existencia del catador en personas.catadores
    const catador = await Catador.findByPk(catadorId);
    if (!catador) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'El perfil de catador Q-Grader no existe en el sistema',
        `Catador ID: ${catadorId}`,
        404
      );
    }

    if (!catador.activo) {
      throw new DomainError(
        ERROR_CATALOG.ACCESS_DENIED.code,
        'El catador seleccionado se encuentra inactivo para emitir hojas de catación',
        `Catador: ${catador.nombres} ${catador.apellidos}`,
        403
      );
    }

    const score = puntuacionCatador !== undefined && puntuacionCatador !== null
      ? parseFloat(puntuacionCatador)
      : (payload.evaluacion.puntuacion_catador ? parseFloat(payload.evaluacion.puntuacion_catador) : null);

    if (score !== null && (isNaN(score) || score < 0 || score > 100)) {
      throw new DomainError(
        ERROR_CATALOG.VALIDATION_ERROR.code,
        'La puntuación SCA del catador debe ser un valor numérico entre 0.00 y 100.00',
        `Valor recibido: ${puntuacionCatador}`,
        422
      );
    }

    const evalFisicaId = evaluacionFisicaId || payload.evaluacion.evaluacion_fisica_id || null;

    try {
      const hojaId = await this.repository.guardarDesdeJson({
        payload,
        catadorId,
        evaluacionFisicaId: evalFisicaId,
        puntuacionCatador: score
      });

      if (!hojaId) {
        throw new DomainError(
          ERROR_CATALOG.INTERNAL_SERVER_ERROR.code,
          'No se pudo persistir la hoja de catación CVA',
          'La función de ingesta no retornó identificador de hoja',
          500
        );
      }

      // Obtener el registro guardado con su sesión actualizada (promedio recalculado por trigger)
      const hojaGuardada = await this.repository.findById(hojaId, {
        include: [{ association: 'sesion' }, { association: 'catador' }]
      });

      return {
        hoja_id: hojaId,
        mensaje: 'Hoja de catación CVA procesada exitosamente y consolidada en la sesión',
        hoja: hojaGuardada
      };
    } catch (err) {
      if (err instanceof DomainError) throw err;

      // Extraer mensaje de excepción de base de datos PostgreSQL si existe
      const pgDetail = err.original?.detail || err.message;
      throw new DomainError(
        ERROR_CATALOG.VALIDATION_ERROR.code,
        'Error al procesar la ingesta CVA en la base de datos',
        pgDetail,
        422
      );
    }
  }

  /**
   * Exporta el documento JSON anidado exacto CVA para una hoja de catación.
   */
  async exportarCva(hojaId) {
    await this.getById(hojaId); // Valida que exista la hoja
    const cvaJson = await this.repository.exportarCvaJson(hojaId);
    if (!cvaJson) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'No se pudieron compilar las fases CVA para esta hoja de catación',
        `Hoja Catación ID: ${hojaId}`,
        404
      );
    }
    return cvaJson;
  }

  async getBySesionId(sesionId) {
    return await this.repository.findBySesionId(sesionId);
  }

  async getWithAllPhases(id) {
    const hoja = await this.repository.findWithAllPhases(id);
    if (!hoja) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'No se encontró la hoja de catación CVA solicitada',
        `Hoja ID: ${id}`,
        404
      );
    }
    return hoja;
  }
}

export default HojaCatacionCvaService;
