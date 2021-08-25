import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
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
    VStack,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { signUpResponse } from "../pages/api/signUp";
  import { useSessionUser } from "../session/useSessionUser";
  
  interface SignUpModalProps {
    onCloseSignUp: () => void;
  }
  
  export function SignUpModal({ onCloseSignUp }: SignUpModalProps) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login: updateLocalSession } = useSessionUser();
    const [errorMessage, setErrorMessage] = useState<string>();

    function handleShowPassword() {
      setShowPassword((value) => !value);
    }
  
    const handleSignUp = async (email: string, password: string) => {
      try {
        setLoading(true);
        const { error, access_token, refresh_token, user }: signUpResponse =
          await fetch("/api/signUp", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }).then((res) => res.json());
        if (error) {
          setErrorMessage(`Unable to log in: ${error}`);
        } else {
          alert("Check email")
          onCloseSignUp();
        }
      } catch (error) {
        setErrorMessage(
          `Unable to sign up: ${error.error_description || error.message}`
        );
      } finally {
        setLoading(false);
      }
    };
    
    return (
      <Modal isOpen={true} onClose={onCloseSignUp}>
        <ModalOverlay />
        <ModalContent bgColor="brand.white" color="brand.primary">
          <ModalHeader>Sign up for Shark Reporter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="8">
              <FormControl id="signup-email" isRequired>
                <FormLabel>Your Email</FormLabel>
                <Input
                  type="email"
                  placeholder="save.the.sharks@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="signup-password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button colorScheme="teal" 
                      variant="solid" 
                      h="1.75rem" 
                      size="sm" 
                      onClick={handleShowPassword}>
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
                onClick={() => handleSignUp(email, password)}
                colorScheme="teal" 
                variant="solid"
              >
                Login
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

