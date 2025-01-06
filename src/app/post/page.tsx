"use client";

import { getAllBlog, getAllCategories } from "@/utils/contentful-data";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  title: string;
  featuredImage: string;
  author: string;
  slug: string;
  categories: string[];
}

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // FOR POST TO APPEAR
  useEffect(() => {
    async function fetchPosts() {
      const allPosts = (await getAllBlog()) as unknown as Post[];

      if (allPosts) {
        setPosts(allPosts);
      }
    }

    fetchPosts();
  }, []);

  // FOR CATEGORIES TO APPEAR
  useEffect(() => {
    async function getCategories() {
      const categories = await getAllCategories();

      if (categories) {
        const categoryNames = categories.map(
          (category) => category.title,
        ) as string[];
        setCategories(categoryNames);
      }
    }

    getCategories();
  }, []);

  // FILTERING
  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      const filteredCategories = selectedCategories.filter(
        (item) => item !== category,
      );
      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  }

  return (
    <div className="flex">
      {/* Sidebar (Desktop Only) */}
      <div className="hidden min-h-[calc(100vh-80px)] bg-secondary p-5 md:block md:w-1/4">
        <div className="rounded-3xl bg-main p-5">
          <h2 className="mb-3 font-raleway text-lg font-bold text-secondary">
            Categories:
          </h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index}>
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
              {categories.map((category, index) => (
                <li key={index} className="text-main">
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

        {/* The posts */}
        <div>
          <h1 className="flex justify-center bg-secondary p-5 text-center text-lg text-main md:text-3xl">
            Posts
          </h1>
          <div className="flex flex-col gap-5 py-5">
            {posts?.map((item, index) => (
              <div key={index} className="flex flex-col gap-5">
                <article className="flex flex-col gap-5 max-xl:justify-start max-xl:text-start md:flex-row">
                  {/* Image Section */}
                  <div className="relative h-32 w-full md:w-1/2">
                    <Image
                      src={item.featuredImage}
                      alt={String(item.title)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Text Section */}
                  <div className="ml-4 flex flex-col justify-center md:w-1/2">
                    <h2 className="text-base font-semibold md:text-lg">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 md:text-base">
                      {item.author}
                    </p>

                    <Link href={`/post/${item.slug}`}>
                      <p className="mt-3 text-sm text-secondary md:mt-5">
                        Further Reading {">"}
                      </p>
                    </Link>
                  </div>
                </article>
                <div className="h-1 w-full bg-secondary"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
