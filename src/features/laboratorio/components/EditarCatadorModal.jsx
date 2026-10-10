import { useState, useEffect } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import { Button, Input } from '@/components/ui';
import { Check, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditarCatadorModal({ isOpen, onClose, catador, onSave }) {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    certificadoQ: '',
  });

  useEffect(() => {
    if (catador) {
      setFormData({
        identificacion: catador.identificacion || '',
        nombres: catador.nombres || '',
        apellidos: catador.apellidos || '',
        telefono: catador.telefono || '',
        email: catador.email || '',
        certificadoQ: catador.certificadoQ || '',
      });
    }
  }, [catador]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      ...catador,
      ...formData,
    });
    toast.success('Información del catador actualizada');
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Editar Datos del Catador" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Número de Identificación"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            required
          />
          <Input
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <Input
            label="Apellidos"
            name="apellidos"
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
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Certificado Q-Grader"
            name="certificadoQ"
            value={formData.certificadoQ}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            <Check className="w-4 h-4" />
            Guardar Cambios
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
