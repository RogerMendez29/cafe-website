import React from "react";
import Logo from "./Images/logo_files/logo.png";
import Avatar from "./Images/General/avatar.png";

import { MdShoppingCart, MdLogout, MdAdd } from "react-icons/md";

export const Header = () => {
  return (
    <header className=" fixed z-50 w-screen  ">
      {/* desktop & tablets */}
      <div className=" hidden md:flex w-full h-full items-center justify-between  p-4">
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            className=" object-cover rounded-full w-16 h-16"
            alt="logo"
          />
          <p className=" text-xl font-bold p-2"> Cafe Masaryktown</p>
        </div>
        <div className=" flex items-center gap-8">
          <ul className="flex items-center gap-8 ">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </ul>
          <div className="relative flex items-center justify-center ">
            <MdShoppingCart className="text-textColor text-2xl  cursor-pointer" />
            <div className="absolute -top-5 -right-3 w-6 h-6 rounded-full bg-cartBg flex items-center justify-center ">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <img src={Avatar} className="w-10 min-w-[40px] min-h-[40px] drop-shadow-x1" alt="avatar" />
        </div>
      </div>
      {/* mobile */}
      <div className=" flex md:hidden w-full h-full p-4"></div>
    </header>
  );
};
