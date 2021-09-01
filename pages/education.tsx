import React, { useState } from "react";

import {
  Heading,
  Flex,
  Box,
  Badge,
  Text,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
import QuizQuestion from "../components/QuizQuestion";

export default function Education() {
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert("quiz over");
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      alert("beginning");
    }
  };

  let questions = [
    {
      imageUrl: "/greatWhite.jpeg",
      imageAlt: "shark stewards",
      question:
        "What percentage of oceanic sharkQuestions and rays are threatened with extinction??",
      answer: "c",
      choices: ["37%", "57%", "77%", "97%"],
      fact: "A 2021 study in the scientific journal Nature indicates 71 % of all shark and ray populations have disappeared and 77% of oceanic sharks and rays are threatened with extinction.",
      rating: 4,
    },
    {
      imageUrl: "/greatWhite.jpeg",
      imageAlt: "shark stewards",
      question:
        "What percentage of oceanic sharkQuestions and rays are threatened with extinction??",
      answer: "c",
      choices: ["37%", "57%", "77%", "97%"],
      fact: "A 2021 study in the scientific journal Nature indicates 71 % of all shark and ray populations have disappeared and 77% of oceanic sharks and rays are threatened with extinction.",
      rating: 4,
    },
  ];

  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="row"
      width="100%"
      height="100%"
      backgroundColor={[
        "brand.primaryLight",
        "brand.primaryLight",
        "brand.primaryLight",
      ]}
      color={["brand.white", "brand.white", "brand.white"]}
    >
      <VStack m={5} p={2}>
        <QuizQuestion
          questionIndex={questionIndex}
          sharkQuestion={questions[questionIndex]}
          nextQuestion={nextQuestion}
          previousQuestion={previousQuestion}
        />
      </VStack>
    </Flex>
  );
}
