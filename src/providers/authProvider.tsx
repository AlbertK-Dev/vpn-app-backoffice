import React, { useState, createContext,  ReactNode, useEffect } from 'react';

export  interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string, rememberMe: boolean) => boolean;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const predefinedCredentials = {
  username: import.meta.env.VITE_LOGIN_USER,
  password: import.meta.env.VITE_LOGIN_PASSWORD,
};

 const AuthProvider:React.FC<{ children: ReactNode }> = ({ children } ) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string, rememberMe: boolean): boolean => {
    if (username === predefinedCredentials.username && password === predefinedCredentials.password) {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        localStorage.removeItem('isAuthenticated');
      }
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
   
  };

  return ( <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children} </AuthContext.Provider>);
};


export default AuthProvider