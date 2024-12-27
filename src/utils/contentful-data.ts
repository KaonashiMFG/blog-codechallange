import * as contentful from "contentful";

const client = contentful.createClient({
  space: "8am65wx5arte",
  environment: "master",
  accessToken: "ZmiPHuDGZZ31mre15_qdA_VGB38D7Q_Mwbjwf2V7FAw",
});

export async function getAllEntries() {
    try {
      const data = await client.getEntries();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export async function getAllBLOG() {
  try {
    const data = await client.getEntries({ content_type: "blog" });
    return data.items.map((post) => {

      return {
        title: post.fields.title,
        slug: post.fields.slug,
        author: post.fields.author,
        content: post.fields.content,
        featuredImage: post.fields.featuredimage,
        categories: post.fields.categories,
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

