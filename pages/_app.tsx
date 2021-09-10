import { Authentication } from "../components/Authentication";
import { AppFooter } from "../components/AppFooter";
import Head from "next/head";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import "../styles/globals.css";
import "../styles/date-picker.css";
import { theme } from "../styles/theme";
import { useSessionUser } from "../session/useSessionUser";
import { AuthModal } from "../components/Auth";
import { SignUpModal } from "../components/SignUpModal";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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

function AppHeader() {
  const { session, logout } = useSessionUser();
  const { isOpen: isAuthModalOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSignUpModalOpen,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure();

  return (
    <>
      <Flex as="header" align="center" justify="space-between" wrap="wrap">
        <Link title="Home" href="/">
          <Flex align="center" justify="flex-start">
            <Image
              m={1}
              boxSize={["42px", "64px", "88px"]}
              objectFit="cover"
              src="/ssLogo.png"
              alt="Shark Stewards"
            />
            <Heading m={1} fontSize={["large", "3xl", "3xl"]}>
              Shark Watch CA
            </Heading>
          </Flex>
        </Link>

        <Menu>
          <MenuButton variant="solid" m={3} as={Button} isActive={false}>
            {session == null ? "Menu" : session.user.email}
          </MenuButton>
          <MenuList>
            {session == null && <MenuItem onClick={onOpen}>Login</MenuItem>}
            {session == null && (
              <MenuItem onClick={onOpenSignUp}>Sign Up</MenuItem>
            )}
            {session != null && (
              <>
                <MenuItem>My Sightings</MenuItem>
                <MenuGroup>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={logout}>Sign Out</MenuItem>
                </MenuGroup>
              </>
            )}
          </MenuList>
        </Menu>
      </Flex>
      {isAuthModalOpen && <AuthModal onClose={onClose} />}
      {isSignUpModalOpen && <SignUpModal onCloseSignUp={onCloseSignUp} />}
    </>
  );
}
