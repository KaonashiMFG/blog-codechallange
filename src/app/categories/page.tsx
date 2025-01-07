import { getAllCategories } from "@/utils/contentful-data";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const cats = await getAllCategories();

  return (
    <>
      <section className="flex flex-col gap-5 bg-main p-20 py-10">
        <h1 className=" p-5 text-center text-secondary text-4xl">
          My Categories
        </h1>
        <div className="flex flex-col items-center justify-center gap-5">
          {cats?.map((cat, index) => (
            <div key={index} className="relative h-12 w-full hover:opacity-80 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Image
                src={typeof cat?.image === "string" ? cat.image : ""}
                alt="category"
                fill
                className="absolute object-cover opacity-80"
              />
              <Link href={`/categories/${cat.slug}`}>
                <h2 className="absolute flex w-full justify-between bg-secondary bg-opacity-85 p-2 pl-5 text-main">
                  {typeof cat.title === "string" ? cat.title : ""}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
