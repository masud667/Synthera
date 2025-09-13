"use client";

import ThemeToggle from "../components/ThemeToggle";
import React, { useState } from "react";
import Image from "next/image";
import logo from "/public/synthera_logo.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/Products" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Synthera AI", href: "#" },
    
  ];
    if (session) {
    navItems.push({ name: "Become Seller", href: "/become-seller" });
  }

  const isActive = (href) => pathname === href;

  return (
    <div className="bg-base-50 text-base-content sticky top-0 z-50 backdrop-blur-md shadow-md">
      <div className="w-11/12 mx-auto">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <Link href="/">
              <Image src={logo} alt="Synthera Logo" className="w-28 lg:w-44" />
            </Link>
          </div>

          {/* Navbar Center for large screens */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-3 font-bold">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg transition ${
                      isActive(item.href)
                        ? "bg-primary text-white"
                        : "hover:bg-primary/20 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end flex items-center gap-2">
            <ThemeToggle />

            {session ? (
              <button
                onClick={() => signOut()}
                className="btn btn-primary rounded-lg shadow-none px-3 py-0 text-[11px] lg:text-sm lg:px-8 lg:py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary rounded-lg shadow-none px-3 py-0 text-[11px] lg:text-sm lg:px-8 lg:py-2"
              >
                Log In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-2">
            <ul className="menu flex flex-col gap-2 font-bold">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg transition ${
                      isActive(item.href)
                        ? "bg-primary text-white"
                        : "hover:bg-primary/20 hover:text-primary"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
