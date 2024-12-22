import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import PageHeader from "@/components/page-header";
import PageSelectDrawer from "@/components/page-select-drawler";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "東京ディズニーリゾートポータル",
  description:
    "東京ディズニーリゾートの待ち時間を便利に簡単に確認できるポータルサイトです。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <PageHeader />
        <PageSelectDrawer />
        <main className="mx-auto flex max-w-screen-lg flex-col items-center justify-center py-4">
          {children}
        </main>
      </body>
    </html>
  );
}
