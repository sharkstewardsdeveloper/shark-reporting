import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Badge,
  Text,
  Button,
  Image,
  HStack,
  Icon,
} from "@chakra-ui/react";

export default function Quiz({}) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    setIsCorrect(null);
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

  const [isCorrect, setIsCorrect] = useState(null);

  const checkAnswer = (answer) => {
    setIsCorrect(questions[questionIndex].answer === answer ? true : false);
  };

  let questions = [
    {
      imageUrl: "/shark_1.png",
      imageAlt: "shark stewards",
      question:
        "What percentage of oceanic sharks and rays are threatened with extinction??",
      answer: "77%",
      choices: ["37%", "57%", "77%", "97%"],
      fact: "A 2021 study in the scientific journal Nature indicates 71 % of all shark and ray populations have disappeared and 77% of oceanic sharks and rays are threatened with extinction.",
    },
    {
      imageUrl: "/shark_2.png",
      imageAlt: "shark stewards",
      question:
        "How many species of large sharks are typically found off the California coast?",
      answer: "13",
      choices: ["3", "8", "13", "17"],
      fact: "There are around 13 large shark species typically caught off the CA coast. These species include white, hammerhead, mako, blue, basking, broadnose sevengill, soupfin, bluntnose sixgill, salmon, angel, along with 3 thresher shark species. However, while these are the most common large shark species, there are estimated to be over 34 species of various size groups that live in the surrounding marine ecosystems.",
    },
    {
      imageUrl: "/shark_3.png",
      imageAlt: "shark stewards",
      question:
        "Approximately how many sharks are killed for their fins annually?",
      answer: "75,000,000",
      choices: ["1,000,000", "10,000,000", "50,000,000", "75,000,000"],
      fact: "It is estimated that 73,000,000 – 100,000,000 sharks are killed for their fins, each year.",
    },
    {
      imageUrl: "/shark_4.png",
      imageAlt: "shark stewards",
      question:
        "Which shark species has had the most reported attacks off the California coast?",
      answer: "Great White",
      choices: ["Hammerhead", "Great White", "Blue Shark", "SevenGill"],
      fact: "There are a total of 172 attacks attributed to white sharks from 1950 to 2020, 14 of which resulted in fatalities. Most attacks occur when a white shark mistakes the victim for a seal or sea lion.",
    },
    {
      imageUrl: "/shark_5.png",
      imageAlt: "shark stewards",
      question: "What is the biggest danger sharks face today?",
      answer: "Overfishing",
      choices: ["Predation", "Overfishing", "Habitat Loss", "Mutation"],
      fact: "Overfishing represents the greatest threat to sharks and their survival.",
    },
  ];

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
          src={questions[questionIndex].imageUrl}
          alt={questions[questionIndex].imageAlt}
        ></Image>

        <Text mt="1" fontWeight="bold" as="h4" lineHeight="tight">
          {questionIndex + 1}. {questions[questionIndex].question}
        </Text>
        <Box d="flex" mt="2" justifyContent="space-between" m={5}>
          {isCorrect === false ? (
            <Icon mt={4} viewBox="0 0 200 200" color="red.500">
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          ) : isCorrect === true ? (
            <Icon mt={4} viewBox="0 0 200 200" color="green.500">
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          ) : (
            <Icon mt={4} viewBox="0 0 200 200" color="grey.500">
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          )}

          {questions[questionIndex].choices.map((choice, index) => (
            <Button
              onClick={() => checkAnswer(choice)}
              key={index}
              m="1"
              fontWeight="semibold"
              lineHeight="short"
            >
              {choice}
            </Button>
          ))}
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box color="white" fontSize="sm">
            <Text>{questions[questionIndex].fact}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
