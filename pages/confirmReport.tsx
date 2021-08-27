import React from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from 'next/link'

export default function ConfirmReport() {
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
        <Heading m={1}>Thank you for reporting!</Heading>
            <Text>This data will help to provide valuable information about our oceans and help to protect sharks and humans alike.</Text>
        <Link  href="/" passHref>
            <Button m={5} colorScheme="teal">Home</Button>
        </Link>
        
      </Flex>
      
    
  );
}