import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { 
    text: "Category", 
    icon: "categoryselected", 
    link: "/category/" 
  },
  {
    text: "Tags",
    icon: "tag",
    link: "/tag/",
  },
  {
    text: "Timeline",
    icon: "time",
    link: "/timeline/",
  },
]);
