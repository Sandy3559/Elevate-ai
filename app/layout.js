import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "ElevateAI - AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
           <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
            {/*header*/}
            <Header/>
            <main className="min-h-screen">
            {children}
            </main>
            <Toaster richColors/>
            {/*footer*/}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with ❤️ by Satyam Raj</p>
              </div>
            </footer>
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
