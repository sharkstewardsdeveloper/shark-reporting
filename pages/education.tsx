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

  const checkAnswer = (answer) => {
    questions[questionIndex].answer === answer ? true : false;
  };

  let questions = [
    {
      imageUrl: "/shark_1.png",
      imageAlt: "shark stewards",
      question:
        "What percentage of oceanic sharkQuestions and rays are threatened with extinction??",
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
      answer: "White Shark",
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
    <Flex
      align="center"
      justify="center"
      flexDirection="row"
      width="100%"
      height="100%"
    >
      <VStack m={5} p={2}>
        <QuizQuestion
          questionIndex={questionIndex}
          sharkQuestion={questions[questionIndex]}
          nextQuestion={nextQuestion}
          previousQuestion={previousQuestion}
          checkAnswer={checkAnswer}
        />
      </VStack>
    </Flex>
  );
}
