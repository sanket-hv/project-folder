"use client";
import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

function Navbar({ isOpen, setIsOpen }: any) {
  const pathName = usePathname();
  return (
    <nav className="w-full fixed h-20 bg-white flex items-center top-0 shadow-lg z-20">
      <Container>
        <div className="flex-row-reverse md:flex-row flex justify-between items-center px-4">
          <IoSearchOutline className="text-3xl block md:hidden" onClick={() => setIsOpen(!isOpen)} />

          <div className="flex items-center gap-0 md:gap-5 text-lg font-semibold">
            <Link href={"/"}>
              <Image
                src="https://w7.pngwing.com/pngs/806/294/png-transparent-facebook-logo-logo-facebook-icon-facebook-logo-brand-social-network-scalable-vector-graphics-thumbnail.png"
                alt="Logo"
                height={100}
                width={50}
              />
            </Link>

            <Link href={"/"} className={`flex items-center ${pathName === "/" ? "border-b-2 border-blue-900" : ""} h-14`}>
              <span className={`hover:text-blue-900 cursor-pointer hidden md:block ${pathName === "/" ? "text-blue-900" : ""}`}>Home</span>
            </Link>
            <Link href={"/products"} className={`flex items-center ${pathName === "/products" ? "border-b-2 border-blue-900" : ""} h-14`}>
              <span className={`hover:text-blue-900 cursor-pointer hidden md:block ${pathName === "/products" ? "text-blue-900" : ""}`}>
                Products
              </span>
            </Link>
            <Link href={"/about-us"} className={`flex items-center ${pathName === "/about-us" ? "border-b-2 border-blue-900" : ""} h-14`}>
              <span className={`hover:text-blue-900 cursor-pointer hidden md:block ${pathName === "/about-us" ? "text-blue-900" : ""}`}>
                About Us
              </span>
            </Link>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-blue-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full py-2 px-4 ps-10 text-sm text-blue-950 border-b-2 border-blue-900  focus:ring-blue-950 focus:border-blue-950 focus:outline-none"
              placeholder="Search Categories, Products..."
              required
            />
          </div>

          <span className="block md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoMdClose className="text-2xl" /> : <RiMenu2Fill className="text-2xl" />}
          </span>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
