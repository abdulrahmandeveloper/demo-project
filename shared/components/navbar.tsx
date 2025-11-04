"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

type NavbarProps = {
  logoPath: string;
  links: { name: string; path: string }[];
  search: boolean;
  className?: string;
};

// for blurness backdrop-blur-sm
const Navbar = ({ logoPath, links, search, className }: NavbarProps) => {
  console.log(links[0].name);

  return (
    <div
      className={`bg-transparent  h-16 flex  gap-28 items-center justify-center ${className}`}
    >
      <Image
        src={logoPath}
        alt="logo"
        className="rounded-3xl"
        width={50}
        height={50}
      />

      <div className="flex gap-5 items-center  w-[550]  justify-between">
        {links.map((link) => (
          <Link
            className="text-white opacity-50 hover:opacity-100 font-bold "
            key={link.name}
            href={link.path}
          >
            {link.name}
          </Link>
        ))}

        {search && (
          <div className="relative">
            <Input
              type="text"
              aria-label="Search"
              className=" w-25 focus-within:w-40 transition-all duration-300 ease-in-out shadow-sm border-none bg-white"
            />
            <Button
              size={"icon"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4 bg-transparent hover:cursor-pointer"
            >
              <Search aria-hidden="true" className="text-black" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
