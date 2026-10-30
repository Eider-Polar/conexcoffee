import { Component } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

// ============================================
// ErrorBoundary — Captura errores de React
// ============================================
// Evita que un fallo o excepción imprevista en un componente
// rompa la aplicación o deje la pantalla en blanco.
// Muestra una interfaz formal y elegante con opciones de
// recarga o retorno seguro a la página principal.
// ============================================

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Registro técnico sin filtrar información sensible al usuario
    console.error('[ConexCoffee Global ErrorBoundary]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-surface-200 p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-danger-50 text-danger-600 flex items-center justify-center mx-auto mb-5 border border-danger-100">
              <AlertCircle className="h-8 w-8" />
            </div>
            
            <p className="text-xs font-bold tracking-wider text-danger-600 uppercase mb-2">
              Estado de Error
            </p>
            <h1 className="text-2xl font-bold text-surface-900 mb-3">
              Ha ocurrido un error inesperado
            </h1>
            <p className="text-surface-600 text-sm leading-relaxed mb-6">
              El sistema ha contenido un fallo en la ejecución de la interfaz para evitar una pantalla en blanco. Puedes intentar recargar la vista o volver a la pantalla de inicio.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4" />
                Recargar página
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
                onClick={this.handleReset}
              >
                <Home className="h-4 w-4" />
                Ir al inicio
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
