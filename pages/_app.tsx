import { Authentication } from "../components/Authentication";
import {
  Button,
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
} from "@chakra-ui/react";
import "../styles/globals.css";
import { theme } from "../styles/theme"
import { useSessionUser } from "../session/useSessionUser";
import { AuthModal } from "../components/Auth";

export default function MyApp({ Component, pageProps }) {
  return (
    <Authentication>
      <ChakraProvider theme={theme}>
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
  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        width="100%"
        backgroundColor={["brand.primary", "brand.primary", "brand.primary"]}
        color={["white", "white", "white"]}
      >
        <Image
          boxSize="100px"
          objectFit="cover"
          src="/ssLogo.png"
          alt="Segun Adebayo"
        />
        
        <Heading m={3}>Shark Finder</Heading>
        <Menu >
          <MenuButton bgColor="brand.secondary" m={3} as={Button} isActive={false}>
            {session == null ? "Menu" : session.user.email}
          </MenuButton>
          <MenuList bgColor="brand.secondary">
            {session == null && <MenuItem onClick={onOpen}>Login</MenuItem>}
            {session != null && <MenuItem onClick={logout}>Logout</MenuItem>}
          </MenuList>
        </Menu>
      </Flex>
      {isAuthModalOpen && <AuthModal onClose={onClose} />}
    </>
  );
}

function AppFooter() {
  return (
    <Flex as="footer" backgroundColor="cyan.900">
      <Text color="white">Where are the Sharks? by Shark Stewards</Text>
    </Flex>
  );
}
