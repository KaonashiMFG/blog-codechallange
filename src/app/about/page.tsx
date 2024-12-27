"use client"

import Image from "next/image";
import socials from "../../data/socials.json";

export default function About() {
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
          <h1 className="w-full font-sawarabiMincho text-5xl">
            WELCOME to Me:Japan
          </h1>
          <span className="-mt-2 font-sawarabiMincho text-sm">
            Japan is a land where ancient traditions meet cutting-edge
            modernity.
          </span>
          <div className="h-1 w-full bg-black"></div>
          <p className="font-kanit">
            Welcome to my corner of the internet, where I share my passion for
            Japan. From its rich cultural heritage to the latest trends, I am
            here to document everything that makes Japan so fascinating. Whether
            you are a fellow enthusiast, a curious traveler, or someone with
            deep connections to Japan, you&apos;re in the right place!
            Let&apos;s explore the wonders of this beautiful country together.
          </p>
        </div>
      </section>

      {/* HISTORY */}
      <section className="bg-main p-20 flex flex-col gap-2">
        <h1 className="font-sawarabiMincho mb-3 bg-secondary p-2">Lets read a little history about this Blog!!</h1>
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-semibold font-kanit">An idea in 2021,</p> 
            <p className="font-kanit">
              i fancied japanese culture since when i was in highschool. From then on i started to learn about japanese seriously and fortunately got into collage in japanese study.
            </p>
          </div>

          <div>
            <p className="font-semibold font-kanit">Furthermore in 2022,</p> 
            <p className="font-kanit">
              At that time, I was in the 3rd semester of my studies, and I gained a lot of knowledge about Japan. My interest in Japanese culture deepened as I explored various aspects of its history, language, and traditions.
            </p>
          </div>

          <div>
            <p className="font-semibold font-kanit">Start in 2024,</p> 
            <p className="font-kanit">
              in this year i took a class for web development and i got an idea to make a blog about japan. I started to learn about web development and finally i made this blog.
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
            <span className="font-kanit">
              Hover my face!
              there are some socials you can visit
            </span>
            {/* myself image and socials container */}
            <div className="relative group">
              <div className="mr-10 transition-all duration-300 group-hover:blur-xl">
                <Image
                  src={"/myself.jpg"}
                  width={200}
                  height={200}
                  style={{ minWidth: "200px", minHeight: "150px" }}
                  alt="me: dharmasena akamal aji"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                {socials.map((item, index) => (
                  <a 
                    href={item.url} 
                    key={item.id || index} 
                    className="flex gap-2 items-center justify-center p-2 w-32 hover:scale-110 transition-all duration-300"
                    style={{
                      backgroundColor: 'white',
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    <div className="h-5 w-5 overflow-hidden">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-inherit">{item.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-sawarabiMincho">
              こんにちは！ これは私のこと！
            </h1>
            <h2 className="font-sawarabiMincho">Hello! Get to know me!</h2>
            <p className="font-kanit">
              My name is Dharmasena, nice to meet you !!. I&apos;m passionate
              about all things Japan! For over five years, I&apos;ve been immersed in
              the beauty of the Japanese language and culture. My journey
              started with a fascination for Japan&apos;s unique blend of
              tradition and modernity, and it has since grown into a deep
              connection that I love sharing with others.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}