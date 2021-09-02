import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "teal",
  }),
  {
    config: {
      initialColorMode: "light",
      useSystemColorMode: true,
    },
    colors: {
      brand: {
        primary: "#021316",
        primaryLight: "#021316e6",
      },
    },
    styles: {
      global: (props) => ({
        body: {
          color: mode("gray.800", "whiteAlpha.900")(props),
          bg: mode("white", "#021316")(props),
        },
      }),
    },
  }
);
