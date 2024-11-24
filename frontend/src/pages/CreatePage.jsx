import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { toaster } from "../components/ui/toaster"
import { useColorModeValue } from "../components/ui/color-mode.jsx"
import { useProductStore } from '../store/product.js';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name:"",
        price:"",
        image:"",
    });

    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        console.log(newProduct)
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
            })
        } else {
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
            })
        }
        setNewProduct({ name: "", price: "", image: "" });
    };

    return (
        <Container maxW={{base:"11/12", sm:'5/6', lg:'2/3'}} marginTop={16}>
            <VStack>
				<Heading as={"h1"} size={{ base: "sm", sm:'xl', lg:"2xl" }} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={{base:5, sm:8, lg:12}} rounded={"lg"} shadow={"md"}>
					<VStack spaceY={'5'}>
						<Input
							placeholder='Product Name'
							name='name'
							value={newProduct.name}
                            borderColor="gray.600"
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
                            borderColor="gray.600"
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
                            borderColor="gray.600"
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
            </VStack>
        </Container>
    )
}

export default CreatePage