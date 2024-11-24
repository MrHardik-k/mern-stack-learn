import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode.jsx"
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return ( 
    <Container maxW={"1140px"} px={14}>
        <Flex   
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection ={{
                base: "column",
                sm: "row",
            }}
        >

            {/* Logo Section */}
            <HStack as={Link} to="/" spaceX={2} alignItems={"center"}
                fontSize={{ base: "2xl", sm: "2.8xl" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                color={useColorModeValue("blue.500", "cyan.400")}
            >
                <Text>
                    Product Store
                </Text>
                <FaCartShopping />
            </HStack>

            {/* Buttons Section */}
            <HStack spaceX={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <CiSquarePlus fontSize={20} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
				</Button>
            </HStack>
        </Flex>
    </Container>
    )
}

export default Navbar