import { useState, useRef, useEffect } from 'react';
import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { ShieldCheck, X, RotateCcw, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';

// ============================================
// VerificacionCodigoModal
// ============================================
// Modal de verificación de código OTP de 6 dígitos.
// Aparece tras el registro exitoso del comprador.
// Incluye contador de expiración de 5 minutos.
// Solo frontend — sin lógica de backend real.
// ============================================

const CODE_LENGTH = 6;
const EXPIRATION_SECONDS = 5 * 60; // 5 minutos

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function VerificacionCodigoModal({ isOpen, onClose, onVerified, email = '' }) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXPIRATION_SECONDS);
  const [expired, setExpired] = useState(false);
  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  // Reiniciar estado cada vez que el modal se abre
  useEffect(() => {
    if (isOpen) {
      setDigits(Array(CODE_LENGTH).fill(''));
      setExpired(false);
      setTimeLeft(EXPIRATION_SECONDS);
      setResendCooldown(0);
      setTimeout(() => inputsRef.current[0]?.focus(), 150);
    } else {
      clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Contador de expiración de 5 minutos
  useEffect(() => {
    if (!isOpen || expired) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setExpired(true);
          toast.error('El código ha expirado. Solicita uno nuevo.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isOpen, expired]);

  // Cuenta regresiva para reenvío
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // ---- Manejo de inputs individuales ----
  const handleDigitChange = (index, value) => {
    if (expired) return;
    const cleaned = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);
    if (cleaned && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (expired) return;
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    if (expired) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    const newDigits = Array(CODE_LENGTH).fill('');
    pasted.split('').forEach((char, i) => { newDigits[i] = char; });
    setDigits(newDigits);
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const isComplete = digits.every((d) => d !== '');

  // ---- Submit ----
  const handleVerify = async () => {
    if (expired) {
      toast.error('El código ha expirado. Solicita uno nuevo.');
      return;
    }
    if (!isComplete) {
      toast.error('Ingresa el código completo de 6 dígitos');
      return;
    }
    setLoading(true);
    // Simulación frontend — sin lógica de backend real
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success('¡Cuenta verificada correctamente! Ya puedes iniciar sesión.');
    if (onVerified) onVerified();
  };

  // ---- Reenviar código ----
  const handleResend = () => {
    if (resendCooldown > 0) return;
    toast.success('Código reenviado a tu correo');
    setResendCooldown(60);
    setExpired(false);
    setTimeLeft(EXPIRATION_SECONDS);
    setDigits(Array(CODE_LENGTH).fill(''));
    setTimeout(() => inputsRef.current[0]?.focus(), 100);
  };

  // Color del contador según tiempo restante
  const timerColor = expired
    ? 'text-danger-600'
    : timeLeft <= 60
    ? 'text-warning-600'
    : 'text-surface-500';

  const timerBg = expired
    ? 'bg-danger-50 border-danger-200'
    : timeLeft <= 60
    ? 'bg-warning-50 border-warning-200'
    : 'bg-surface-50 border-surface-200';

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="w-full max-w-sm bg-white rounded-2xl shadow-2xl transform transition-all">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-primary-600" />
                    </div>
                    <DialogTitle className="text-base font-bold text-surface-900">
                      Verificar cuenta
                    </DialogTitle>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors cursor-pointer"
                    aria-label="Cerrar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6 space-y-4">

                  {/* Descripción */}
                  <p className="text-sm text-surface-500 leading-relaxed text-center">
                    Te enviamos un código de verificación a{' '}
                    {email
                      ? <span className="font-semibold text-surface-700">{email}</span>
                      : 'tu correo electrónico'
                    }.
                    Ingrésalo antes de que expire.
                  </p>

                  {/* Contador de expiración */}
                  <div className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border ${timerBg} transition-colors duration-500`}>
                    {expired
                      ? <AlertTriangle className="h-4 w-4 text-danger-600 shrink-0" />
                      : <Clock className={`h-4 w-4 shrink-0 ${timerColor}`} />
                    }
                    <span className={`font-mono text-sm font-bold ${timerColor}`}>
                      {expired ? 'Código expirado' : formatTime(timeLeft)}
                    </span>
                    {!expired && (
                      <span className="text-xs text-surface-400">
                        {timeLeft <= 60 ? '— expira pronto' : 'restantes'}
                      </span>
                    )}
                  </div>

                  {/* Inputs de 6 dígitos */}
                  <div
                    className="flex items-center justify-center gap-2"
                    onPaste={handlePaste}
                  >
                    {digits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        id={`otp-digit-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        disabled={expired}
                        className={`
                          w-11 h-12 text-center text-xl font-bold rounded-lg border-2
                          text-surface-900 bg-white
                          transition-all duration-150
                          focus:outline-none focus:ring-2 focus:ring-offset-0
                          disabled:bg-surface-100 disabled:cursor-not-allowed disabled:text-surface-400
                          ${expired
                            ? 'border-surface-200'
                            : digit
                            ? 'border-primary-500 bg-primary-50 focus:ring-primary-500/30'
                            : 'border-surface-300 focus:ring-primary-500/30 focus:border-primary-500'
                          }
                        `}
                        aria-label={`Dígito ${index + 1} del código`}
                      />
                    ))}
                  </div>

                  {/* Indicador de código completo */}
                  {isComplete && !expired && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-primary-600 font-medium">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Código listo para verificar
                    </div>
                  )}

                  {/* Botón verificar */}
                  <Button
                    id="btn-verify-code"
                    type="button"
                    variant="primary"
                    className="w-full"
                    loading={loading}
                    onClick={handleVerify}
                    disabled={expired || !isComplete}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Verificar cuenta
                  </Button>

                  {/* Reenviar código */}
                  <div className="text-center">
                    <p className="text-xs text-surface-400 mb-1">
                      ¿No recibiste el código o expiró?
                    </p>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0}
                      className={`
                        inline-flex items-center gap-1.5 text-xs font-medium transition-colors
                        ${resendCooldown > 0
                          ? 'text-surface-300 cursor-not-allowed'
                          : 'text-primary-600 hover:text-primary-700 cursor-pointer'
                        }
                      `}
                    >
                      <RotateCcw className="h-3 w-3" />
                      {resendCooldown > 0
                        ? `Reenviar en ${resendCooldown}s`
                        : 'Reenviar código'
                      }
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
