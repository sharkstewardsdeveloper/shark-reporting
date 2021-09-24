import { Authentication } from "../components/Authentication";
import { AppFooter } from "../components/AppFooter";
import Head from "next/head";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ChakraProvider,
  Flex,
  Grid,
  Link,
} from "@chakra-ui/react";
import "../styles/globals.css";
import "../styles/date-picker.css";
import { theme } from "../styles/theme";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AppHeader } from "../components/AppHeader";

export default function MyApp({ Component, pageProps }) {
  return (
    <Authentication>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Shark Watch CA · Shark Stewards</title>
        </Head>
        <Grid templateRows="min-content min-content 1fr auto" height="100vh">
          <AppHeader />
          <Alert status="warning" justifyContent="center" marginBottom="4">
            <AlertIcon />
            <Flex direction={["column", "column", "row"]}>
              <AlertTitle>
                Shark Watch CA is currently under construction!
              </AlertTitle>
              <Link
                href="https://github.com/sharkstewardsdeveloper/shark-reporting"
                target="_blank"
                rel="noopener noreferrer"
                isExternal
              >
                <AlertDescription>
                  Please reach out if you&apos;d like to contribute. 🧑‍💻{" "}
                  <ExternalLinkIcon mx="2px" />
                </AlertDescription>
              </Link>
            </Flex>
          </Alert>
          <Component {...pageProps} />
          <AppFooter />
        </Grid>
      </ChakraProvider>
    </Authentication>
  );
}
