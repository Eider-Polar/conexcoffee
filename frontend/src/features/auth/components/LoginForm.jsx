import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getErrorMessage } from '@/lib/axios';
import { ROLE_DASHBOARD_ROUTES } from '@/lib/constants';
import { Input, Button, Captcha } from '@/components/ui';
import { LogIn, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import ModalBase from '@/components/modals/ModalBase';
import VerificacionCodigoModal from '@/components/modals/VerificacionCodigoModal';
import RegisterForm from './RegisterForm';

// ============================================
// LoginForm — Inicio de sesión
// Gestiona también el flujo de registro + verificación
// ============================================

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const captchaTokenRef = useRef('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Control de modales en secuencia
  const [showRegister, setShowRegister] = useState(false);
  const [showVerificacion, setShowVerificacion] = useState(false);
  const [emailRegistrado, setEmailRegistrado] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    if (!captchaTokenRef.current) newErrors.captcha = 'Por favor completa la verificación de seguridad';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const user = await login({ ...formData, captchaToken: captchaTokenRef.current });
      const dashboardRoute = ROLE_DASHBOARD_ROUTES[user.role] || '/';
      toast.success('¡Bienvenido!');
      navigate(dashboardRoute);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Credenciales inválidas'));
    } finally {
      setLoading(false);
    }
  };

  // Cuando el registro es exitoso: cierra registro, abre verificación
  const handleRegisterSuccess = (email) => {
    setEmailRegistrado(email || '');
    setShowRegister(false);
    setTimeout(() => setShowVerificacion(true), 200); // pequeño delay para animación
  };

  // Cuando la verificación es confirmada: cierra y va a login
  const handleVerified = () => {
    setShowVerificacion(false);
    setEmailRegistrado('');
  };

  return (
    <>
      <div>
        {/* Encabezado */}
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold text-surface-900">
            Iniciar Sesión
          </h2>
          <p className="text-surface-500 mt-1 text-sm">
            Ingresa tus credenciales para acceder a la plataforma
          </p>
        </div>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <div>
            <Captcha
              onVerify={(token) => {
                captchaTokenRef.current = token;
                if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: '' }));
              }}
              onExpire={() => {
                captchaTokenRef.current = '';
              }}
            />
            {errors.captcha && (
              <p className="text-xs text-danger-500 text-center mt-1">{errors.captcha}</p>
            )}
          </div>

          <Button
            id="btn-login-submit"
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
          >
            <LogIn className="h-4 w-4" />
            Iniciar Sesión
          </Button>
        </form>

        {/* Divisor */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-surface-400 font-medium tracking-wider">
              ¿Nuevo en Conexcoffee?
            </span>
          </div>
        </div>

        {/* Botón registrar como comprador */}
        <button
          id="btn-register-comprador"
          type="button"
          onClick={() => setShowRegister(true)}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border-2 border-primary-600 text-primary-600 font-semibold text-sm hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Registrarse como comprador
        </button>

        <p className="text-center text-xs text-surface-400 mt-4">
          Solo compradores pueden crear una cuenta directamente.
          <br />
          Otros roles son asignados por un administrador.
        </p>
      </div>

      {/* Modal 1 — Registro de comprador */}
      <ModalBase
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        title="Registrar comprador"
        size="xl"
      >
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onCancel={() => setShowRegister(false)}
        />
      </ModalBase>

      {/* Modal 2 — Verificación de código */}
      <VerificacionCodigoModal
        isOpen={showVerificacion}
        onClose={() => setShowVerificacion(false)}
        onVerified={handleVerified}
        email={emailRegistrado}
      />
    </>
  );
}
