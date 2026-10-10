import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

// ============================================
// RoleGuard — Rutas que requieren un rol específico
// ============================================
// Envuelve rutas que solo pueden ser accedidas por usuarios con cierto rol.
// Si el rol del usuario NO está en allowedRoles → redirige a /unauthorized.
//
// Uso en router.jsx:
//   <Route element={<RoleGuard allowedRoles={['superadmin', 'empresa']} />}>
//     <Route path="/admin" element={<AdminPage />} />
//   </Route>
// ============================================

export default function RoleGuard({ allowedRoles = [] }) {
  const { role } = useAuthStore();

  // Si el rol del usuario no está en la lista permitida
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si tiene permiso, renderizar las rutas hijas
  return <Outlet />;
}
