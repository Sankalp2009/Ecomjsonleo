import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Box, Heading, Text,Button, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
function Notfound() {

  const Navigate = useNavigate()

  return (
    <Box  width={"300px"} margin={"auto"} mt={"15%"}>
      <Box>
         <Card boxShadow='2xl' p='6' rounded='md' bg='white'>
    <CardHeader>
      <Heading size='lg'>404</Heading>
    </CardHeader>
    <CardBody>
      <Text 
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
     fontWeight="bold">Sorry! Page Not Found</Text>
    </CardBody>
    <CardFooter>
      <Button colorScheme='blue'  onClick={()=>Navigate('/')}>Home</Button>
    </CardFooter>
  </Card>
      </Box>
    </Box>
  )
}

export default Notfound