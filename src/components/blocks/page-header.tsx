import { cn } from "@/lib/utils";
import { Poiret_One } from "next/font/google";
import Link from "next/link";

const poiret = Poiret_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poiret",
});

export default function PageHeader() {
  return (
    <header className="flex justify-center bg-background/50 px-4 py-2 backdrop-blur-lg">
      <span className="w-full max-w-screen-lg">
        <Link
          href="/"
          className={cn(
            poiret.className,
            "bg-primary p-2 text-4xl font-bold text-primary-foreground",
          )}
        >
          Disney Portal
        </Link>
      </span>
    </header>
  );
}
