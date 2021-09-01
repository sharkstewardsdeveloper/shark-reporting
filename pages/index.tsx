import React from "react";
import {
  Container,
  Heading,
  Flex,
  Text,
  Button,
  Link,
  Stack,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
      backgroundColor={[
        "brand.primaryLight",
        "brand.primaryLight",
        "brand.primaryLight",
      ]}
      color={["brand.white", "brand.white", "brand.white"]}
    >
      <Heading m={1}>Help keep our oceans alive</Heading>
      <Text>Report shark sightings</Text>

      <Stack direction="row" spacing={4} m={3}>
        <Link href="/education">
          <Button colorScheme="teal" variant="solid">
            Educate
          </Button>
        </Link>

        <Link href="/report">
          <Button colorScheme="teal" variant="outline">
            Report
          </Button>
        </Link>
      </Stack>
    </Flex>
  );
}
