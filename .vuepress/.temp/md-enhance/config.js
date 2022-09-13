import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
import Presentation from "/Users/leili/workspace/blog/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "/Users/leili/workspace/blog/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import "/Users/leili/workspace/blog/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tex.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Presentation", Presentation);
    
  }
});