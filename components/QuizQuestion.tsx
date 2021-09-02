import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { Box, Badge, Text, Button, Image, HStack } from "@chakra-ui/react";

export default function QuizQuestion({
  sharkQuestion,
  nextQuestion,
  questionIndex,
  previousQuestion,
  checkAnswer,
}) {
  return (
    <Box maxW="lg" borderRadius="lg" overflow="hidden">
      <HStack justifyContent="space-between">
        <ArrowLeftIcon onClick={previousQuestion} />
        <ArrowRightIcon onClick={nextQuestion} />
      </HStack>
      <Box p="6">
        <Image
          borderRadius="40px"
          mt={2}
          mb={4}
          src={sharkQuestion.imageUrl}
          alt={sharkQuestion.imageAlt}
        ></Image>

        <Text mt="1" fontWeight="bold" as="h4" lineHeight="tight">
          {questionIndex + 1}. {sharkQuestion.question}
        </Text>
        <Box d="flex" mt="2" justifyContent="space-between" m={5}>
          {sharkQuestion.choices.map((choice, index) => (
            <Button key={index} m="1" fontWeight="semibold" lineHeight="short">
              {choice}
            </Button>
          ))}
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box color="white" fontSize="sm">
            <Text>{sharkQuestion.fact}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
