"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Extract current locale and pathname
  const currentLocale = pathname.split("/")[1]; // e.g. "en" or "mn"
  const oppositeLocale = currentLocale === "en" ? "mn" : "en";

  const switchLanguage = () => {
    const restOfPath = pathname.replace(/^\/(en|mn)/, ""); // remove current locale
    const newPath = `/${oppositeLocale}${restOfPath || "/"}`;
    router.push(newPath);
  };

  const localePrefix = `/${currentLocale}`;

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 bg-transparent">
      <div className="flex justify-between items-center">
        <div className="ml-2">
          <img
            src="/images/logo.png"
            alt="Ninj Center Logo"
            className="h-14 w-auto"
          />
        </div>

        <button
          className="lg:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden lg:flex items-center gap-10 text-white text-sm">
          <li>
            <Link href={`/`} className="text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link href={`/about`} className="text-lg">
              About Us
            </Link>
          </li>
          <li>
            <Link href={`/programs`} className="text-lg">
              Programs
            </Link>
          </li>
          <li>
            <Link href={`/contact`} className="text-lg">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href={`/register`} className="text-lg">
              Register Now
            </Link>
          </li>
          <li
            className="flex items-center gap-1 border px-2 py-1 rounded text-lg hover:bg-white hover:text-black transition cursor-pointer"
            onClick={switchLanguage}
          >
            <Globe size={14} />
            <span>EN | MN</span>
          </li>
        </ul>
      </div>

      {menuOpen && (
        <div className="mt-4 p-4 bg-black/70 rounded-lg lg:hidden">
          <ul className="flex flex-col items-start gap-4 text-white text-base">
            <li>
              <Link href={`/`} onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href={`/about`} onClick={toggleMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link href={`/programs`} onClick={toggleMenu}>
                Programs
              </Link>
            </li>
            <li>
              <Link href={`/contact`} onClick={toggleMenu}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link href={`/register`} onClick={toggleMenu}>
                Register Now
              </Link>
            </li>
            <li
              className="flex items-center gap-1 border px-2 py-1 rounded hover:bg-white hover:text-black transition cursor-pointer"
              onClick={() => {
                switchLanguage();
                toggleMenu();
              }}
            >
              <Globe size={14} />
              <span>{currentLocale.toUpperCase()}</span>
            </li>
          </ul>
        </div>
      )}

      <hr className="mt-4 border-white" />
    </nav>
  );
}
