import { parser } from "html-metadata-parser";
export const getTitle = async (url) => {
  let title = "";
  try {
    const metaParser = await parser(url);
    title = metaParser.meta.title;
  } catch {
    title = url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\.[a-zA-Z]+$/, "")
      .replace(/\/$/, "")
      .replace(".", "-");
  }
  return title;
};
