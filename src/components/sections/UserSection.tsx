import React, { useState } from 'react';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import Sidebar from '../layout/Sidebar';
import { useUser } from '../../context/UserContext';

export default function UserSection() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userData, updateUserData, updatePhoto } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [hasPhotoChanged, setHasPhotoChanged] = useState(false);

  const handleEdit = () => {
    setEditedData(userData);
    setIsEditing(true);
    setHasPhotoChanged(false);
  };

  const handleSave = () => {
    // Si la foto cambió, actualizarla como personalizada
    if (hasPhotoChanged) {
      updatePhoto(editedData.photo, true);
    }
    
    // Actualizar los demás datos (la foto se mantiene si es personalizada)
    updateUserData(editedData);
    setIsEditing(false);
    setShowSuccessModal(true);
    setHasPhotoChanged(false);
    
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
    setHasPhotoChanged(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({ ...editedData, photo: reader.result as string });
        setHasPhotoChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 p-8 overflow-auto`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración de Usuario</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Profile Photo Section */}
            <div className="flex items-center mb-8">
              <div className="relative">
                <img
                  src={isEditing ? editedData.photo : userData.photo}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditing ? editedData.name : userData.name}
                </h2>
                <p className="text-gray-500">{isEditing ? editedData.role : userData.role}</p>
              </div>
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Nombre"
                  value={isEditing ? editedData.name : userData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  disabled={!isEditing}
                  id="name"
                />
              </div>
              <div>
                <Input
                  label="Teléfono"
                  value={isEditing ? editedData.phone : userData.phone}
                  onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                  disabled={!isEditing}
                  id="phone"
                />
              </div>
              <div>
                <Input
                  label="Rol"
                  value={isEditing ? editedData.role : userData.role}
                  onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
                  disabled={!isEditing}
                  id="role"
                />
              </div>
              <div>
                <Input
                  label="Correo Electrónico"
                  type="email"
                  value={isEditing ? editedData.email : userData.email}
                  onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                  disabled={!isEditing}
                  id="email"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {!isEditing ? (
                <Button onClick={handleEdit} variant="primary">
                  Editar
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} variant="primary">
                    Guardar
                  </Button>
                  <Button onClick={handleCancel} variant="secondary">
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-black text-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all duration-300 scale-100 animate-pulse">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500 mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-white mb-3">¡Cambios Guardados!</h3>
              <p className="text-gray-300 mb-8 text-lg">Tu información ha sido actualizada exitosamente.</p>
              
              {/* Success Button */}
              <Button
                onClick={() => setShowSuccessModal(false)}
                variant="primary"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6"
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
