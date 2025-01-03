"use client";

import Image from "next/image";
import { useState } from "react";

import socials from "../../data/socials.json";
import history from "../../data/blogHistory.json";
import contacts from "../../data/contacts.json";

export default function About() {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      {/* WELCOME */}
      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden p-20">
        {/* image */}
        <div className="absolute h-full w-full">
          <Image
            src="/hokusai.jpg"
            alt="hokusai wave painting"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative flex max-w-[1200px] flex-col gap-5 rounded-2xl bg-main p-10 text-center opacity-90">
          <h1 className="w-full font-sawarabiMincho text-5xl">Me:Japan</h1>
          <span className="-mt-2 font-sawarabiMincho text-sm">
            Japan is a land where ancient traditions meet cutting-edge
            modernity.
          </span>
          <div className="h-1 w-full bg-black"></div>

          <p>
            I am here to document everything that makes Japan so fascinating.
            Whether you are a fellow enthusiast, a curious traveler, or someone
            with deep connections to Japan, you&apos;re in the right place!
            Let&apos;s explore the wonders of this beautiful country together.
            Japan is a land of contrasts, where ancient temples stand alongside
            modern skyscrapers, and traditional tea ceremonies coexist with
            cutting-edge technology. It is a place where you can experience the
            serenity of a Zen garden and the excitement of a bustling metropolis
            all in one day.
            <span
              className={`cursor-pointer text-blue-500 ${
                readMore ? "opacity-0 duration-300" : "mt-1"
              }`}
              onClick={() => setReadMore(!readMore)}
            >
              Read More
            </span>
          </p>
          <p
            className={`${
              readMore
                ? "max-h-screen opacity-100 duration-500"
                : "max-h-0 opacity-0 duration-300"
            }`}
          >
            In this blog, I aim to capture the essence of Japan through my
            personal experiences, stories, and insights. I will take you on a
            journey through the picturesque landscapes, introduce you to the
            unique customs and traditions, and provide tips and recommendations
            for anyone planning to visit or learn more about Japan. Whether it
            is the mouth-watering cuisine, the intricate art forms, or the
            heartwarming hospitality of the people, there is always something
            new and exciting to discover.
          </p>
        </div>
      </section>

      {/* HISTORY */}
      <section className="flex flex-col gap-2 bg-main p-20">
        <h1 className="mb-3 bg-secondary p-3 text-main">
          Lets read a little history about this Blog!!
        </h1>

        <div className="flex flex-col gap-5">
          {history.map((items, index) => (
            <div key={index}>
              <p className="font-semibold">{items.parOne}</p>
              <p>{items.parTwo}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* PURPOSE */}
      <section className="bg-main px-20 pb-20">
        <h1 className="mb-3 bg-secondary p-3 text-main">Of Purpose and Mission</h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-5 items-center mt-5">
            <h2>Purpose</h2>
            <p className="text-center px-10">
              Our purpose is to provide a platform for people to learn more
              about Japan, its culture, and its people. We aim to create a
              community where enthusiasts, travelers, and Japanophiles can
              connect, share their experiences, and gain insights into the
              beauty and uniqueness of Japan.
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center mt-5">
            <h2>Mission</h2>
            <p className="text-center px-10">
              Our mission is to inspire and educate people about Japan through
              engaging and informative content. We strive to showcase the
              diversity and richness of Japanese culture, history, and
              traditions, and to foster a deeper appreciation and understanding
              of this fascinating country.
            </p>
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="relative flex min-h-screen items-center justify-center">
        <div className="absolute h-full w-full">
          <Image
            src="/hokusai fuji.webp"
            alt="hokusai fuji painting"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative m-20 flex max-w-[1200px] gap-5 rounded-2xl bg-main p-10 opacity-90">
          <div className="flex flex-col gap-5">
            <span className="text-lg text-secondary">
              Hover my face! there are some socials you can visit:
            </span>
            {/* myself image and socials container */}
            <div className="group relative">
              <div className="mr-10 transition-all duration-300 group-hover:blur-xl">
                <Image
                  src={"/myself.jpg"}
                  width={200}
                  height={200}
                  style={{ minWidth: "200px", minHeight: "150px" }}
                  alt="me: dharmasena akamal aji"
                />
              </div>
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                {socials.map((item, index) => (
                  <a
                    href={item.url}
                    key={item.id || index}
                    className="flex w-32 items-center justify-center gap-2 p-2 transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: "white",
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    <div className="h-5 w-5 overflow-hidden">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-inherit">{item.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1>こんにちは！ これは私のこと！</h1>
            <h2>Hello! Get to know me!</h2>
            <p>
              My name is Dharmasena, nice to meet you !!. I&apos;m passionate
              about all things Japan! For over five years, I&apos;ve been
              immersed in the beauty of the Japanese language and culture. My
              journey started with a fascination for Japan&apos;s unique blend
              of tradition and modernity, and it has since grown into a deep
              connection that I love sharing with others.
            </p>
            <div>
              <h2>Reach out to me!!</h2>
              <div className="mt-3 flex flex-col gap-2">
                {contacts.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-6 w-6 overflow-hidden">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={20}
                        height={20}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p>{item.reachOut}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}