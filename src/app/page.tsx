import Image from "next/image";
import Link from "next/link";
import {
  getAllHero,
  getLatestPosts,
  getEntries
} from "../utils/contentful-data";

export default async function Hero() {
  const heroes = await getAllHero();
  const latestPosts = await getLatestPosts();
  const featuredCategories = await getEntries({content_type: "categories", fields_popular: true});

  return (
    <>
      {/* HERO */}
      <section key={14} className="relative flex min-h-[calc(100vh-80px)] justify-center bg-main">
        <div className="mx-20 my-4 max-w-full">
          {heroes?.map((hero, index) => (
            <>
              <div key={index} className="flex max-xl:flex-col max-xl:gap-7">
                <h1 className="mr-10 w-2/3 bg-secondary p-3 text-4xl text-main max-xl:w-full ">
                  {typeof hero?.title === "string" ? hero.title : ""}
                </h1>
                <p className="w-1/3 max-xl:w-full max-xl:text-center">
                  {typeof hero?.description === "string"
                    ? hero.description
                    : ""}
                </p>
              </div>
              <div className="relative mt-10 h-80 w-[1200] overflow-hidden">
                <Image
                  src={hero?.image}
                  fill
                  alt="hero section"
                  className="object-cover"
                />
              </div>
            </>
          ))}
        </div>
      </section>

      {/* POST */}
      <section className="bg-main p-20 max-xl:p-10">
        <h1 className="bg-secondary p-2 text-main ">My Latest Post</h1>
        <div className="mt-3">
          {latestPosts?.map((post, index) => (
            <div key={index} className="gap-1">
              <div className="relative h-52 max-xl:h-80">
                <Image
                  src={post?.featuredImage}
                  fill
                  alt={typeof post?.title === "string" ? post.title : ""}
                  className="absolute object-cover"
                />
                <div className="absolute h-full w-full bg-secondary bg-opacity-60 p-10 text-main">
                  <div className="bg-main p-1 px-3 text-secondary flex items-center gap-5 max-xl:flex-col max-xl:gap-1">
                    <h2>
                      {typeof post?.title === "string" ? post.title : ""}
                    </h2>
                      <p>by: {typeof post?.author === "string" ? post.author : ""}</p>
                  </div>
                  <div className="mt-2 max-xl:text-center flex flex-col gap-5 max-xl:gap-1">
                    <p>
                      {typeof post.preview === "string" ? post.preview : ""}
                    </p>
                    <Link href={`/post/${typeof post.slug === "string" ? post.slug : ""}`} className="text-blue-300">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="flex max-xl:flex-col gap-10 bg-main p-20">
        <div className="bg-secondary p-5">
          <h1 className="bg-main p-5">
            My <br /> Featured <br /> Categories
          </h1>
        </div>
        <div className="flex gap-10 max-xl:flex-col">

          {featuredCategories?.map((cat, index) => (
            <div key={index} className="relative h-80 w-52 max-xl:w-full">
              <Image
                src={"http:" + cat?.fields?.image?.fields.file.url}
                alt="category"
                fill
                className="absolute object-cover opacity-80"
              />
              <h2 className="absolute w-full bg-secondary bg-opacity-90 p-2 pl-5 text-main">
                {typeof cat?.fields?.title === "string" ? cat.fields.title : ""}
              </h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
