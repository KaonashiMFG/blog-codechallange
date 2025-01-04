"use client";

import { getAllBLOG } from "@/utils/contentful-data";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Post() {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle state for sidebar

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getAllBLOG();

      if (allPosts) {
        setPosts(allPosts);
        setFilteredPosts(allPosts);

        const uniqueCategories = [
          ...new Set(allPosts.flatMap((post: any) => post.categories || [])),
        ];
        setCategories(uniqueCategories);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setFilteredPosts(
        posts.filter((post) =>
          post.categories.some((category: string) =>
            selectedCategories.includes(category),
          ),
        ),
      );
    } else {
      setFilteredPosts(posts); // Show all posts if no category is selected
    }
  }, [selectedCategories, posts]);

  // Handle category checkbox toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((cat) => cat !== category) // Remove category
          : [...prevSelected, category], // Add category
    );
  };

  return (
    <div className="flex">
      {/* Sidebar (Desktop Only) */}
      <div className="hidden min-h-[calc(100vh-80px)] bg-secondary p-5 md:block md:w-1/4">
        <div className="rounded-3xl bg-main p-5">
          <h2 className="mb-3 font-raleway text-lg font-bold text-secondary">
            Categories:
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={category}
                    onChange={() => toggleCategory(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  <span>{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Posts Section */}
      <section className="w-full bg-main px-5 py-5 md:w-3/4 md:px-20">
        {/* Toggle Button and Sliding Categories (Only for Small Screens) */}
        <div className="block md:hidden">
          <button
            className="mb-3 w-full rounded-lg bg-secondary p-3 font-semibold text-main"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Close Categories" : "Open Categories"}
          </button>

          {/* Sliding Categories Bar */}
          <div
            className={`mb-5 overflow-hidden rounded-lg bg-secondary transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-[300px] p-4" : "max-h-0 p-0"
            }`}
          >
            <ul className="flex flex-col gap-2">
              {categories.map((category) => (
                <li key={category} className="text-main">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={category}
                      onChange={() => toggleCategory(category)}
                      checked={selectedCategories.includes(category)}
                    />
                    <span>{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h1 className="flex justify-center bg-secondary p-5 text-center text-lg text-main md:text-xl">
          Posts
        </h1>
        <div  className="flex flex-col gap-5 py-5">
          {filteredPosts?.map((item) => (
            <>
              <article
                key={String(item.slug)}
                className="flex flex-col gap-5 md:flex-row md:items-center md:gap-5"
              >
                {/* Image Section */}
                <div className="relative h-32 w-full md:w-1/2">
                  {typeof item.featuredImage === "string" ? (
                    <Image
                      src={item.featuredImage}
                      alt={String(item.title)}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <p>No valid image available</p>
                  )}
                </div>
                {/* Text Section */}
                <div className="ml-4 flex flex-col justify-center md:w-1/2">
                  <h2 className="text-base font-semibold md:text-lg">
                    {typeof item.title === "string" ? item.title : "Untitled"}
                  </h2>
                  <p className="text-sm text-gray-600 md:text-base">
                    {typeof item.author === "string" ? item.author : "Untitled"}
                  </p>
                  <Link href={`/post/${item.slug}`}>
                    <p className="mt-3 text-sm text-secondary md:mt-5">
                      Further Reading {">"}
                    </p>
                  </Link>
                </div>
              </article>
              <div className="h-1 w-full bg-secondary"></div>
            </>
          ))}
        </div>
      </section>
    </div>
  );
}
