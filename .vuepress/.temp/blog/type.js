export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-5ef099df","v-037c250d","v-6c37a1e9","v-7cb553dd","v-e648c9de","v-4e089efc","v-60cbfb81","v-5b1d4715","v-4e141a4b","v-3d2c52a4","v-5ea8eb91","v-a6614676","v-eef560ce","v-8eab3c46","v-75a8c0a1","v-60c9a2e1","v-a1211dca","v-af4d51b6","v-d12a3a8c","v-0060584c","v-291e7daf"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slide/","keys":[]}},"star":{"/":{"path":"/star/","keys":["v-5ef099df","v-eef560ce"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-5ef099df","v-037c250d","v-6c37a1e9","v-7cb553dd","v-e648c9de","v-4e089efc","v-60cbfb81","v-5b1d4715","v-4e141a4b","v-3d2c52a4","v-5ea8eb91","v-a6614676","v-eef560ce","v-8eab3c46","v-75a8c0a1","v-60c9a2e1","v-a1211dca","v-af4d51b6","v-d12a3a8c","v-0060584c","v-291e7daf"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
