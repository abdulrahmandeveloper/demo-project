import { ReactNode } from "react";

export type NavbarLinks =
  | {
      name: string;
      path: string;
    }
  | { element: ReactNode; path: string };

export interface FooterLinks {
  name: string;
  path: string;
}
