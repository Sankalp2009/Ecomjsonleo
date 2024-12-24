import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link, useSearchParams } from 'react-router-dom';
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
} from '@chakra-ui/react';

// Function to get the current page
const getCurrentPage = (value) => {
  if (value === null || value === undefined) {
    return 1;
  }
  value = Number(value);
  if (isNaN(value) || value <= 0) {
    return 1;
  }
  return value;
};

// Function to generate the API URL
const apiUrl = (page, perPage, sort, filter) => {
  if (sort && filter) {
    return `http://localhost:8080/Products?_page=${page}&_per_page=${perPage}&_sort=${sort}&category=${filter}`;
  }
  else if (sort) {
    return `http://localhost:8080/Products?_page=${page}&_per_page=${perPage}&_sort=${sort}`;
  }
   // If only filter parameter is provided
  else if (filter) {
    return `http://localhost:8080/Products?_page=${page}&_per_page=${perPage}&category=${filter}`;
  } 
  else {
    return `http://localhost:8080/Products?_page=${page}&_per_page=${perPage}`;
  }
};

function Dashboard() {
  const [searchparams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(getCurrentPage(searchparams.get('page')) || 1);
  const [filter, setFilter] = useState(searchparams.get('filter') || '');
  const [total, setTotal] = useState(0);
  const perPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  console.log(sort);

  // Handling data fetching
  const loadData = async () => {
    try {
      setIsLoading(true);
      let response = await axios.get(apiUrl(page, perPage, sort,filter));
      setTotal(Number(response.headers['x-total-count']));
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    
    let params = { page };
    
    if (sort) {
      params.sort = sort;
    }
    
    if (filter) {
      params.filter = filter;
    }
    
    setSearchParams(params);
  
  }, [page,sort, filter]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap="20px" align="center" p={"5%"}>
        <Box display="flex" gap="20px" justifyContent="center">
          <Button onClick={() => setFilter("men's clothing")}>Filter_By_Men's clothing</Button>
          <Button onClick={() => setFilter("women's clothing")}>Filter_By_women's clothing</Button>
          <Button onClick={() => setFilter("electronics")}>electronics</Button>
          <Button onClick={() => setFilter("jewelery")}>jewelery</Button>
          <Button onClick={() => setFilter("")}>Reset</Button>
        </Box>
        <Box display="flex" gap="20px" justifyContent="center">
          <Button onClick={() => setSort("price")}>Ascending</Button>
          <Button onClick={() => setSort("-price")}>Descending</Button>
          <Button onClick={() => setSort("")}>Reset</Button>
        </Box>
        <Box display="flex" gap="20px" justifyContent="center">
          <Button
            variant="solid"
            colorScheme="teal"
            isDisabled={page === 1}
            size="sm"
            onClick={() => setPage(page - 1)}
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
            isDisabled={page === Math.ceil(total / perPage)}
            size="sm"
            onClick={() => setPage(page + 1)}
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
          >
            Next
          </Button>
        </Box>
        <Grid templateColumns={{ lg: "repeat(4, 1fr)", md: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }} templateRows="auto" gap={6}>
          {data &&
            data.map((el) => (
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

