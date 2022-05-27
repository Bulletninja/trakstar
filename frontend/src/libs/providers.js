import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./auth";
export function AppProviders({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
