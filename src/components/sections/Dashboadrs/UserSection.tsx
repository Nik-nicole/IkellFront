import React, { useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import { useUser } from '../../../context/UserContext';

const DEFAULT_BANNERS = [
  { type: 'image', value: 'https://images.unsplash.com/photo-1553877522-43269d4ea984' },
  { type: 'image', value: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c' },
  { type: 'image', value: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12' },
  { type: 'color', value: '#FADADD' },
  { type: 'color', value: '#D1FAE5' },
  { type: 'color', value: '#FFE4C4' },
  { type: 'color', value: '#DBEAFE' },
  { type: 'gradient', value: 'linear-gradient(135deg,#cfd9df,#e2ebf0)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#fbc2eb,#a6c1ee)' },
];

export default function UserSection() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userData, updateUserData, updatePhoto, updateBanner } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setEditedData({ ...editedData, photo: result });
      updatePhoto(result); // backend
    };
    reader.readAsDataURL(file);
  };

  const handleBannerChange = (banner: string) => {
    setEditedData({ ...editedData, banner });
  };

  const bannerStyle = () => {
    const banner = isEditing ? editedData.banner : userData.banner;
    if (!banner) {
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      };
    }
    
    // Si es un gradiente
    if (banner.includes('gradient')) {
      return {
        background: banner
      };
    }
    
    // Si es un color sólido
    if (banner.startsWith('#')) {
      return {
        backgroundColor: banner
      };
    }
    
    // Si es una imagen
    return {
      backgroundImage: `url(${banner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  };

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`flex-1 p-10 transition-all duration-200 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white">

          {/* BANNER */}
          <div
            className="relative h-72 flex items-center justify-center"
            style={bannerStyle()}
          >
            <div className="absolute inset-0 bg-black/30" />

            {!isEditing && (
              <div className="absolute top-6 right-6 z-20">
                <Button variant="secondary" onClick={() => setIsEditing(true)}>
                  Editar perfil
                </Button>
              </div>
            )}

            {/* TEXT */}
            <div className="relative z-10 text-center text-white">
              <h1 className="text-4xl font-bold">
                {isEditing ? editedData.name : userData.name}
              </h1>
              <p className="text-lg opacity-90">
                {isEditing ? editedData.role : userData.role}
              </p>
            </div>

            {/* AVATAR */}
            <div className="absolute -bottom-12 left-10 z-20">
              <div className="relative">
                <img
                  src={editedData.photo}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
                    ✎
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="pt-20 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {isEditing ? (
              <>
                <Input label="Nombre" value={editedData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />

                <Input label="Rol" value={editedData.role}
                  onChange={(e) => setEditedData({ ...editedData, role: e.target.value })} />

                <Input label="Teléfono" value={editedData.phone}
                  onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })} />

                <Input label="Correo" value={editedData.email}
                  onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} />

                {/* Banner selector */}
                <div className="col-span-full">
                  <p className="text-sm text-gray-500 mb-2">Selecciona un banner</p>
                  <div className="grid grid-cols-5 gap-4">
                    {DEFAULT_BANNERS.map((b, i) => (
                      <button
                        key={i}
                        onClick={() => handleBannerChange(b.value)}
                        className={`h-20 rounded-xl border hover:ring-2 ring-black transition ${
                          (isEditing ? editedData.banner : userData.banner) === b.value
                            ? 'ring-2 ring-blue-500 border-blue-500'
                            : ''
                        }`}
                        style={
                          b.type === 'image'
                            ? { backgroundImage: `url(${b.value})`, backgroundSize: 'cover' }
                            : b.type === 'gradient'
                            ? { backgroundImage: b.value }
                            : { backgroundColor: b.value }
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="col-span-full flex gap-4 pt-6">
                  <Button onClick={() => { 
                    updateUserData(editedData); 
                    if (editedData.banner && editedData.banner !== userData.banner) {
                      updateBanner(editedData.banner);
                    }
                    setIsEditing(false); 
                  }}>
                    Guardar cambios
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <ProfileItem label="Nombre" value={userData.name} />
                <ProfileItem label="Rol" value={userData.role} />
                <ProfileItem label="Teléfono" value={userData.phone} />
                <ProfileItem label="Correo" value={userData.email} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}
