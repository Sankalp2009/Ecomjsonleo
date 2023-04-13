import React, { createContext ,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { redirect } from "react-router-dom";
export const GlobalInfo = createContext();
  
  const AuthContext = ({ children }) =>{
  
    const [state, setState] = React.useState({
      isAuth: false,
    });
    const defaultUserCred = { email: '', password: '' };

    let UserCred;
    try {
      UserCred = JSON.parse(localStorage.getItem('cred')) || defaultUserCred;
    } catch (error) {
      console.log(error);
    }  
    console.log(`Auth`,UserCred);
    const login = (email, password) => 
    {
      if(UserCred.email === email && UserCred.password === password) 
      {
         setState({isAuth:true});
      } 
    };
    const Logout = () => {
      localStorage.removeItem('cred');
      setState({ isAuth: false });
    };
  
    return (
      <GlobalInfo.Provider value={{ authState: state, login, Logout }}>
        {children}
      </GlobalInfo.Provider>
    );
  };
  export default AuthContext;
