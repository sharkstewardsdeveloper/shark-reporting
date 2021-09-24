import React from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
      backgroundImage="url(/hero.webp)"
      backgroundSize="cover"
      backgroundPosition="center center"
    >
      <Flex
        width="full"
        height="full"
        alignItems="center"
        justify="center"
        bgGradient="linear(to-t, blackAlpha.600, transparent)"
      >
        <Container>
          <Stack spacing={[4, 6]} width="full" maxW="lg" paddingY={[4, 4, 0]}>
            <Heading fontSize={["3xl", "4xl", "5xl"]}>
              <Text as="span" position="relative" color="white">
                Keep our
              </Text>
              <Spacer as="br" display={["none", "none", "inline"]} />{" "}
              <Text color="teal.300" as="span">
                oceans alive
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.300"}>
              <Text as="strong" fontWeight="semibold" color="white">
                Sharks
              </Text>{" "}
              play a critical role in marine ecosystems. Protect them by
              reporting shark catches and other interactions with humans.
            </Text>
            <Stack
              direction={["column", "row"]}
              spacing="4"
              justifyContent="center"
              width="full"
            >
              <Link href="/report">
                <Button variant="solid">Report Sighting</Button>
              </Link>
              <Link href="/education">
                <Button
                  variant="outline"
                  color={useColorModeValue("teal.400", "teal.300")}
                >
                  Learn More
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Flex>
    </Flex>
  );
}
