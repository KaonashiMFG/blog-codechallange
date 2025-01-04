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
      {/* Sidebar */}
      <div className="w-1/4 bg-secondary p-5 min-h-[calc(100vh-80px)]">
        <div className="bg-main p-5 rounded-3xl">
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

      {/* Posts List */}
      <section className="w-3/4 px-20 py-5 bg-main">
        <h1 className="flex justify-center bg-secondary p-5 text-center text-main">
          Posts
        </h1>
        <div className="flex flex-col gap-5 py-5">
          {filteredPosts?.map((item) => (
            <article key={String(item.slug)} className="flex h-32 gap-5">
              <div className="relative min-w-96 overflow-hidden">
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
              <div className="flex flex-col justify-center">
                <h2>
                  {typeof item.title === "string" ? item.title : "Untitled"}
                </h2>
                <p>
                  {typeof item.author === "string" ? item.author : "Untitled"}
                </p>
                <Link href={`/post/${item.slug}`}>
                  <p className="mt-5 text-sm text-secondary">
                    Further Reading {">"}
                  </p>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
