import { getAllBLOG } from "@/utils/contentful-data";

export default async function Post() {
  const posts = await getAllBLOG();

  return (
    <>
      <section>
        <div>
          <h1 className="flex flex-1 text-center text-2xl">
            posts
          </h1>
          {posts?.map((item) => {
            return (
              <article key={String(item.slug)}>
                <h2>{typeof item.title === 'string' ? item.title : 'Untitled'}</h2>
                <p>{typeof item.content === 'string' ? item.content : 'Untitled'}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
