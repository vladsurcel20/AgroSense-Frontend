import React, { useEffect } from 'react'
import { createContext, useState, ReactNode, useContext} from 'react'
import { loginAPI, registerAPI } from '../services/AuthService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';


interface AuthContext{
    isLogged: boolean,
    login: (email: string, password:string) =>  Promise<AxiosResponse | undefined>,
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<AxiosResponse | undefined>,
    logout: () => void
}


export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const navigate = useNavigate();

    // const checkAuth = () => {
    //   setIsLogged(!!token); // Dacă există, utilizatorul este logat
    // };

    // useEffect(() => {
    //     checkAuth();
    // }, []);

  
    const login = async (email: string, password: string) => {
        try {
          const response = await loginAPI(email, password);
        if (response) {
            setIsLogged(true);
            navigate('/dashboard')
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
  
    const logout = () => {
      localStorage.removeItem('jwt');
      setIsLogged(false);
      localStorage.removeItem('user')
    };
  
  
    return (
      <AuthContext.Provider value={{isLogged, login, register, logout}}>
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

