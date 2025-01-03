import { getAllBLOG } from "@/utils/contentful-data";
import Image from "next/image";
import Link from "next/link";

export default async function Post() {
  const posts = await getAllBLOG();

  return (
    <>
      <section>
        <div className="bg-main px-20 py-5">
          <h1 className="flex justify-center bg-secondary p-5 text-center text-main">
            Posts
          </h1>
          <div className="flex flex-col gap-5 py-5">
            {posts?.map((item) => {
              return (
                <>
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
                        {typeof item.title === "string"
                          ? item.title
                          : "Untitled"}
                      </h2>
                      <p>
                        {typeof item.author === "string"
                          ? item.author
                          : "Untitled"}
                      </p>
                      <Link href={`/post/${item.slug}`}>
                        <p className="mt-5 text-sm text-secondary">
                          Further Reading {">"}
                        </p>
                      </Link>
                    </div>
                  </article>
                  <div className="h-1 bg-secondary"></div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
