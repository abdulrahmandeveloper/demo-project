import Link from "next/link";
import { Github, Twitter, Instagram, Mail } from "lucide-react";

import { footerLinks } from "@/shared/constants/footer-links.constants";
import { FooterLinks } from "@/shared/interfaces/navigation.interface";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-gray-400">
      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-yellow-400">
              my demo-project
            </h2>
            <p className="text-sm leading-relaxed">
              Discover movies, series, cast, reviews and cinematic experiences
              from all over the world.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link: FooterLinks, key) => (
                <div key={key}>
                  <Link href={`${link.path}`} className="hover:text-yellow-400">
                    {link.name}
                  </Link>
                </div>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-yellow-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-yellow-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-yellow-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-center flex-col">
            <h3 className="text-white items-center justify-center font-semibold mb-3">
              Connect
            </h3>
            <div className="flex gap-4">
              <a href="/github" className="hover:text-yellow-400">
                <Github size={20} />
              </a>
              <a href="/x" className="hover:text-yellow-400">
                <Twitter size={20} />
              </a>
              <a href="/insta" className="hover:text-yellow-400">
                <Instagram size={20} />
              </a>
              <a href="/google" className="hover:text-yellow-400">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>© {new Date().getFullYear()} CineVerse. All rights reserved.</p>

          <p className="text-zinc-500">Powered by TMDB (not affiliated)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
