import React from 'react'
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Text,
  Center,
  Box,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import {GlobalInfo} from '../Context/AuthContext'
import { NavLink,useNavigate } from "react-router-dom";
const InitialStates = {
  email : "",
  password : "", 
}

function Login() {

 const [formState, setFormState] = React.useState(InitialStates);
  const {login} = React.useContext(GlobalInfo); 
   const Nav = useNavigate()
  const handleChange = (e)=>{
     const {name} = e.target
     setFormState((oldState)=>{return{
      ...oldState,
      [name] : e.target.value
     }})
  } 
  const {email,password} = formState
 
 const handleSubmit = (event)=>{
    event.preventDefault();
    if(email&&password)
    {
      login(email,password);
      Nav('/dash');
    }else{
      alert("Fill the Credentials Before submitting!");
    }
    setFormState(InitialStates);
 }
  return (
    <Box width={"300px"} margin={"auto"} mt={"15%"} boxShadow='2xl' p='6' rounded='md' bg='white'>
      <form onSubmit={handleSubmit}>
      <FormControl>
 <FormLabel>Email address</FormLabel>
  <Input 
  type='email'
  name="email" 
  placeholder="Enter E-mail"
  value={formState.email}
  onChange={handleChange} 
  />
  <br /><br />
  <FormLabel>Password</FormLabel>
  <Input 
  type='password'
  name="password" 
  placeholder="Enter Password"
  value={formState.password}
  onChange={handleChange} 
  />
  <Button mt={4} colorScheme='teal' type='submit'>Login</Button>
</FormControl>
      </form>
     <Text mt={"10px"} fontSize='md'>Don't Have Account Please Create at <NavLink id="sidebar" to={'/signup'} activeclassname = "underline">Register</NavLink></Text>   
    </Box>
  )
}

export default Login