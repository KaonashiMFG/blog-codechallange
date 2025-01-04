"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import navItems from "../data/navItems.json";
import { getAllBLOG } from "@/utils/contentful-data";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]); 
  const [isSearchActive, setIsSearchActive] = useState(false); 

  const searchRef = useRef(null);

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getAllBLOG();
      setPosts(allPosts);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredPosts([]); 
    }
  }, [searchQuery, posts]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !(searchRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Fixed Nav */}
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
          <span className="-ml-2 -mt-2 font-raleway text-sm md:text-base text-secondary">
            Me:JP
          </span>
        </Link>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className="relative flex items-center"
          onFocus={() => setIsSearchActive(true)}
        >
          <input
            type="text"
            placeholder="Search posts..."
            className="border border-secondary rounded-md px-4 py-2 text-sm focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Search Results Dropdown */}
          {isSearchActive && filteredPosts.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white border border-secondary rounded-md shadow-lg z-10">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/post/${post.slug}`}>
                  <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {/* Thumbnail Image */}
                    {post.thumbnail && (
                      <div className="mr-4">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </div>
                    )}
                    {/* Title and Author */}
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-500">by: {post.author}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

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
            <span
              className={`block w-8 h-0.5 bg-secondary transition-transform duration-300 ${
                isSidebarOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-secondary transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-secondary transition-transform duration-300 ${
                isSidebarOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
}
