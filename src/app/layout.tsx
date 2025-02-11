import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import "./globals.css";
import { SupabaseProvider } from '@/components/providers/supabase-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "APPO",
  description: "Advancing possibilities in prosthetics and orthotics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseProvider>
            {children}
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
