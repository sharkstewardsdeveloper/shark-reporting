import { ReactNode } from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

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
    <Box
      bg="brand.primary"
      color="white"
      as="footer"
      borderTop="brand.secondary"
      borderTopWidth={2}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
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
            <ListHeader>Reporting App</ListHeader>
            <Link
              href="https://github.com/sharkstewardsdeveloper/shark-reporting"
              isExternal
            >
              Contribute/View Source
            </Link>
            <Link href={"#"}>Privacy Policy</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2021 Shark Stewards. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            {/* <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton> */}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
