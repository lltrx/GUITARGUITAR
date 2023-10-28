import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navBar";
import ChakraProviders from "@/components/chakra-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "guitarguitar",
  description: "guitarguitar hackathon project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
