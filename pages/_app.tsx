import { Authentication } from "../components/Authentication";
import { AppFooter } from "../components/AppFooter";
import Head from "next/head";
import {
  Button,
  Link,
  ChakraProvider,
  Flex,
  Grid,
  Heading,
  Menu,
  Image,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  MenuGroup,
} from "@chakra-ui/react";
import "../styles/globals.css";
import "../styles/date-picker.css";
import { theme } from "../styles/theme";
import { useSessionUser } from "../session/useSessionUser";
import { AuthModal } from "../components/Auth";
import { SignUpModal } from "../components/SignUpModal";

export default function MyApp({ Component, pageProps }) {
  return (
    <Authentication>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Shark Reporting by Shark Stewards</title>
        </Head>
        <Grid templateRows="min-content 1fr auto" height="100vh">
          <AppHeader />
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
              Shark Reporter
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
                  <MenuItem onClick={logout}>Logout</MenuItem>
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
