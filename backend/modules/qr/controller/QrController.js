import QrService from '../services/QrService.js';

class QrController {
  /**
   * GET /api/qr/generate?data=...&format=svg|dataUrl|json&colorDark=...&logoUrl=...
   * Permite renderizar directamente el SVG o devolver JSON
   */
  async generateGet(req, res, next) {
    try {
      const { data, format = 'svg', size = 300, colorDark, colorLight, logoUrl } = req.query;

      if (!data) {
        return res.status(400).json({
          status: 'error',
          message: 'El parámetro "data" es requerido (ej: /api/qr/generate?data=https://conexcoffee.com/trazabilidad/123)',
        });
      }

      const result = await QrService.generateSvgWithLogo({
        data,
        size: Number(size) || 300,
        colorDark: colorDark ? `#${colorDark.replace('#', '')}` : '#1E1E1E',
        colorLight: colorLight ? `#${colorLight.replace('#', '')}` : '#FFFFFF',
        logoUrl: logoUrl || null,
      });

      if (format === 'svg') {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cacheable 24h
        return res.send(result.svg);
      }

      return res.json({
        status: 'success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/qr/generate
   * Generación individual con soporte de body JSON
   */
  async generatePost(req, res, next) {
    try {
      const { data, size, colorDark, colorLight, logoSvg, logoUrl, logoSizeRatio } = req.body;

      if (!data) {
        return res.status(400).json({
          status: 'error',
          message: 'El campo "data" es requerido en el cuerpo de la petición.',
        });
      }

      const result = await QrService.generateSvgWithLogo({
        data,
        size: Number(size) || 300,
        colorDark,
        colorLight,
        logoSvg,
        logoUrl,
        logoSizeRatio,
      });

      return res.json({
        status: 'success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/qr/batch
   * Generación masiva (n códigos para n sacos / lotes de una empresa)
   */
  async generateBatch(req, res, next) {
    try {
      const { items, size, colorDark, colorLight, logoUrl } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Debe enviar una lista "items" con los códigos a generar: [{ id, data, label }]',
        });
      }

      if (items.length > 500) {
        return res.status(400).json({
          status: 'error',
          message: 'Límite máximo de 500 códigos por lote excedido.',
        });
      }

      const results = await QrService.generateBatch(items, {
        size: Number(size) || 300,
        colorDark,
        colorLight,
        logoUrl,
      });

      return res.json({
        status: 'success',
        data: {
          total: results.length,
          items: results,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new QrController();
