import { useState, useEffect } from 'react';

// ============================================
// useDebounce — Hook de debounce para búsquedas
// ============================================
// Retrasa la ejecución del valor hasta que el usuario deje de escribir.
//
// Uso:
//   const [search, setSearch] = useState('');
//   const debouncedSearch = useDebounce(search, 500);
//
//   useEffect(() => {
//     // Solo se ejecuta 500ms después de que el usuario deja de escribir
//     fetchResults(debouncedSearch);
//   }, [debouncedSearch]);
// ============================================

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
