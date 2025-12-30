import React, { useState } from 'react';
import Input from '../ui/Input';
import IconSelector from '../ui/IconSelector';
import { useCompanyIcons } from '../../hooks/useCompanyIcons';
import { useNotification, Notification } from '../ui/Notification';

interface EditCompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCompany: (company: Company) => void;
}

interface Company {
  id: string;
  name: string;
  description: string;
  nit: string;
  address: string;
  phone: string;
  email: string;
  sector: string;
  isActive: boolean;
  workers: Array<{ id: string; name: string; role: string; department: string }>;
  projects: Array<{ id: string; name: string; status: string }>;
  iconId?: string;
}

export default function EditCompanyModal({ company, isOpen, onClose, onUpdateCompany }: EditCompanyModalProps) {
  const { setCompanyIcon } = useCompanyIcons();
  const { showSuccess, showError, notification, hideNotification } = useNotification();
  const [formData, setFormData] = useState(() => {
    if (!company) {
      return {
        name: '',
        description: '',
        nit: '',
        address: '',
        phone: '',
        email: '',
        sector: '',
        isActive: true,
        iconId: 'building'
      };
    }
    return {
      name: company.name || '',
      description: company.description || '',
      nit: company.nit || '',
      address: company.address || '',
      phone: company.phone || '',
      email: company.email || '',
      sector: company.sector || '',
      isActive: company.isActive !== undefined ? company.isActive : true,
      iconId: company.iconId || 'building'
    };
  });

  const sectors: string[] = [
    'Tecnología',
    'Salud',
    'Educación',
    'Finanzas',
    'Manufactura',
    'Retail',
    'Construcción',
    'Servicios',
    'Marketing',
    'Diseño',
    'Otro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    
    try {
      const updatedCompany: Company = {
        id: company.id,
        workers: company.workers || [],
        projects: company.projects || [],
        ...formData
      };
      
      // Actualizar el icono en el hook useCompanyIcons
      if (formData.iconId && formData.iconId !== company.iconId) {
        setCompanyIcon(company.id, formData.iconId);
      }
      
      onUpdateCompany(updatedCompany);
      showSuccess('Empresa actualizada correctamente');
      onClose();
    } catch (error) {
      showError('Error al actualizar la empresa');
      console.error('Error updating company:', error);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Editar Empresa</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre de la Empresa"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
            
            <Input
              label="NIT"
              value={formData.nit}
              onChange={(e) => handleChange('nit', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Teléfono"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
            />
            
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector
            </label>
            <select
              value={formData.sector}
              onChange={(e) => handleChange('sector', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar sector</option>
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          <IconSelector
            selectedIcon={formData.iconId}
            onIconSelect={(iconId) => setFormData(prev => ({ ...prev, iconId }))}
            label="Icono de la empresa"
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              Actualizar Empresa
            </button>
          </div>
        </form>
      </div>
      
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
}
