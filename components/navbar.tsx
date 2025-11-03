"use client";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  logoPath: string;
  links: { name: string; path: string }[];
  search: boolean;
};
const Navbar = ({ logoPath, links, search }: NavbarProps) => {
  console.log(links[0].name);

  return (
    <div className="bg-neutral-700 h-10 flex flex-row gap-28 items-center justify-center ">
      <Image
        src={logoPath}
        alt="logo"
        className="w-1 h-1"
        width={500}
        height={500}
      />
      <div className="flex gap-5 items-center justify-center">
        {links.map((link) => (
          <Link className="text-white" key={link.name} href={link.path}>
            {link.name}
          </Link>
        ))}
      </div>
      <input />
      Search
    </div>
  );
};

export default Navbar;
