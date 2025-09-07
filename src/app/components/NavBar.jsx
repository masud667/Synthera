"use client";

import ThemeToggle from "../components/ThemeToggle";
import React from "react";
import Image from "next/image";
import logo from "../assets/synthera_logo.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
const NavBar = () => {
  const { data: session ,status} = useSession();
  console.log(status);

  const navItems = (
    <>
      <li><Link className='bg-base-200' href="/" >Home</Link></li>
      <li><Link className='bg-base-200' href="/Shop">Products</Link></li>
      <li><Link className='bg-base-200' href="/dashboard">Dashboard</Link></li>
       <li><Link className='bg-base-200' href="/" >Synthera AI</Link></li>
    </>
  );

  return (
    <div className="bg-base-50 text-base-content sticky top-0 z-50 backdrop-blur-md shadow-md">
      <div className="w-11/12 mx-auto">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <a>
              <Image src={logo} alt="Synthera_logo" className="w-44" />
            </a>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-3 font-bold">{navItems}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end ">
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
                className="btn btn-primary rounded-lg shadow-none px-8 font-inter"
              >
                Log In
              </Link>
            )}
          </div>
  <ThemeToggle />
        </div>
      
      </div>
    </div>
  );
};

export default NavBar;
