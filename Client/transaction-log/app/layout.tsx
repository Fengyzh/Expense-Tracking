import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./comp/Navbar";
import { TransactionProvider } from "./comp/TransactionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "A personal finance tracker assisted by LLM for data querying",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <TransactionProvider>
        <div className="flex h-full w-full">
          <Navbar/>
          {children}
        </div>
        </TransactionProvider>
        </body>
    </html>
  );
}
