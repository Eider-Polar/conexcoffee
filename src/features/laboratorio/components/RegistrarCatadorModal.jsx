import { useState } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import { Button, Input } from '@/components/ui';
import { UserCheck, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegistrarCatadorModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    certificadoQ: '',
    experiencia: '3 años',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.identificacion || !formData.nombres || !formData.apellidos || !formData.telefono) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    onSave?.({
      ...formData,
      id: Date.now(),
      estado: 'Activo',
    });

    toast.success('¡Catador registrado exitosamente!');
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Registrar Nuevo Catador" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 text-xs text-primary-800 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0" />
          <span>El catador registrado estará habilitado para realizar sesiones de catación sensorial bajo protocolo SCA.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Número de Identificación *"
            name="identificacion"
            placeholder="Ej: 1085293841"
            value={formData.identificacion}
            onChange={handleChange}
            required
          />
          <Input
            label="Teléfono de Contacto *"
            name="telefono"
            placeholder="Ej: +57 312 458 9201"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Nombres *"
            name="nombres"
            placeholder="Nombres completos"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <Input
            label="Apellidos *"
            name="apellidos"
            placeholder="Apellidos completos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Certificación Q-Grader (Código SCA)"
            name="certificadoQ"
            placeholder="Ej: Q-Grader #9240"
            value={formData.certificadoQ}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            <UserCheck className="w-4 h-4" />
            Registrar Catador
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
