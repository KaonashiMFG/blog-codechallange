import { getEntries } from "@/utils/contentful-data";
import Image from "next/image";
import Link from "next/link";

export default async function SlugPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const post = await getEntries({
    content_type: "blog",
    fields_slug: slug,
  });

  return (
    <>
      <section className="bg-main p-20">
        {/* back button */}
        <Link href={"/post"}>
          <div className="absolute cursor-pointer">
            <Image
              src={"/blog/back.svg"}
              width={50}
              height={50}
              alt="back button"
            />
          </div>
        </Link>
        {/* content */}
        <div className="p- flex flex-col gap-5 px-52">
          <span className="rounded-3xl bg-secondary p-2 text-main text-center">
            {post && post[0] && String(post[0].fields.categories)}
          </span>
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={`https:${post![0].fields.featuredImage?.fields.file.url}`}
              fill
              alt="featured image"
              className="object-cover"
            />
          </div>
          <h1>{post && post[0] && String(post[0].fields.title)}</h1>
          <p>Author: {post && post[0] && String(post[0].fields.author)}</p>
          <p>{post![0]?.fields?.content?.content[0].content[0].value}</p>
        </div>
      </section>
    </>
  );
}
