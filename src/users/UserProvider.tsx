import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { customFetch } from '../service/api-client';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextProps {
    loading: boolean;
    users: [];
}



const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<[]>([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

   

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            if(!auth.token) return;
            const response = await customFetch.get('/users',{
              headers: { Authorization: `Bearer ${auth.token?.token}`}
            });
            const data = response.data
            setUsers(data);
          } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);


     
     
    return (
        <UserContext.Provider value={{ loading,users  }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const auth = useAuth();
    const navigae = useNavigate();
    
    if(!auth.token) navigae('/login');
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};