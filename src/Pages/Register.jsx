import React from 'react'
import {
    FormControl,
    FormLabel,
    Button,
    Input,
    Text,
    Box,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  import { NavLink, useNavigate } from 'react-router-dom';
const InitialStates = {
    email : "",
    password : "", 
  }
function Register() {
    const [formState, setFormState] = React.useState(InitialStates);
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
        localStorage.setItem("cred",JSON.stringify(formState))
        Nav('/login');
        window.location.reload();
      }else{
        alert("Fill the Credentials Before submitting!");
      }
      setFormState(InitialStates);
   }


    return (
      <Box width={"400px"} margin={"auto"} mt={"15%"} boxShadow='2xl' p='6' rounded='md' bg='white'>
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
    <Button mt={4} colorScheme='teal' type='submit'>Register</Button>
  </FormControl>
        </form>
       
        <Text mt={"10px"} fontSize='md'>Already Have Account Please<NavLink id="sidebar" to={'/login'} activeclassname = "underline">Login</NavLink>!!</Text>      
      </Box>
    )
}

export default Register