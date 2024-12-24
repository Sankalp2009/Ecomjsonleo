import React, {useContext} from 'react'
import { GlobalInfo } from './../Context/AuthContext';
import {Navigate} from 'react-router-dom'
function PrivateRoute({children}){

  const {authState} = useContext(GlobalInfo);

   if(!authState.isAuth)
   {
     return <Navigate to={"/login"} />
   }
    return children;
}

export default PrivateRoute