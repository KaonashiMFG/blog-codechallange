import Image from "next/image";
import Link from "next/link";
import {
  getAllHero,
  getAllCategories,
  getLatestPosts,
} from "../utils/contentful-data";

export default async function Hero() {
  const heroes = await getAllHero();
  const cats = await getAllCategories();
  const latestPosts = await getLatestPosts();

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-80px)] justify-center bg-main">
        <div key="21" className="mx-20 my-4 max-w-full">
          {heroes?.map((hero, index) => (
            <>
              <div key={index} className="flex">
                <h1 className="mr-10 w-2/3 bg-secondary p-3 text-4xl text-main">
                  {typeof hero?.title === "string" ? hero.title : ""}
                </h1>
                <p className="w-1/3">
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
      <section className="bg-main p-20">
        <h1 className="bg-secondary p-2 text-main">My Latest Post</h1>
        <div className="mt-3">
          {latestPosts?.map((post, index) => (
            <div key={index} className="gap-1">
              <div className="relative h-52">
                <Image
                  src={post?.featuredImage}
                  fill
                  alt={typeof post?.title === "string" ? post.title : ""}
                  className="absolute object-cover"
                />
                <div className="absolute h-full w-full bg-secondary bg-opacity-60 p-10 text-main">
                  <div className="bg-main p-1 px-3 text-secondary flex items-center gap-5">
                    <h2>
                      {typeof post?.title === "string" ? post.title : ""}
                    </h2>
                      <p>by: {typeof post?.author === "string" ? post.author : ""}</p>
                  </div>
                  <div className="mt-2">
                    <p>
                      {typeof post.preview === "string" ? post.preview : ""}
                    </p>
                    <Link href="/" className="text-blue-300">
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
      <section className="flex gap-10 bg-main p-20">
        <div className="bg-secondary p-5">
          <h1 className="bg-main p-5">
            My <br /> Featured <br /> Categories
          </h1>
        </div>
        {cats?.map((cat, index) => (
          <div key={index} className="relative h-80 w-52">
            <Image
              src={typeof cat?.image === "string" ? cat.image : ""}
              alt="category"
              fill
              className="absolute object-cover opacity-80"
            />
            <h2 className="absolute w-full bg-secondary bg-opacity-90 p-2 pl-5 text-main">
              {typeof cat.title === "string" ? cat.title : ""}
            </h2>
          </div>
        ))}
      </section>
    </>
  );
}
