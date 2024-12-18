import Image from "next/image";

export default function About() {
  return (
    <>
    
      {/* image */}
      <div className="w-full h-full absolute">
        <Image
          src="/hokusai.jpg"
          fill
          alt="hokusai wave painting"
          className="absolute object-cover "
        />
      </div>

      {/* WELCOME */}
      <section className="flex flex-col gap-5 m-20  text-center relative justify-center bg-main p-10 opacity-90 rounded-2xl">
        <h1 className="text-5xl text-">WELCOME to Me:Japan</h1>
        <span className="-mt-2 text-sm">
          Japan is a land where ancient traditions meet cutting-edge modernity.
        </span>
        <div className="w-full h-1 bg-black"></div>
        <p>
          Welcome to my corner of the internet, where I share my passion for
          Japan. From its rich cultural heritage to the latest trends, I am here
          to document everything that makes Japan so fascinating. Whether you
          are a fellow enthusiast, a curious traveler, or someone with deep
          connections to Japan, you&apos;re in the right place! Let&apos;s
          explore the wonders of this beautiful country together.
        </p>
      </section>

      {/* AUTHOR */}
      <section className="m w-full h-[50px] bg-main relative">
        <div>
          <div>
            {/* <Image src={} /> */}
          </div>
          <h1>Get to know me!!</h1>
        </div>
      </section>
    </>
  );
}
