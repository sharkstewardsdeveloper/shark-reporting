import React from "react";
import {
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
// import Quiz from "../components/Quiz";

export default function Education() {
  return (
    <Flex
      flexDirection="row"
      width="100%"
      height="100%"
      backgroundImage="url(/shark_1.png)"
      backgroundSize="cover"
      backgroundPosition="center center"
    >
      <HStack
        width="full"
        height="full"
        alignItems="center"
        justify="center"
        bgGradient="linear(to-t, blackAlpha.600, transparent)"
        padding="15%"
      >
        <Heading ml={6} mr={6} fontSize={["3xl", "4xl", "5xl"]}>
          <Text as="span" position="relative" color="white">
            Learn about
          </Text>
          <Spacer as="br" display={["none", "none", "inline"]} />{" "}
          <Text color="teal.300" as="span">
            Sharks
          </Text>{" "}
        </Heading>
        <VStack mr={5}>
          <Link href="/quiz">
            <Button>Practice your knowledge</Button>
          </Link>
          <Link href="https://sharkstewards.org/">
            <Button
              variant="outline"
              color={useColorModeValue("teal.400", "teal.300")}
            >
              Go to sharkstewards.org
            </Button>
          </Link>
        </VStack>
        <Flex></Flex>
      </HStack>
    </Flex>
  );
}
