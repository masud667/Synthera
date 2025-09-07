"use client";

import React from "react";
import Image from "next/image";
import logo from "../assets/synthera_logo.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  const navItems = (
    <>
      {/* <li><a>Home</a></li>
      <li><a>Shop</a></li>
      <li><a>Synthera AI</a></li> */}
      {/* <li>
        <a>Home</a>
      </li>
      <li>
        <a>Shop</a>
      </li> */}
      

      <li><Link href="/" >Home</Link></li>
      <li><Link href="/Shop">Products</Link></li>
      <li><Link href="/dashboard">Dashboard</Link></li>

      <li>
        <a>Synthera AI</a>
      </li>
    </>
  );

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <a>
              <Image src={logo} alt="Synthera_logo" className="w-44" />
            </a>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end">
            {session ? (
              <button
                onClick={() => signOut()}
                className="btn btn-primary rounded-lg shadow-none px-8"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary rounded-lg shadow-none px-8"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
