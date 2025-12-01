






import React, { createContext, useState, useContext, useEffect } from 'react';







import * as SecureStore from 'expo-secure-store';







import { api } from '../services/api';







import { jwtDecode } from 'jwt-decode';















interface UserProfile {







  id: string;







  id_usuario: number;







  id_rol: number;







  username: string;







  nombre: string;







  apellido: string;







  rol: string;







  estado: string;







}















interface AuthContextData {







  user: UserProfile | null;







  isAuthenticated: boolean;







  signIn: (username, password) => Promise<void>;







  signOut: () => void;







}















const AuthContext = createContext<AuthContextData>({} as AuthContextData);















export const AuthProvider: React.FC = ({ children }) => {







  const [user, setUser] = useState<UserProfile | null>(null);















  useEffect(() => {







    const loadUser = async () => {







      const token = await SecureStore.getItemAsync('token');







      if (token) {







        const decodedToken: any = jwtDecode(token);







        // This is a temporary solution. In a real app, you would fetch the user profile from the backend.







        setUser({







          id: decodedToken.id,







          id_usuario: decodedToken.id,







          username: decodedToken.username,







          id_rol: 0, // Hardcoded for now







          nombre: decodedToken.username,







          apellido: '', // Hardcoded for now







          rol: '', // Hardcoded for now







          estado: 'Activo', // Hardcoded for now







        });







      }







    };







    loadUser();







  }, []);















  const signIn = async (username, password) => {







    const response = await api.post<{ token: string }>('auth/login', { username, password });







    if (response && response.token) {







      await SecureStore.setItemAsync('token', response.token);







      const decodedToken: any = jwtDecode(response.token);







      // This is a temporary solution. In a real app, you would fetch the user profile from the backend.







      setUser({







        id: decodedToken.id,







        id_usuario: decodedToken.id,







        username: decodedToken.username,







        id_rol: 0, // Hardcoded for now







        nombre: decodedToken.username,







        apellido: '', // Hardcoded for now







        rol: '', // Hardcoded for now







        estado: 'Activo', // Hardcoded for now







      });







    } else {







      throw new Error('Invalid credentials');







    }







  };















  const signOut = async () => {







    await SecureStore.deleteItemAsync('token');







    setUser(null);







  };















  return (







    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut }}>







      {children}







    </AuthContext.Provider>







  );







};















export function useAuth() {







  const context = useContext(AuthContext);







  if (!context) {







    throw new Error('useAuth must be used within an AuthProvider');







  }







  return context;







}












