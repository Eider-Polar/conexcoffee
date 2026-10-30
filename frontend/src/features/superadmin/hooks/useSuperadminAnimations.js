import { useEffect } from 'react';
import { animate, stagger } from 'animejs';

/**
 * useTableEntranceAnimation — Hook que anima suavemente la aparición de filas
 * de una tabla con escalonamiento (stagger) usando Anime.js v4.
 */
export function useTableEntranceAnimation(tableRef, deps = []) {
  useEffect(() => {
    if (!tableRef?.current) return;
    const rows = tableRef.current.querySelectorAll('tbody tr');
    if (!rows || rows.length === 0) return;

    const anim = animate(rows, {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 320,
      ease: 'outExpo',
      delay: stagger(20),
    });

    return () => {
      anim.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * useDashboardEntranceAnimation — Anima las tarjetas KPI y módulos del Dashboard
 * del SuperAdmin al montar o actualizar datos.
 */
export function useDashboardEntranceAnimation(kpisRef, modulesRef, deps = []) {
  useEffect(() => {
    let animKpis;
    let animModules;

    if (kpisRef?.current) {
      const cards = kpisRef.current.children;
      if (cards.length > 0) {
        animKpis = animate(cards, {
          opacity: [0, 1],
          translateY: [16, 0],
          scale: [0.97, 1],
          duration: 480,
          ease: 'outExpo',
          delay: stagger(50),
        });
      }
    }

    if (modulesRef?.current) {
      const moduleCards = modulesRef.current.children;
      if (moduleCards.length > 0) {
        animModules = animate(moduleCards, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 420,
          ease: 'outExpo',
          delay: stagger(30, { start: 100 }),
        });
      }
    }

    return () => {
      if (animKpis) animKpis.pause();
      if (animModules) animModules.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
