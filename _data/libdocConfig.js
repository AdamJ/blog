// START IMPORT REQUIRE WORKAROUND
// To make 11ty --serve work with JSON imports
// https://github.com/11ty/eleventy/issues/3128#issuecomment-1878745864
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// END IMPORT REQUIRE WORKAROUND

// START JSON IMPORT WORKAROUND
// import userConfig from "../settings.json" with { "type": "json" };
const userConfig = require("../settings.json");
// END JSON IMPORT WORKAROUND

export default {
    lang: userConfig.lang ?? "en",
    siteTitle: userConfig.siteTitle ?? "Blog",
    siteDescription: userConfig.siteDescription ?? "This is the blog for my thoughts on web development and design.",
    siteLogoUrl: userConfig.siteLogoUrl ?? "/assets/avatar.png",
    siteLogoMaxHeight: userConfig.siteLogoMaxHeight ?? 60,
    author: userConfig.author ?? false,
    faviconUrl: userConfig.faviconUrl ?? "/favicon.png",
    ogImageUrl: userConfig.ogImageUrl ?? "https://github.com/AdamJ/AdamJ.github.io/blob/main/src/assets/img/avatar-large.jpg",
    customLinks: userConfig.customLinks ?? [],
    blogTitle: userConfig.blogTitle ?? "Blog Posts",
    blogDescription: userConfig.blogDescription ?? false,
    blogAuthor: userConfig.blogAuthor ?? false,
    blogSlug: userConfig.blogSlug ?? "posts",
    displayTagsListLink: userConfig.displayTagsListLink ?? true,
    tocEnabled: userConfig.tocEnabled ?? true,
    tocHtmlTags: userConfig.tocHtmlTags ?? ["h1", "h2", "h3", "h4", "h5", "h6"],
    tocMinTags: userConfig.tocMinTags ?? 2,
    htmlBasePathPrefix: userConfig.htmlBasePathPrefix ?? "",
    sandboxRunSwitch: userConfig.sandboxRunSwitch ?? true,
    searchEnabled: userConfig.searchEnabled ?? true,
    hljsLanguages: userConfig.hljsLanguages ?? [
        "xml",
        "javascript",
        "json",
        "yaml",
        "liquid",
        "markdown",
        "css",
        "bash"
    ],
    roundedImagesCorners: userConfig.roundedImagesCorners ?? true,
    editThisPageRootUrl: userConfig.editThisPageRootUrl ?? false,
    imgBgColorLightMode: userConfig.imgBgColorLightMode ?? "#fff",
    imgBgColorDarkMode: userConfig.imgBgColorDarkMode ?? "#000",
    productionUrl: userConfig.productionUrl ?? "https://blog.adamjolicoeur.com"
};
