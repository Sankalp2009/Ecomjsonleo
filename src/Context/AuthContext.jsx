import React, { createContext ,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
export const GlobalInfo = createContext();
  
  const AuthContext = ({ children }) =>{
  
    const [state, setState] = React.useState({
      isAuth: false,
      Token : null
    });

    const login = (token) => 
    {
         setState({
          isAuth:true,
          Token : token
        });
      localStorage.setItem('token', JSON.stringify(token)); 
    };
    const Logout = () => {
      setState({ 
        isAuth: false,
        Token: null 
      });
      localStorage.clear();
    };
  
    return (
      <GlobalInfo.Provider value={{ authState: state, login, Logout }}>
        {children}
      </GlobalInfo.Provider>
    );
  };
  export default AuthContext;
