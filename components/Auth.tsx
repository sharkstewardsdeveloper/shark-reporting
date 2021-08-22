import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LoginResponse } from "../pages/api/login";
import { useSessionUser } from "../session/useSessionUser";

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login: updateLocalSession } = useSessionUser();
  const [errorMessage, setErrorMessage] = useState<string>();

  function handleShowPassword() {
    setShowPassword((value) => !value);
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, access_token, refresh_token, user }: LoginResponse =
        await fetch("/api/login", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then((res) => res.json());
      if (error) {
        setErrorMessage(`Unable to log in: ${error}`);
      } else {
        updateLocalSession({
          accessToken: access_token,
          refreshToken: refresh_token,
          user: {
            email: user.email!,
          },
        });
        onClose();
      }
    } catch (error) {
      setErrorMessage(
        `Unable to log in: ${error.error_description || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login to Shark Reporter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="8">
            <FormControl id="login-email" isRequired>
              <FormLabel>Your Email</FormLabel>
              <Input
                type="email"
                placeholder="save.the.sharks@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="login-password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {errorMessage != null && (
              <Alert status="error">
                <AlertIcon />
                {errorMessage}
              </Alert>
            )}
            <Button
              isLoading={loading}
              onClick={() => handleLogin(email, password)}
            >
              Login
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
