import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateUserAvatar } from '../hooks/useUserAvatar';

interface UserData {
  name: string;
  phone: string;
  role: string;
  email: string;
  photo: string;
  hasCustomPhoto?: boolean; // Para saber si la foto es personalizada
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: UserData) => void;
  updateAvatar: (name: string) => void;
  updatePhoto: (photo: string, isCustom?: boolean) => void;
}

const defaultUserData: UserData = {
  name: 'Super Admin',
  phone: '+1 234 567 8900',
  role: 'Administrator',
  email: 'admin@company.com',
  photo: generateUserAvatar('Super Admin', 200), // Avatar dinámico por defecto
  hasCustomPhoto: false // Por defecto no tiene foto personalizada
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Cargar datos desde localStorage al iniciar
  const loadUserData = (): UserData => {
    try {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
    }
    return defaultUserData;
  };

  const [userData, setUserData] = useState<UserData>(loadUserData);

  // Guardar en localStorage cada vez que cambien los datos
  const saveUserData = (data: UserData) => {
    try {
      localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  };

  const updateUserData = (data: UserData) => {
    // Si el usuario no tiene foto personalizada, generar una basada en el nombre
    if (!userData.hasCustomPhoto) {
      data.photo = generateUserAvatar(data.name, 200);
      data.hasCustomPhoto = false;
    }
    // Si tiene foto personalizada, mantener la foto existente
    
    setUserData(data);
    saveUserData(data); // Guardar en localStorage
  };

  // Función para actualizar solo el avatar cuando cambia el nombre (solo si no es personalizada)
  const updateAvatar = (name: string) => {
    if (!userData.hasCustomPhoto) {
      const newData = {
        ...userData,
        name,
        photo: generateUserAvatar(name, 200)
      };
      setUserData(newData);
      saveUserData(newData);
    } else {
      // Solo actualizar el nombre, mantener la foto personalizada
      const newData = { ...userData, name };
      setUserData(newData);
      saveUserData(newData);
    }
  };

  // Función para actualizar la foto personalizada
  const updatePhoto = (photo: string, isCustom: boolean = true) => {
    const newData = {
      ...userData,
      photo,
      hasCustomPhoto: isCustom
    };
    setUserData(newData);
    saveUserData(newData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, updateAvatar, updatePhoto }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
