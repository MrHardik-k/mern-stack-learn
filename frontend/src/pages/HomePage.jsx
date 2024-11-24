import { Container, VStack,Text, HStack, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from "react";
import { useColorModeValue } from "../components/ui/color-mode.jsx"
import { IoIosRocket } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.jsx';
 
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW={"2/3"} py={12}>
      <VStack spaceY={10}>
      <HStack
          fontSize={{ base: "2xl", sm: "2.8xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          color={useColorModeValue("blue.500", "cyan.400")}
        >
        <Text>
          Current Products
        </Text>
        <IoIosRocket />
      </HStack>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        gap={10}
        w={"full"}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>

      {products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
      </VStack>
    </Container>
  )
}

export default HomePage