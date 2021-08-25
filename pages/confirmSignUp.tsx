import React from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from 'next/link'

export default function ConfirmSignup() {
  return (
    
      <Flex 
        align="center"
        justify="center"
        flexDirection="column"
        width="100%"
        height="100%"
        backgroundColor={["brand.primaryLight", "brand.primaryLight", "brand.primaryLight"]}
        color={["brand.white", "brand.white", "brand.white"]}
      >
        <Heading m={1}>Thank you for signing up!</Heading>
            <Text>A confirmation link has been sent to your email.</Text>
        <Link  href="/" passHref>
            <Button m={5} colorScheme="teal">Home</Button>
        </Link>
        
      </Flex>
      
    
  );
}