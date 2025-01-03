"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import navItems from "../data/navItems.json";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Fixed Nav with higher z-index */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-main p-4 md:p-7">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="h-10 w-10 md:h-14 md:w-14">
            <Image
              src="/nav/mountain.svg"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <span className="-ml-2 -mt-2 font-raleway text-sm md:text-base text-secondary">Me:JP</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="group mx-5 flex cursor-pointer flex-col items-center"
            >
              <div className="h-7 w-7">
                <Link href={item.herf}>
                  <Image
                    src={item.logo}
                    alt={item.label}
                    width={100}
                    height={100}
                    className="h-12 w-12 transition-transform duration-300 group-hover:-translate-y-2"
                  />
                </Link>
              </div>
              <span className="mt-2 translate-y-2 text-sm text-secondary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2"
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-secondary transition-transform duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-secondary transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-secondary transition-transform duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20"></div>

      {/* Sidebar with higher z-index than overlay */}
      <div 
        className={`fixed top-0 right-0 h-full w-32 bg-main transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center gap-6">
            {navItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <Link 
                  href={item.herf}
                  className="flex flex-col items-center"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div className="h-12 w-12 mb-2">
                    <Image
                      src={item.logo}
                      alt={item.label}
                      width={100}
                      height={100}
                      className="transition-transform duration-300 hover:-translate-y-2"
                    />
                  </div>
                  <span className="text-sm text-secondary">{item.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay with lower z-index than navbar and sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden z-40 mt-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}