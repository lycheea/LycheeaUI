'use client';

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
      <div>
        <div className="navbar sticky top-0 z-50 bg-base-100 drop-shadow-lg w-full">
          <div className="navbar-start mr-auto">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/" className="text-base text-base-content font-semibold">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-base-content text-lg">Lycheea</a>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/problems" className="text-base text-base-content font-semibold">
                  Problems
                </Link>
              </li>
              <li>
                <Link href="/contests" className="text-base text-base-content font-semibold">
                  Contests
                </Link>
              </li>
              <li>
                <Link href="/groups" className="text-base text-base-content font-semibold">
                  Groups
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }