import { useEffect, useRef, useState } from 'react';
import { Card, Button, Spinner } from '@/components/ui';
import { CreditCard, Lock } from 'lucide-react';

// ============================================
// PaymentContainer — Contenedor aislado para SDK de pagos
// ============================================
// ⚠️ REGLA DE SEGURIDAD CRÍTICA:
// Este componente es un CONTENEDOR AISLADO para el SDK de la pasarela de pagos.
// - El formulario de tarjeta vive SOLO dentro de este componente.
// - NUNCA se almacenan datos de tarjeta en el estado global ni en localStorage.
// - Solo devuelve un paymentToken seguro al componente padre.
// - El token se envía al backend, que procesa el pago con la llave secreta.
//
// Integración:
// 1. Reemplazar el contenido del useEffect con la inicialización del SDK real.
// 2. El SDK monta su propio iframe seguro dentro de cardElementRef.
// 3. Al enviar, el SDK genera un token que se pasa a onPaymentToken.
// ============================================

export default function PaymentContainer({
  amount,
  currency = 'USD',
  onPaymentToken,
  onError,
}) {
  const cardElementRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // ============================================
    // TODO: Inicializar el SDK de la pasarela de pagos aquí
    // ============================================
    // Ejemplo con Stripe:
    //   const stripe = await loadStripe(PAYMENT_PUBLIC_KEY);
    //   const elements = stripe.elements();
    //   const cardElement = elements.create('card');
    //   cardElement.mount(cardElementRef.current);
    //
    // Ejemplo con MercadoPago:
    //   const mp = new MercadoPago(PAYMENT_PUBLIC_KEY);
    //   const cardForm = mp.cardForm({ ... });
    // ============================================

    // Simulación de carga del SDK
    const timer = setTimeout(() => setSdkReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // ============================================
      // TODO: Obtener el token del SDK aquí
      // ============================================
      // Ejemplo con Stripe:
      //   const { token, error } = await stripe.createToken(cardElement);
      //   if (error) throw error;
      //   onPaymentToken(token.id);
      // ============================================

      // Simulación de token
      const mockToken = 'tok_' + Math.random().toString(36).substr(2, 9);
      onPaymentToken?.(mockToken);
    } catch (error) {
      onError?.(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-5 w-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-surface-900">
          Información de Pago
        </h2>
      </div>

      {/* Monto */}
      {amount && (
        <div className="bg-surface-50 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-surface-500">Total a pagar</p>
          <p className="text-3xl font-bold text-surface-900">
            {currency} ${amount}
          </p>
        </div>
      )}

      {/* Card element container — Aquí monta el SDK su iframe */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          ref={cardElementRef}
          className="border border-surface-300 rounded-lg p-4 min-h-[48px] bg-white"
        >
          {!sdkReady && (
            <div className="flex items-center justify-center">
              <Spinner size="sm" />
            </div>
          )}
          {sdkReady && (
            <p className="text-sm text-surface-400 text-center">
              [Aquí se montará el formulario seguro del SDK de pagos]
            </p>
          )}
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-1.5 text-xs text-surface-400">
          <Lock className="h-3 w-3" />
          <span>Pago seguro — Tus datos están protegidos</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={processing}
          disabled={!sdkReady}
        >
          Pagar {amount && `$${amount}`}
        </Button>
      </form>
    </Card>
  );
}
