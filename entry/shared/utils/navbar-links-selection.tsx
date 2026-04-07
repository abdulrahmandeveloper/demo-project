"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../components/ui/button";
type NavbarListLinksProps = {
  placeHolder: string;
  label: string;
  items: { value: string; content: string }[];
};
export const NavbarListLinks = ({
  placeHolder,
  label,
  items,
}: NavbarListLinksProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handlePageLinks = (value: string) => {
    router.push(value);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="bg-transparent border-none text-white opacity-50 cursor-pointer shadow-none font-bold "
      >
        {/**
         * TODO
         * removing the Link elem which causes hydration to normal Button elem
         */}
        <Button
          onClick={() => router.push("/discover")}
          className="cursor-pointer"
        >
          {placeHolder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {label && (
          <>
            <DropdownMenuLabel className="text-sm opacity-50 ">
              {label}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {items.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handlePageLinks(item.value)}
            className="cursor-pointer"
          >
            {item.content}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
