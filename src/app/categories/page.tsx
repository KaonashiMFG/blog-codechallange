import { getAllCategories } from "@/utils/contentful-data";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const cats = await getAllCategories();

  return (
    <>
      <section className="flex flex-col gap-5 bg-main p-20">
        <h1 className="bg-secondary p-5 text-center text-main">
          My Categories
        </h1>
        <div className="flex flex-col items-center justify-center gap-5">
          {cats?.map((cat, index) => (
            <div key={index} className="relative h-40 w-full">
              <Image
                src={typeof cat?.image === "string" ? cat.image : ""}
                alt="category"
                fill
                className="absolute object-cover opacity-80"
              />
              <Link href={`/categories/${cat.slug}`}>
                <h2 className="absolute flex w-full justify-between bg-secondary bg-opacity-90 p-2 pl-5 text-main">
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
