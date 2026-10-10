import { Outlet } from 'react-router-dom';
import useUIStore from '@/store/useUIStore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// ============================================
// DashboardLayout — Layout principal del sistema
// ============================================
// Incluye Sidebar (navegación por rol) y Header (usuario, notificaciones).
// El contenido de cada página se renderiza en el <Outlet />.
// ============================================

export default function DashboardLayout() {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        `}
      >
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
