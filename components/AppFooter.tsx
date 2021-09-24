import { ReactNode } from "react";
import {
  Box,
  Container,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

// Based On: hauptrolle/chakra-templates
// License: https://github.com/hauptrolle/chakra-templates/blob/main/LICENSE

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export function AppFooter() {
  return (
    <Box bg="brand.primary" color="white" as="footer">
      <Container as={Stack} maxW={"6xl"} paddingY={6}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          <Stack align={"flex-start"} as="section">
            <ListHeader>Shark Stewards</ListHeader>
            <Link href="https://sharkstewards.org/our-vision/">About Us</Link>
            <Link href="https://sharkstewards.org/category/blog/">Blog</Link>
            <Link href="https://sharkstewards.org/contact/">Contact</Link>
          </Stack>

          <Stack align={"flex-start"} as="section">
            <ListHeader>Get Involved</ListHeader>
            <Link href="https://sharkstewards.org/swa-donate">Donate</Link>
            <Link href="https://sharkstewards.org/volunteer/">Volunteer</Link>
          </Stack>

          <Stack align={"flex-start"} as="section">
            <ListHeader>Shark Watch CA</ListHeader>
            <Link
              href="https://github.com/sharkstewardsdeveloper/shark-reporting"
              rel="noopener"
              isExternal
            >
              Contribute/View Source
            </Link>
            <Link
              href="https://github.com/sharkstewardsdeveloper/shark-reporting/issues"
              rel="noopener"
              isExternal
            >
              Report an Issue
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"} borderColor="gray.700">
        <Container
          as={Stack}
          maxW={"6xl"}
          paddingY={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>
            © 2021 <strong>Shark Stewards</strong>
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Facebook"}
              href={"https://www.facebook.com/SharkStewards/"}
            >
              <Icon as={FaFacebook} />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/sharkstewards/"}
            >
              <Icon as={FaInstagram} />
            </SocialButton>
            <SocialButton
              label={"YouTube"}
              href={"https://www.youtube.com/c/Sharksaver/"}
            >
              <Icon as={FaYoutube} />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
