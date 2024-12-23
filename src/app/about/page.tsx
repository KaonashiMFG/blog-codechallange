import Image from "next/image";

export default function About() {
  return (
    <>
      {/* image */}
      <div className="absolute h-52 w-52">
        <Image
          src="/hokusai.jpg"
          alt="hokusai wave painting"
          width={1500}
          height={1200}
          className="object-cover"
        />
      </div>

      {/* WELCOME */}
      <section className="">
        <div className="flex flex-col gap-5 m-20  text-center relative justify-center bg-main p-10 opacity-90 rounded-2xl">
          <h1 className="text-5xl font-sawarabiMincho w-full">
            WELCOME to Me:Japan
          </h1>
          <span className="-mt-2 text-sm font-sawarabiMincho">
            Japan is a land where ancient traditions meet cutting-edge
            modernity.
          </span>
          <div className="w-full h-1 bg-black"></div>
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

      {/* AUTHOR */}
      <section className="bg-main relative m-20 ">
        <div className="flex gap-10 p-10 items-center">
          <div className="flex w-full h-full">
            <Image
              src={"/myself.jpg"}
              width={200}
              height={200}
              style={{ minWidth: "200px", minHeight: "150px" }}
              alt="me: dharmasena akamal aji"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-sawarabiMincho">
              こんにちは！ ようこそわがブログへ！
            </h1>
            <p className="font-kanit">
              My name is Dharmasena, nice to meet you !!. I&apos;m passionate
              about all things Japan! For over five years, I’ve been immersed in
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
