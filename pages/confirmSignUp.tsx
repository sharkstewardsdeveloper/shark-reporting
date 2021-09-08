import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ConfirmSignup() {
  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Heading m={1}>Thank you for signing up!</Heading>
      <Text>A confirmation link has been sent to your email.</Text>
      <Link href="/" passHref>
        <Button m={5}>Home</Button>
      </Link>
    </Flex>
  );
}
