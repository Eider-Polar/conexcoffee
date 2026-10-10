import DOMPurify from 'dompurify';

// ============================================
// Sanitización de HTML — ConexCoffee
// ============================================
// REGLA DE ARQUITECTURA:
// Si en ALGÚN punto del proyecto se necesita renderizar HTML externo
// o texto enriquecido, SIEMPRE usar estas funciones.
// NUNCA usar dangerouslySetInnerHTML sin sanitizar primero.
// ============================================

/**
 * Sanitiza una cadena de HTML para prevenir ataques XSS.
 * Elimina scripts, event handlers y atributos maliciosos.
 *
 * @param {string} dirtyHtml - HTML potencialmente peligroso
 * @param {object} options - Opciones adicionales de DOMPurify
 * @returns {string} HTML limpio y seguro
 *
 * @example
 * const cleanHtml = sanitizeHTML('<p>Hola</p><script>alert("xss")</script>');
 * // Resultado: '<p>Hola</p>'
 */
export function sanitizeHTML(dirtyHtml, options = {}) {
  if (!dirtyHtml) return '';

  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'blockquote', 'code', 'pre', 'span', 'div',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    ...options,
  });
}

/**
 * Componente React para renderizar HTML sanitizado de forma segura.
 * Usa este componente en lugar de dangerouslySetInnerHTML directamente.
 *
 * @param {object} props
 * @param {string} props.content - HTML a renderizar (será sanitizado)
 * @param {string} [props.className] - Clases CSS opcionales
 * @param {string} [props.as='div'] - Elemento HTML contenedor
 *
 * @example
 * <SafeHTML content={htmlFromApi} className="prose" />
 */
export function SafeHTML({ content, className = '', as: Tag = 'div' }) {
  const cleanHtml = sanitizeHTML(content);

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

export default { sanitizeHTML, SafeHTML };
