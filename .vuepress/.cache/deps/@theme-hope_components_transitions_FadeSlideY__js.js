import {
  useScrollPromise
} from "./chunk-R56XOF7Y.js";
import "./chunk-B6YVLY2D.js";
import "./chunk-2UKU5Z4C.js";
import "./chunk-ANKY43RT.js";
import "./chunk-AV7X2VFR.js";
import "./chunk-WCXEAEE2.js";
import {
  Transition,
  defineComponent,
  h
} from "./chunk-PWHMU4FR.js";
import "./chunk-WXFYXWFA.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/vuepress-theme-hope/lib/client/components/transitions/FadeSlideY.js
import "/Users/leili/workspace/blog/node_modules/vuepress-theme-hope/lib/client/styles/fade-slide-y.scss";
var FadeSlideY_default = defineComponent({
  name: "FadeSlideY",
  setup(_props, { slots }) {
    const scrollPromise = useScrollPromise();
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;
    return () => h(Transition, {
      name: "fade-slide-y",
      mode: "out-in",
      onBeforeEnter,
      onBeforeLeave
    }, () => {
      var _a;
      return (_a = slots["default"]) == null ? void 0 : _a.call(slots);
    });
  }
});

// dep:@theme-hope_components_transitions_FadeSlideY__js
var theme_hope_components_transitions_FadeSlideY_js_default = FadeSlideY_default;
export {
  theme_hope_components_transitions_FadeSlideY_js_default as default
};
//# sourceMappingURL=@theme-hope_components_transitions_FadeSlideY__js.js.map
