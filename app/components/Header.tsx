"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
}

const headerMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Properties", url: "/properties" },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobMenu, setIsMobmenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect screen resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`bg-white sticky top-0 z-50 border-b border-gray-100 ${
        scrolled ? "shadow-md" : ""
      } ${
        pathname === "/"
          ? "!fixed left-0 right-0 !bg-transparent !border-0"
          : ""
      }`}
    >
      <div className="container flex justify-between">
        <Link href="/" className="py-4 lg:py-6 relative z-20">
          <Image src="/images/logo.svg" width={100} height={60} alt="Logo" />
        </Link>
        <ul
          className={`flex gap-4 items-center ${
            isMobile
              ? "fixed flex-col justify-center top-0 bottom-0 -right-full w-full bg-white transition-all duration-500 z-10"
              : ""
          } ${isMobMenu ? "!right-0" : ""}`}
        >
          {headerMenu.map((menu, index) => (
            <li key={index}>
              <Link
                className={`text-base text-black font-semibold hover:text-cyan-600 transition-all duration-300 ${
                  pathname === menu.url ? "text-cyan-600" : ""
                }`}
                href={menu.url}
                onClick={() => setIsMobmenuOpen(false)}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4 items-center max-lg:ms-auto">
          <li>
            <Link href={"/"}>
              <Image src={"/images/search.svg"} width={22} height={22} alt="" />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image src={"/images/heart.svg"} width={22} height={22} alt="" />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image
                src={"/images/shopping.svg"}
                width={22}
                height={22}
                alt=""
              />
            </Link>
          </li>
        </ul>
        {isMobile && (
          <button
            onClick={() => setIsMobmenuOpen(!isMobMenu)}
            type="button"
            className="w-5 h-4 relative flex flex-col ml-4 my-auto justify-between z-20"
          >
            <span className="w-full block h-0.5 bg-black"></span>
            <span className="w-full block h-0.5 bg-black"></span>
            <span className="w-full block h-0.5 bg-black"></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
