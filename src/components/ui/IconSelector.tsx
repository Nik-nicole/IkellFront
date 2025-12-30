import React from 'react';
import { useCompanyIcons } from '../../hooks/useCompanyIcons';

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (iconId: string) => void;
  label?: string;
}

export default function IconSelector({ selectedIcon, onIconSelect, label = "Seleccionar icono" }: IconSelectorProps) {
  const { availableIcons } = useCompanyIcons();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-4 gap-3">
        {availableIcons.map((icon) => (
          <button
            key={icon.id}
            type="button"
            onClick={() => onIconSelect(icon.id)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200
              ${selectedIcon === icon.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
            title={icon.name}
          >
            <div className="w-8 h-8 text-gray-600 flex items-center justify-center">
              {icon.icon}
            </div>
            {selectedIcon === icon.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-8-8a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
