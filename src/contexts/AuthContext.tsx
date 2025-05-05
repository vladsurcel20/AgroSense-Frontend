import React, { useEffect } from 'react'
import { createContext, useState, ReactNode, useContext} from 'react'
import { checkAuthAPI, loginAPI, logoutAPI, registerAPI } from '../services/AuthService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';


interface AuthContext{
    isLogged: boolean,
    user: User | null;
    login: (email: string, password:string) => Promise<AxiosResponse | undefined>,
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<AxiosResponse | undefined>,
    logout: () => void
}


export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const checkAuth = async () => {
      try {
        const response = await checkAuthAPI();
        setIsLogged(true);
        setUser(response!.data);
        sessionStorage.setItem("user", JSON.stringify(response!.data));
      } catch (error) {
        handleInvalidSession();
        navigate('/home');
      } 
    };

    useEffect(() => {
      checkAuth();
      const checkAuthInterval = setInterval(async () => {
        await checkAuth();
      }, 300000);
    
      return () => clearInterval(checkAuthInterval);
    }, []);

  
    const login = async (email: string, password: string) => {
        try {
          const response = await loginAPI(email, password);
          if (response) {
              setIsLogged(true);
              setUser(response.data.user);
              sessionStorage.setItem("user", JSON.stringify(response.data.user))
              navigate('/home')
              return response;
          }
        } catch (error) {
          console.error('Login failed', error);
        }
    };

    const register = async (firstName: string, lastName: string, email: string, password: string) => {
        try {
            const response = await registerAPI(firstName, lastName, email, password);
            return response
        } catch (error) {
            console.error('Registration failed', error);
        }
    };
  
    const logout = async () => {
      try {
        await logoutAPI(); 
      } finally {
        handleInvalidSession();
        navigate('/home');
      }
    };

    const handleInvalidSession = () => {
      setIsLogged(false);
      setUser(null);
      sessionStorage.clear();    
    };
  
  
    return (
      <AuthContext.Provider value={{isLogged, user, login, register, logout}}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = (): AuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

