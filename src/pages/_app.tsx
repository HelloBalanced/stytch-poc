import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StytchProvider, loadAndInitStytch } from "@stytch/stytch-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const stytch = loadAndInitStytch(
  `${process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN}`
);

const SPTheme = extendTheme({
  colors: {
    brand: {
      500: "#6b4ff7",
    },
    secondary: {
      500: "#001a3b",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StytchProvider stytch={stytch}>
      <ChakraProvider theme={SPTheme}>
        <Component />
      </ChakraProvider>
    </StytchProvider>
  );
}

export default MyApp;
