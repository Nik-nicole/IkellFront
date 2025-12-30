import React, { useState } from 'react';
import { useCompanyIcons } from '../../hooks/useCompanyIcons';

interface Project {
  id: string;
  name: string;
  status: string;
}

interface Worker {
  id: string;
  name: string;
  role: string;
  department: string;
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
  workers: Worker[];
  projects: Project[];
}

interface CompanyDetailsModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyDetailsModal({ company, isOpen, onClose }: CompanyDetailsModalProps) {
  const [showWorkersList, setShowWorkersList] = useState(false);
  const { getCompanyIcon, getIconById } = useCompanyIcons();

  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{company.name}</h2>
              <p className="text-sm text-gray-500 mb-4">ID: {company.id}</p>
              
              {/* Company Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center bg-white">
                  <div className="text-gray-600">
                    {getIconById(getCompanyIcon(company.id))}
                  </div>
                </div>
              </div>
            </div>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              company.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {company.isActive ? 'Activa' : 'Desactivada'}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {company.sector}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-600">{company.description}</p>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">NIT</h4>
              <p className="text-gray-600">{company.nit}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Teléfono</h4>
              <p className="text-gray-600">{company.phone}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Email</h4>
              <p className="text-gray-600">{company.email}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Sector</h4>
              <p className="text-gray-600">{company.sector}</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-medium text-gray-900 mb-1">Dirección</h4>
              <p className="text-gray-600">{company.address}</p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Proyectos ({company.projects.length})
            </h3>
            <div className="space-y-2">
              {company.projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500">ID: {project.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status === 'completed' ? 'Completado' : 
                     project.status === 'in-progress' ? 'En progreso' : 'Planificación'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Workers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Trabajadores ({company.workers.length})
              </h3>
              <button
                onClick={() => setShowWorkersList(!showWorkersList)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                {showWorkersList ? 'Ocultar' : 'Mostrar'} lista
                <svg 
                  className={`w-4 h-4 transition-transform ${showWorkersList ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {showWorkersList && (
              <div className="space-y-2">
                {company.workers.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{worker.name}</p>
                      <p className="text-sm text-gray-500">{worker.role}</p>
                    </div>
                    <span className="text-sm text-gray-600">{worker.department}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
