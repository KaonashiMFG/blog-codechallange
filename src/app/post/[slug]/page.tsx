import { getEntries } from "@/utils/contentful-data";
import Image from "next/image";
import Link from "next/link";

export default async function PostOnePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const post = await getEntries({
    content_type: "blog",
    fields_slug: slug,
  });

  console.log(post);

  return (
    <>
      <section className="bg-main p-20">
        {/* back button */}
        <Link href={"/post"}>
          <div>
            <Image
              src={"/blog/back.svg"}
              width={50}
              height={50}
              alt="back button"
            />
          </div>
        </Link>
        {/* content */}
        <div className="flex flex-col gap-5 p-10 px-52">
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
          <p>
            {post![0]?.fields?.content?.content[0].content[0].value}
          </p>
        </div>
      </section>
    </>
  );
}
