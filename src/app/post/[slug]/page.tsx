import Image from "next/image";
import Link from "next/link";
import { getEntries } from "../../../utils/contentful-data";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

interface Post {
  fields: {
    title: string
    content: Document
    author: string
    featuredImage: {
      fields:{
        file:{
          url:string
        }
      }
    }
  }
}

export default async function SlugPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const post = (await getEntries({
    content_type: "blog",
    fields_slug: slug,
  })) as unknown as Post[]


  console.log(post);

  // const postContent = post![0]?.fields.content?.content[0].content;
  // const contentVal = postContent.map((val: any) => {
  //   return val.value;
  // });

  return (
    <section className="bg-main p-4 md:p-8 lg:p-20">
      {/* back button */}
      <Link href={"/post"}>
        <div className="absolute cursor-pointer">
          <Image
            src={"/blog/back.svg"}
            width={50}
            height={50}
            alt="back button"
            className="h-8 w-8 md:h-12 md:w-12 lg:h-[50px] lg:w-[50px]"
          />
        </div>
      </Link>

      {/* content */}
      <div className="mt-12 flex flex-col gap-4 px-4 md:mt-0 md:gap-5 md:px-20 lg:px-52">
        <span className="rounded-3xl bg-secondary p-2 text-center text-sm text-main md:text-base">
          {post[0].fields.title}
        </span>

        <div className="relative h-40 w-full overflow-hidden rounded-lg md:h-48 lg:h-52">
          <Image
            src={`https:${post[0]!.fields.featuredImage.fields.file.url}`}
            fill
            alt="featured image"
            className="object-cover"
          />
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl">
          {post[0].fields.title}
        </h1>

        <p className="text-sm md:text-base">
          Author: {post[0].fields.author}
        </p>

        <div className="text-sm md:text-base">{documentToReactComponents(post[0].fields.content)}</div>
      </div>
    </section>
  );
}
