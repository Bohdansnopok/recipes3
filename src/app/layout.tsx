import type { Metadata } from "next";
import { Geist, Geist_Mono, Andada_Pro } from "next/font/google";
import { QueryProvider } from "@/provider/QueryProvider";
import ClientToast from "@/components/ClientToast";
import CheckAuth from "@/components/CheckAuth";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const geistAndadaPro = Andada_Pro({
  variable: "--font-geist-andada-pro",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistAndadaPro.variable} antialiased`}
      >
        <QueryProvider>
          <ClientToast />
          <CheckAuth>
            <Header />
            {children}
          </CheckAuth>
        </QueryProvider>
      </body>
    </html>
  );
}
