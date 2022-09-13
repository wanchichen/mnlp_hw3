import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
// import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://lileicc.github.io",

  author: {
    name: "Lei Li",
    url: "https://www.cs.ucsb.edu/~leili",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "lileicc/blog",

  // docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: false,

  footer: "Li Lab",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "AI Researcher",
    intro: "/",
    medias: {
      GitHub: "https://www.github.com/lileicc",
      Twitter: "https://twitter.com/lileics",
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // If you don't need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      enableAll: false,
      tex: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
