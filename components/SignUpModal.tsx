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
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

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
  const router = useRouter();

  function handleShowPassword() {
    setShowPassword((value) => !value);
  }

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { error, session } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(`Unable to log in: ${error}`);
      } else {
        updateLocalSession(session);
        onCloseSignUp();
        router.push("/confirmSignUp");
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
      <ModalContent>
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
                  <Button
                    variant="solid"
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowPassword}
                  >
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
              variant="solid"
            >
              Sign up
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
