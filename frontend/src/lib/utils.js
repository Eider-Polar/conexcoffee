// ============================================
// Utilitario cn para concatenación de clases CSS
// ============================================

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
