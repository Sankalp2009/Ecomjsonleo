import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import {useNavigate} from 'react-router-dom'
import {
  Button,
} from '@chakra-ui/react'
import {GlobalInfo} from '.././Context/AuthContext'
function Header() 
{
 const {authState,Logout} = React.useContext(GlobalInfo);
     const nav = useNavigate()
   const handleClick = ()=>{
      Logout()
      nav('/');
   }
  return (
    <>
    {!authState.isAuth ? 
     (<div className="container">
    <Link to="/">Home</Link>
    <Link to="/signup">Register</Link>
    <Link to="/login">Login</Link>
    <Link to="/dash">Dashboard</Link>
  </div>) 
  : 
   (<div className="container">
   <Link to="/">Home</Link>
   <Button bgColor="black" color="whitesmoke"onClick={handleClick}>Logout</Button>
   <Link to="/dash">Dashboard</Link>
 </div>)}
    </>
  )
}
export default Header