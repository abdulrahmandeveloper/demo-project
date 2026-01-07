import React from "react";
import { NavbarLinks } from "../interfaces/navigation.interface";
import { NavbarListLinks } from "../utils/navbar-links-selection";

export const discoverLinks = [
  { value: "/discover/people", content: "People" },
  { value: "/discover/companies", content: "Companies" },
  { value: "/discover/cinemas", content: "Cinemas" },
  { value: "/discover/watch-providers", content: "Watch Providers" },
];

export const navbarLinks: NavbarLinks[] = [
  { name: "Series", path: "/series" },
  { name: "Movies", path: "/movies" },
  { name: "Search", path: "/search" },
  { name: "News ", path: "/news" },
  { name: "Journal", path: "/journal" },

  {
    element: React.createElement(NavbarListLinks, {
      placeHolder: "Discover",
      label: "Pages",
      items: discoverLinks,
    }),
    path: "/discover",
  },
];
