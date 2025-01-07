import { getEntries } from "@/utils/contentful-data";
import Image from "next/image";
import Link from "next/link";

interface ContetfulPost {
  fields: {
    title: string;
    preview: string;
    slug: string;
    featuredImage: {
      fields: {
        file: { url: string };
      };
    };
    category: { fields: { slug: string } }[];
  };
}

export default async function SlugCategory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const posts =
    ((await getEntries({
      content_type: "blog",
    })) as unknown as ContetfulPost[]) || [];

  const filteredPosts = posts?.filter((post) =>
    post.fields.category.some((item) => item.fields.slug === slug),
  )

  console.log(filteredPosts);

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
        {filteredPosts?.length > 0 ? (
          filteredPosts?.map((post, index: number) => (
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
                <h2 className="mt-3 rounded-lg bg-main p-1 px-3 font-raleway text-lg font-bold">
                  {post.fields.title}
                </h2>
                <p className="h-[80px] text-sm text-main">
                  {post.fields.preview}
                </p>
                <Link href={`/post/${post.fields.slug}`}>
                  <button className="text-blue-300 underline">Read More</button>
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
