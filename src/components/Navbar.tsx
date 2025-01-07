"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import navItems from "../data/navItems.json";
import { getAllBlog } from "@/utils/contentful-data";

interface Post {
  title: string;
  slug: string;
  thumbnail?: string;
  author: string;
}

export default function Navbar() {
  // Add mounting state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchRef = useRef(null);

  // Handle mounting state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllBlog();
        setPosts(allPosts || []); // Ensure posts is always an array
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set empty array on error
      }
    }

    if (isMounted) {
      fetchPosts();
    }
  }, [isMounted]);

  useEffect(() => {
    if (searchQuery && isMounted) {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredPosts([]);
    }
  }, [searchQuery, posts, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

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
  }, [isMounted]);

  // Prevent rendering until client-side hydration is complete
  if (!isMounted) {
    return (
      <nav className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between bg-main p-4 md:p-7">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-10 md:h-14 md:w-14">
            <Image
              src="/nav/mountain.svg"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <span className="-ml-2 -mt-2 font-raleway text-sm text-secondary md:text-base">
            Me:JP
          </span>
        </Link>
      </nav>
    );
  }

  return (
    <>
      {/* Rest of your existing JSX code stays the same */}
      <nav className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between bg-main p-4 md:p-7">
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
          <span className="-ml-2 -mt-2 font-raleway text-sm text-secondary md:text-base">
            Me:JP
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">
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
          className="p-2 md:hidden"
        >
          <div className="space-y-2">
            <span
              className={`block h-0.5 w-8 bg-secondary transition-transform duration-300 ${
                isSidebarOpen ? "translate-y-2.5 rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-8 bg-secondary transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-8 bg-secondary transition-transform duration-300 ${
                isSidebarOpen ? "-translate-y-2.5 -rotate-45" : ""
              }`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Only render these components after mounting */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-[#F6F1E9] transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar content remains the same */}
        <div className="p-5">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-4 top-4 text-xl text-secondary"
          >
            ✕
          </button>

          <div
            ref={searchRef}
            className="relative mt-10 flex flex-col"
            onFocus={() => setIsSearchActive(true)}
          >
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mt-8 flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.herf}
                className="flex items-center text-secondary"
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="mr-3 h-6 w-6">
                  <Image
                    src={item.logo}
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isSearchActive && filteredPosts.length > 0 && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}`}>
              <div className="flex items-center px-4 py-2 hover:bg-gray-100">
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
                <div>
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-gray-500">by: {post.author}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="h-20"></div>
    </>
  );
}
