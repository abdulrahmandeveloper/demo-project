import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { discoverLinks } from "../constants/navbar-links.constants";

export const NavbarListLinks = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Discover`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {discoverLinks.map((link, key) => (
            <div key={key}>
              <Link href={`${link.path}`}>
                <SelectItem value={link.path}>{link.name}</SelectItem>
              </Link>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
