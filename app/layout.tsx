import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

// Importing the Header component
import Header from "./components/Header";

const jostSans = Jost({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Metadata for the application
export const metadata: Metadata = {
  title: "Property Web App",
  description: "A web application for property listings and management.",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Type for children prop
}) {
  return (
    <html lang="en">
      <body className={`${jostSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
