import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSessionUser } from "../session/useSessionUser";
import { AuthModal } from "./Auth";
import { SignUpModal } from "./SignUpModal";

export function AppHeader() {
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

        <HStack spacing={2}>
          <ThemeToggleButton />
          <Menu>
            <MenuButton variant="solid" m={3} as={Button}>
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
        </HStack>
      </Flex>
      {isAuthModalOpen && <AuthModal onClose={onClose} />}
      {isSignUpModalOpen && <SignUpModal onCloseSignUp={onCloseSignUp} />}
    </>
  );
}

function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === "light" ? MoonIcon : SunIcon;
  return (
    <IconButton
      aria-label="Toggle Theme"
      variant="ghost"
      onClick={toggleColorMode}
      icon={<Icon />}
    />
  );
}
