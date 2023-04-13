import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Grid,
  Select,
  GridItem,
  Box,
  Image,
  Divider,
  Button,
  Stack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'
 // Function to get the current page
const getCurrentPage = (value) => {
  value = Number(value);
   // If the value is a number and less than or equal to 0, set the value to 1
  if (typeof value === 'number' && value <= 0) {
    return (value = 1);
  }
   // If no value is provided, set the value to 1
  if (!value) {
    return (value = 1);
  }
   return value;
};
 // Function to generate the API URL
const apiUrl = (page, Limit, sort, orderby, filter) => {
  // If all parameters are provided
  if (sort && orderby && filter) {
    return `http://localhost:8080/Products?_page=${page}&_limit=${Limit}&_sort=${sort}&_order=${orderby}&category=${filter}`;
  }
   // If only sort and orderby parameters are provided
  else if (sort && orderby) {
    return `http://localhost:8080/Products?_page=${page}&_limit=${Limit}&_sort=${sort}&_order=${orderby}`;
  }
   // If only filter parameter is provided
  else if (filter) {
    return `http://localhost:8080/Products?_page=${page}&_limit=${Limit}&category=${filter}`;
  }
   // If no parameters are provided
  else {
    return `http://localhost:8080/Products?_page=${page}&_limit=${Limit}`;
  }
};
 function Dashboard() {
  const [searchparams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('price');
  const [page, setPage] = useState(getCurrentPage(searchparams.get('page')) || 1);
  const [filter, setFilter] = useState(searchparams.get('filter') || '');
  const [orderby, setOrderBy] = useState(searchparams.get('orderby') || '');
  const [total, setTotal] = useState(0);
  const Limit = 8;
  const [isLoading, setIsLoading] = useState(false);
   // Handling data fetching
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        let Response = await axios.get(apiUrl(page, Limit, sort, orderby, filter));
        setTotal(Number(Response.headers.get('x-total-count')));
        setData(Response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [page, orderby, filter]);
   useEffect(() => {
    let params = { page };
    if (orderby) {
      params.orderby = orderby;
    }
    if (filter) {
      params.filter = filter;
    }
    setSearchParams(params);
  }, [page, orderby, filter]);
   if (isLoading) return <div>Loading...</div>;
   return (
    <Box>
      <Box display="flex" flexDirection="column" gap="20px" align="center" p={"5%"}>
        <Box display="flex" gap="20px" justifyContent="center">
          <Button onClick={(e) => setFilter("men's clothing")}>Filter_By_Men's clothing</Button>
          <Button onClick={(e) => setFilter("women's clothing")}>Filter_By_women's clothing</Button>
          <Button onClick={(e) => setFilter("electronics")}>electronics</Button>
          <Button onClick={(e) => setFilter("jewelery")}>jewelery</Button>
          <Button onClick={(e) => setFilter("")}>Reset</Button>
        </Box>
        <Box display="flex" gap="20px" justifyContent="center">
          <Button onClick={(e) => setOrderBy("asc")}>Ascending</Button>
          <Button onClick={(e) => setOrderBy("desc")}>Descending</Button>
          <Button onClick={(e) => setOrderBy("")}>Reset</Button>
        </Box>
        <Box display="flex" gap="20px" justifyContent="center">
          <Button
            variant="solid"
            colorScheme="teal"
            isDisabled={page === 1}
            size="sm"
            onClick={(e) => setPage(page - 1)}
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
          >
            Prev
          </Button>
          <Button variant="solid" colorScheme="teal" size="sm" _hover={{
            bgGradient: 'linear(to-r, red.500, yellow.500)',
          }}>
            Current: {page}
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            isDisabled={page === Math.ceil(total / Limit)}
            size="sm"
            onClick={(e) => setPage(page + 1)}
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
          >
            Next
          </Button>
        </Box>
          <Grid templateColumns={{lg:"repeat(4, 1fr)",md:"repeat(2, 1fr)",base:"repeat(1, 1fr)"}} templateRows="auto" gap={6}>
            {data &&
              data.map((el, index) => (
                <Box key={el.id}>
                  <Card width={"auto"} boxShadow="xl" rounded="md">
                    <CardBody>
                      <Image
                        width="150px"
                        height="150px"
                        src={el.image}
                        alt="Matrix"
                      />
                      <Stack mt="3" spacing="3">
                        <Heading
                          size="sm"
                          bgGradient="linear(to-l, #7928CA, #FF0080)"
                          bgClip="text"
                          fontWeight="bold"
                        >
                          {el.title}
                        </Heading>
                        <Text color="blue.600" fontSize="md">
                          ${el.price}
                        </Text>
                      </Stack>
                    </CardBody>
                    <CardFooter mt="-5">
                      <Link to={`/dash/${el.id}`}>
                        <Button
                          variant="solid"
                          colorScheme="teal"
                          size="sm"
                          _hover={{
                            bgGradient: 'linear(to-r, red.500, yellow.500)',
                          }}
                        >
                          More Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </Box>
              ))}
          </Grid>
      </Box>
    </Box>
  );
}
 export default Dashboard;