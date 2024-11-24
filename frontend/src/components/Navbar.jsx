import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation  } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode.jsx"
import { FaCartShopping } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const location = useLocation();
    // Determine which icon to show based on the current path
    const isHomePage = location.pathname === "/";
    const buttonIcon = isHomePage ? <CiSquarePlus fontSize={20} /> : <AiFillHome fontSize={20} />;

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
            gap={3}
        >

            {/* Logo Section */}
            <HStack as={Link} to="/" spaceX={2} alignItems={"center"}
                fontSize={{ base: "xl", sm:'2xl', lg:"3xl" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                color={useColorModeValue("blue.500", "cyan.400")}
            >
                <Text
                marginTop={2}>
                    Product Store
                </Text>
                <FaCartShopping />
            </HStack>

            {/* Buttons Section */}
            <HStack spaceX={2} alignItems={"center"}>
                <Link to={isHomePage?"/create":"/"}>
                    <Button>
                    {buttonIcon}
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