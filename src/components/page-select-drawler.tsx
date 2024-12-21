"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export default function PageSelectDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="fixed right-0 bottom-0 z-50 m-4 h-12 w-12 rounded-full"
        >
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <VisuallyHidden.Root>Select Page</VisuallyHidden.Root>
          </DrawerTitle>
          <div className="mx-auto flex w-full max-w-screen-lg flex-col space-y-3 text-start">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/tdl" onClick={() => setOpen(false)}>
              Tokyo Disney Land
            </Link>
            <Link href="/tds" onClick={() => setOpen(false)}>
              Tokyo Disney Sea
            </Link>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
