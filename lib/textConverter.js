import { slug } from "github-slugger";

// slugify
export const slugify = (content) => {
  if (!content) return null;

  return slug(content);
};

// humanize
export const humanize = (content) => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};
