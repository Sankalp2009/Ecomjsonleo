import React from 'react'
import axios from 'axios'
import '../App.css'
import {
  Box,
  Image,
  Button,
  Stack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'
import {Link,useParams} from 'react-router-dom'
function Single() {

 const {id} = useParams()
 const [data,setData] = React.useState("")
 const [isLoading, setIsLoading] = React.useState(false);
 console.log(id);
  
 React.useEffect(() => {
  const loadData = async () => {
    try {
      setIsLoading(true);
      let Response = await axios.get(`http://localhost:8080/Products/${id}`);
      console.log(Response.data);
      setData(Response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  loadData();
}, []);
  return (
    <Box mt={"50px"} p={10} align={"center"} >
         <Card boxShadow="xl" rounded="md" bg="white" border="1px solid black" width={"300px"} >
                    <CardBody>
                      <Image
                        width="150px"
                        height="150px"
                        src={data.image}
                        alt="Matrix"
                      />
                      <Stack mt="3" spacing="3">
                        <Heading
                          size="sm"
                          bgGradient="linear(to-l, #7928CA, #FF0080)"
                          bgClip="text"
                          fontWeight="bold"
                        >
                          {data.title}
                        </Heading>
                        <Text color="blue.600" fontSize="md">
                          ${data.price}
                        </Text>
                      </Stack>
                    </CardBody>
                    <CardFooter mt="-5">
                      <Link to={`/dash`}>
                        <Button
                          variant="solid"
                          colorScheme="teal"
                          size="sm"
                          _hover={{
                            bgGradient: 'linear(to-r, red.500, yellow.500)',
                          }}
                        >
                          Go Back
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
    </Box>
  )
}
export default Single