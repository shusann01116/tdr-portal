import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/blocks/page-header";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disney App",
  description: "Dashboard app makes your disney life easier.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <PageHeader />
        <main className="mx-auto flex max-w-screen-lg flex-col items-center justify-center py-4">
          {children}
        </main>
      </body>
    </html>
  );
}
