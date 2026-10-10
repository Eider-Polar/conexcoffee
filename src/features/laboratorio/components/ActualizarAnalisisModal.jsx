import { useState, useEffect } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import { Button, Input } from '@/components/ui';
import { Check, FlaskConical } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ActualizarAnalisisModal({ isOpen, onClose, analisis, onSave }) {
  const [formData, setFormData] = useState({
    humedad: '',
    pesoMuestra: '',
    merma: '',
    factorRendimiento: '',
    defectosPrimerGrupo: '',
    defectosSegundoGrupo: '',
    responsable: '',
  });

  useEffect(() => {
    if (analisis) {
      setFormData({
        humedad: analisis.humedad || '11.0%',
        pesoMuestra: analisis.pesoMuestra || '350 g',
        merma: analisis.merma || '18.0%',
        factorRendimiento: analisis.factorRendimiento || '88.0 kg',
        defectosPrimerGrupo: analisis.defectosPrimerGrupo ?? 0,
        defectosSegundoGrupo: analisis.defectosSegundoGrupo ?? 3,
        responsable: analisis.responsable || '',
      });
    }
  }, [analisis]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      ...analisis,
      ...formData,
      estado: 'Completado',
    });
    toast.success('Análisis físico actualizado correctamente');
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={`Actualizar Análisis Físico — ${analisis?.codigo || ''}`}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Humedad (%)"
            name="humedad"
            placeholder="Ej: 11.2%"
            value={formData.humedad}
            onChange={handleChange}
            required
          />
          <Input
            label="Peso Muestra Analizada"
            name="pesoMuestra"
            placeholder="Ej: 350 g"
            value={formData.pesoMuestra}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Merma Estimada (%)"
            name="merma"
            placeholder="Ej: 18.4%"
            value={formData.merma}
            onChange={handleChange}
          />
          <Input
            label="Factor de Rendimiento (kg)"
            name="factorRendimiento"
            placeholder="Ej: 88.5 kg"
            value={formData.factorRendimiento}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Defectos Primer Grupo (Granos negros, agrios, etc.)"
            type="number"
            name="defectosPrimerGrupo"
            value={formData.defectosPrimerGrupo}
            onChange={handleChange}
          />
          <Input
            label="Defectos Segundo Grupo (Partidos, mordidos, etc.)"
            type="number"
            name="defectosSegundoGrupo"
            value={formData.defectosSegundoGrupo}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Especialista Responsable"
          name="responsable"
          value={formData.responsable}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            <Check className="w-4 h-4" />
            Actualizar Análisis
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
