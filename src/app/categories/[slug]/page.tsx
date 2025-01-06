import { getEntries } from "@/utils/contentful-data";
import Image from "next/image";
import Link from "next/link";

export default async function SlugCategory({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const posts =
    (await getEntries({
      content_type: "blog", fields_popular: true
    })) || [];

console.log(posts);

  return (
    <section className="bg-main p-20">
      <div className="flex gap-20">
        <Link href={"/categories"}>
          <div className="relative cursor-pointer">
            <Image
              src={"/blog/back.svg"}
              width={50}
              height={50}
              alt="back button"
            />
          </div>
        </Link>

        <h1 className="mb-10 font-kanit text-2xl font-bold text-secondary">
          Category: {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {posts?.length > 0 ? (
          posts?.map((post, index: number) => (
            <div key={index} className="rounded-md border bg-secondary p-5">
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={`https:${post.fields.featuredImage?.fields.file.url}`}
                  fill
                  alt="featured image"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="mt-3 rounded-lg bg-main p-1 px-3 text-lg font-bold font-raleway">
                  {typeof post.fields.title === 'string' ? post.fields.title : ''}
                </h2>
                <p className="text-sm text-main h-[80px]">{typeof post.fields.preview === 'string' ? post.fields.preview : ''}</p>
                <Link href={`/post/${post.fields.slug}`}>
                  <button className=" text-blue-300 underline">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available in this category.</p>
        )}
      </div>
    </section>
  );
}
