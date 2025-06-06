import Link from "next/link";
import React from "react";

function DropDownMenu({ isOpen }: any) {
  return (
    <div className={`fixed transition-all w-full duration-300 shadow-lg bg-blue-50 p-6 ${isOpen ? "top-20" : "-top-52"}`}>
      <ul className="text-xl font-semibold text-blue-900 flex flex-col gap-4 mb-4">
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/products"}>
          <li>Products</li>
        </Link>
        <Link href={"/about-us"}>
          <li>About Us</li>
        </Link>
      </ul>
      <div className="relative mb-4 flex gap-2">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
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
          className="block w-full py-2 px-4 ps-10 text-sm text-gray-900 border border-blue-300 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button className="px-8 py-2 bg-blue-900 font-semibold rounded-lg text-white">Search</button>
      </div>
      <Link href={"/contact-us"}>
        <button className="w-full py-2 bg-blue-900 font-semibold rounded-lg text-white">Contact Us</button>
      </Link>
    </div>
  );
}

export default DropDownMenu;
