import { bio, shortDescription } from "./cv";

const title = `${bio.name}, ${bio.occupation}`;
const image = "https://maksimkunaev.github.io/cv-landing/media/photo.png";
const url = "https://maksimkunaev.github.io/cv-landing/";

const description = shortDescription;

const meta = {
  title: title,
  htmlAttrs: { lang: "en" },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { hid: "description", name: "description", content: description },
    { name: "format-detection", content: "telephone=no" },
    { name: "title", content: title },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: image },
  ],
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&display=swap" },
  ],
};

export default meta;
