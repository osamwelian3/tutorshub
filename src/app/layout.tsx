import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";
import ClientComponent from "@/components/client-component";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: 'swap'
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: 'swap'
// });

export const metadata: Metadata = {
  title: "MyTusyen",
  description: "Your go to place for the best tutoring services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ClientComponent />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
