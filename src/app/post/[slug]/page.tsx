import Image from 'next/image';
import Link from 'next/link';
import { getEntries } from '../../../utils/contentful-data';

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
    <section className="bg-main p-4 md:p-8 lg:p-20">
      {/* back button */}
      <Link href={"/post"}>
        <div className="absolute cursor-pointer">
          <Image
            src={"/blog/back.svg"}
            width={50}
            height={50}
            alt="back button"
            className="w-8 h-8 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px]"
          />
        </div>
      </Link>
      
      {/* content */}
      <div className="flex flex-col gap-4 md:gap-5 px-4 md:px-20 lg:px-52 mt-12 md:mt-0">
        <span className="rounded-3xl bg-secondary p-2 text-main text-center text-sm md:text-base">
          {post && post[0] && String(post[0].fields.categories)}
        </span>
        
        <div className="relative h-40 md:h-48 lg:h-52 w-full overflow-hidden rounded-lg">
          <Image
            src={`https:${post![0].fields.featuredImage?.fields.file.url}`}
            fill
            alt="featured image"
            className="object-cover"
          />
        </div>
        
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          {post && post[0] && String(post[0].fields.title)}
        </h1>
        
        <p className="text-sm md:text-base">
          Author: {post && post[0] && String(post[0].fields.author)}
        </p>
        
        <p className="text-sm md:text-base">
          {post![0]?.fields?.content?.content[0].content[0].value}
        </p>
      </div>
    </section>
  );
}