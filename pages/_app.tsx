import { Authentication } from "../components/Authentication";
import {
  Button,
  Box,
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
        
      >
        <Flex 
          w={["60%", "40%", "40%"]} 
          align="center"
          justify="flex-start"
        >
          <Image
            m={1}
            boxSize="80px"
            objectFit="cover"
            src="/ssLogo.png"
            alt="shark stewards logo"
          />
          <Heading color="brand.white" m={1}>Shark Reporter</Heading>
        </Flex>
       
        <Menu >
          <MenuButton colorScheme="teal" variant="solid" m={3} as={Button} isActive={false}>
            {session == null ? "Menu" : session.user.email}
          </MenuButton>
          <MenuList colorScheme="teal">
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
    <Flex as="footer" backgroundColor="brand.primary">
      <Text m={3} color="brand.white">Where are the Sharks? by Shark Stewards</Text>
    </Flex>
  );
}
