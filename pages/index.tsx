import React from "react";
import { Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Heading m={1}>Help keep our oceans alive</Heading>
      <Text>Report shark sightings</Text>

      <Stack direction="row" spacing={4} m={3}>
        <Link href="/education">
          <Button variant="solid">Educate</Button>
        </Link>
        <Link href="/report">
          <Button variant="outline">Report</Button>
        </Link>
      </Stack>
    </Flex>
  );
}
