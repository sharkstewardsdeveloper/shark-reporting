import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import Quiz from "../components/Quiz";

export default function Education() {
  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="row"
      width="100%"
      height="100%"
    >
      <VStack m={5} p={2}>
        <Quiz />
      </VStack>
    </Flex>
  );
}
