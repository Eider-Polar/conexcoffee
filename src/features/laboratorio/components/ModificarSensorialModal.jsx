import { useState, useEffect } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import { Button, Input } from '@/components/ui';
import { Coffee, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ModificarSensorialModal({ isOpen, onClose, sensorial, onSave }) {
  const [formData, setFormData] = useState({
    fragancia: '',
    sabor: '',
    balance: '',
    acidez: '',
    cuerpo: '',
    notas: '',
  });

  useEffect(() => {
    if (sensorial) {
      setFormData({
        fragancia: sensorial.fragancia ?? 8.5,
        sabor: sensorial.sabor ?? 8.5,
        balance: sensorial.balance ?? 8.5,
        acidez: sensorial.acidez ?? 8.5,
        cuerpo: sensorial.cuerpo ?? 8.25,
        notas: sensorial.notas || '',
      });
    }
  }, [sensorial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const frag = parseFloat(formData.fragancia) || 0;
    const sab = parseFloat(formData.sabor) || 0;
    const bal = parseFloat(formData.balance) || 0;
    const aci = parseFloat(formData.acidez) || 0;
    const cue = parseFloat(formData.cuerpo) || 0;

    // Calcular puntaje aproximado SCA (base + atributos)
    const puntajeTotal = +(frag + sab + bal + aci + cue + 10 + 10 + 10 + 10).toFixed(2);

    onSave?.({
      ...sensorial,
      ...formData,
      fragancia: frag,
      sabor: sab,
      balance: bal,
      acidez: aci,
      cuerpo: cue,
      puntajeTotal,
    });
    toast.success('Perfil sensorial actualizado correctamente');
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={`Modificar Perfil Sensorial — ${sensorial?.codigoLote || ''}`}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 bg-primary-50 rounded-lg text-xs text-primary-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <Coffee className="w-4 h-4 text-primary-600" />
            Catador a cargo: {sensorial?.catador}
          </span>
          <span className="font-semibold text-primary-900">Protocolo SCA (6.0 - 10.0 pts)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Puntaje Fragancia / Aroma *"
            type="number"
            step="0.25"
            min="6"
            max="10"
            name="fragancia"
            value={formData.fragancia}
            onChange={handleChange}
            required
          />
          <Input
            label="Puntaje Sabor *"
            type="number"
            step="0.25"
            min="6"
            max="10"
            name="sabor"
            value={formData.sabor}
            onChange={handleChange}
            required
          />
          <Input
            label="Puntaje Balance *"
            type="number"
            step="0.25"
            min="6"
            max="10"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Puntaje Acidez"
            type="number"
            step="0.25"
            min="6"
            max="10"
            name="acidez"
            value={formData.acidez}
            onChange={handleChange}
          />
          <Input
            label="Puntaje Cuerpo"
            type="number"
            step="0.25"
            min="6"
            max="10"
            name="cuerpo"
            value={formData.cuerpo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-surface-700 uppercase tracking-wider mb-1.5">
            Descriptores Aromáticos y Notas de Cata
          </label>
          <textarea
            name="notas"
            rows="3"
            value={formData.notas}
            onChange={handleChange}
            placeholder="Ej: Jazmín, frutos rojos, panela, final sedoso prolongado..."
            className="w-full px-3 py-2 text-sm border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            <Check className="w-4 h-4" />
            Guardar Perfil Sensorial
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
