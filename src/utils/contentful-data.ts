import * as contentful from "contentful";

const client = contentful.createClient({
  space: "8am65wx5arte",
  environment: "master",
  accessToken: "ZmiPHuDGZZ31mre15_qdA_VGB38D7Q_Mwbjwf2V7FAw",
});

export async function getEntries({
  content_type,
  fields_popular,
  fields_slug,
  fields_categories,
}: {
  content_type: string;
  fields_popular?: boolean;
  fields_slug?: string;
  fields_categories?: string;
}) {
  try {
    const data = await client.getEntries({
      content_type: content_type,
      "fields.popular": fields_popular,
      "fields.slug": fields_slug,
      "fields.categories": fields_categories,
    });

    return data.items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllBlog() {
  try {
    const data = await client.getEntries({ content_type: "blog" });

    return data.items.map((post) => {
      const thumbnailUrl = post?.fields?.featuredImage?.fields.file.url;

      return {
        title: post.fields.title,
        slug: post.fields.slug,
        author: post.fields.author,
        content: post.fields.content?.content[0].content[0].value,
        featuredImage: `http:${thumbnailUrl}`,
        categories: post.fields.category.map((item) => item.fields.title),
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLatestPosts() {
  try {
    const res = await client.getEntries({
      content_type: "blog",
      limit: 1,
    });

    return res.items.map((post) => {
      const thumbnailUrl = post?.fields?.featuredImage?.fields.file.url;

      return {
        title: post.fields.title,
        slug: post.fields.slug,
        author: post.fields.author,
        content: post.fields.content?.content[0].content[0].value,
        featuredImage: `http:${thumbnailUrl}`,
        categories: post.fields.categories,
        preview: post.fields.preview,
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllHero() {
  try {
    const data = await client.getEntries({ content_type: "hero" });

    return data.items.map((post) => {
      const heroUrl = post?.fields?.image?.fields?.file?.url;

      return {
        title: post.fields.title,
        description: post.fields.description,
        image: `http:${heroUrl}`,
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    const data = await client.getEntries({ content_type: "categories" });

    return data.items.map((post) => {
      const thumbnailUrl = post?.fields?.image?.fields?.file?.url;

      return {
        title: post.fields.title,
        slug: post.fields.slug,
        image: `http:${thumbnailUrl}`,
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
