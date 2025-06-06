"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import DropDownMenu from "./DropDownMenu";

function Layout({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="mt-20">{children}</div>
      <DropDownMenu isOpen={isOpen} />
    </div>
  );
}

export default Layout;
