import React, { useState, useMemo } from 'react';
import Sidebar from '../../layout/Sidebar';
import CompanyDetailsModal from '../../modals/CompanyDetailsModal';
import CreateCompanyModal from '../../modals/CreateCompanyModal';
import EditCompanyModal from '../../modals/EditCompanyModal';
import { useCompanyIcons } from '../../../hooks/useCompanyIcons';
import { useNotification, Notification } from '../../ui/Notification';

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
  iconId?: string;
}

export default function CompaniesSection() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { getCompanyIcon, setCompanyIcon, getIconById } = useCompanyIcons();
  const { showSuccess, showWarning, notification, hideNotification } = useNotification();
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'Tech Corp',
      description: 'Empresa líder en desarrollo de software y soluciones tecnológicas innovadoras para empresas de todos los tamaños.',
      nit: '900.123.456-7',
      address: 'Cra. 45 # 26-85, Bogotá, Colombia',
      phone: '+57 1 234 5678',
      email: 'contact@techcorp.com',
      sector: 'Tecnología',
      isActive: true,
      iconId: 'tech',
      workers: [
        { id: '1', name: 'Juan Pérez', role: 'Desarrollador Senior', department: 'Engineering' },
        { id: '2', name: 'María García', role: 'UI/UX Designer', department: 'Design' },
        { id: '3', name: 'Carlos Rodríguez', role: 'Project Manager', department: 'Management' }
      ],
      projects: [
        { id: '1', name: 'Website Redesign', status: 'in-progress' },
        { id: '2', name: 'Mobile App Development', status: 'completed' },
        { id: '3', name: 'API Integration', status: 'planning' }
      ]
    },
    {
      id: '2',
      name: 'Design Studio',
      description: 'Agencia creativa especializada en diseño gráfico, branding y experiencias digitales únicas.',
      nit: '900.987.654-3',
      address: 'Cl. 72 # 11-45, Medellín, Colombia',
      phone: '+57 4 123 4567',
      email: 'hello@designstudio.com',
      sector: 'Diseño',
      isActive: true,
      iconId: 'office',
      workers: [
        { id: '4', name: 'Ana Martínez', role: 'Creative Director', department: 'Design' },
        { id: '5', name: 'Luis Torres', role: 'Graphic Designer', department: 'Design' }
      ],
      projects: [
        { id: '4', name: 'Brand Identity Project', status: 'completed' },
        { id: '5', name: 'Marketing Campaign', status: 'in-progress' }
      ]
    },
    {
      id: '3',
      name: 'Marketing Pro',
      description: 'Consultora de marketing digital enfocada en estrategias de crecimiento y publicidad online.',
      nit: '900.456.789-1',
      address: 'Av. El Poblado # 34-12, Medellín, Colombia',
      phone: '+57 4 987 6543',
      email: 'info@marketingpro.com',
      sector: 'Marketing',
      isActive: true,
      iconId: 'chart',
      workers: [
        { id: '6', name: 'Sofía Ramírez', role: 'Marketing Manager', department: 'Marketing' },
        { id: '7', name: 'Diego Herrera', role: 'SEO Specialist', department: 'Marketing' },
        { id: '8', name: 'Laura Gómez', role: 'Content Creator', department: 'Marketing' }
      ],
      projects: [
        { id: '6', name: 'Social Media Strategy', status: 'in-progress' },
        { id: '7', name: 'Email Marketing Campaign', status: 'planning' }
      ]
    }
  ]);

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companies, searchTerm]);

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsDetailsModalOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const handleCreateCompany = (newCompany: Company) => {
    setCompanies(prev => [...prev, newCompany]);
  };

  const handleUpdateCompany = (updatedCompany: Company) => {
    setCompanies(prev => 
      prev.map(company => 
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
  };

  const handleDeleteCompany = (companyId: string) => {
    setCompanies(prev => prev.filter(company => company.id !== companyId));
    showWarning('Empresa eliminada correctamente');
  };

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 p-8 overflow-auto transition-all duration-200 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Empresa
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre o ID de empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Header with logo and company info */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center bg-white shrink-0">
                      <div className="text-gray-600">
                        {getIconById(getCompanyIcon(company.id))}
                      </div>
                    </div>
                    
                    {/* Company Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        NIT: {company.nit}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {company.sector}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          company.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {company.isActive ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-3H7a3 3 0 00-5.356 3v2h5zM7 9a5 5 0 0110 0v6a5 5 0 01-10 0V9a5 5 0 0110 0z" />
                      </svg>
                      <span>{company.workers.length} trabajadores</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <span>{company.projects.length} proyectos</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 flex gap-3">
                  <button
                    onClick={() => handleEditCompany(company)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleCompanyClick(company)}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron empresas con "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CompanyDetailsModal
        company={selectedCompany}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedCompany(null);
        }}
      />

      <CreateCompanyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateCompany={handleCreateCompany}
      />

      <EditCompanyModal
        key={selectedCompany?.id || 'new'}
        company={selectedCompany}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCompany(null);
        }}
        onUpdateCompany={handleUpdateCompany}
      />
      
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
}
