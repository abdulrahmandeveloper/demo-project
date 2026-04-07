import slugify from "slugify";

export const createSlug = (slug: string) => {
  return slugify(slug, { lower: true, strict: true });
};

export const encodeUrl = (slug: string) => {
  return encodeURIComponent(slug);
};
