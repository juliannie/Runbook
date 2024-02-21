import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import TodosContextProvider from "@/store/todos-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Runbook",
  description: "Tasklist for reocurring production tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodosContextProvider>
          <Navigation />
          {children}
        </TodosContextProvider>
      </body>
    </html>
  );
}
