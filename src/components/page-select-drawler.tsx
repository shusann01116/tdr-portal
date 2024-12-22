"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Anchor, Castle, House } from "lucide-react";
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

  const linkMap = {
    "/": {
      title: "ホーム",
      icon: <House />,
    },
    "/tdl": {
      title: "東京ディズニーランド",
      icon: <Castle />,
    },
    "/tds": {
      title: "東京ディズニーシー",
      icon: <Anchor />,
    },
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="fixed right-0 bottom-0 z-50 m-4 h-12 w-12 rounded-full drop-shadow-lg"
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
            {Object.entries(linkMap).map(([path, { title, icon }]) => (
              <Link
                key={path}
                href={path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                {icon}
                <span className="hover:underline">{title}</span>
              </Link>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
