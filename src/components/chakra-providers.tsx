// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, type ThemeConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

export default function ChakraProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: ThemeConfig = extendTheme({
    config: {
      initialColorMode: "dark",
      useSystemColorMode: true,
    },
  });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
