import {
	Box,
	Button,
	DialogActionTrigger,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";

import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"

import { useProductStore } from "../store/product";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode.jsx"
import { toaster } from "./ui/toaster"
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [openUpdateDiagolde, setOpenUpdateDiagolde] = useState(false)
    const [openDeleteDiagolde, setOpenDeleteDiagolde] = useState(false)
    const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
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
	};

    const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
        setOpenUpdateDiagolde(false)
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
	};

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />  
            <Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack gap={2}>
					<IconButton colorPalette='blue' onClick={() => setOpenUpdateDiagolde(true)}><FaEdit /></IconButton>
					<IconButton
						onClick={() => setOpenDeleteDiagolde(true)}
						colorPalette='red'
					>
                        <MdDeleteForever />
                    </IconButton>
				</HStack>
			</Box>

            <DialogRoot motionPreset={'slide-in-bottom'} placement={'center'} lazyMount open={openUpdateDiagolde} onOpenChange={(e) => setOpenUpdateDiagolde(e.open)}>
                <DialogContent>
                    <DialogCloseTrigger />
                    <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <VStack gap={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button
							colorPalette='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
                        <DialogActionTrigger asChild>
                            <Button variant='ghost'>
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>

            <DialogRoot motionPreset={'slide-in-bottom'} role="alertdialog" placement={'center'} lazyMount open={openDeleteDiagolde} onOpenChange={(e) => setOpenDeleteDiagolde(e.open)}>
                <DialogContent>
                    <DialogCloseTrigger />
                    <DialogHeader>
                    <DialogTitle>Delete Product?</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <p> are you sure you want to delete this product?</p>
                    </DialogBody>
                    <DialogFooter>
                        <Button
							colorPalette={'red'}
							mr={3}
							onClick={() => handleDeleteProduct(product._id)}
						>
							Delete
						</Button>
                        <DialogActionTrigger asChild>
                            <Button variant={'ghost'}>
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>

        </Box>
    )

} 

export default ProductCard;
