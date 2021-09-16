import React from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Container textAlign="center">
        <VStack spacing={4}>
          <Heading m={[0, 0, 1]}>Help keep our oceans alive</Heading>
          <Text>
            Sharks play a critical role in marine ecosystems. Help protect them
            by reporting shark catches and other interactions with humans. 🦈
          </Text>

          <HStack spacing={4} marginTop={3}>
            <Link href="/report">
              <Button variant="solid">Report Sighting</Button>
            </Link>
            <Link href="/education">
              <Button variant="outline">Learn More</Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Flex>
  );
}
