module.exports = ctx => ({
  "title": "Learning and Language Blog",
  "description": "Blogs on NLP, Machine Learning, Data Mining, and other AI related topics",
  "dest": "output",
  "base": '/blog/',
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/icon48.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "noFoundPageByTencent": false,
    "subSidebar": 'auto',
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "lilei",
            "link": "https://github.com/lileicc",
            "icon": "reco-github"
          },
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "lileicc",
        "desc": "author's GitHub",
        "avatar": "https://avatars1.githubusercontent.com/u/1768854?s=460&u=c192aeaef1c9a2cd0e5e559bd390082e3dbada79&v=4",
        "link": "https://github.com/lileicc"
      },
      {
        "title": "lz1998",
        "desc": "lizheng.lz1998's GitHub",
        "email": "lizheng.lz1998@bytedance.com",
        "link": "https://github.com/lz1998"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Lei Li",
    "authorAvatar": "/avatar.png",
    "record": "",
    "startYear": "2016",
    "mode": "light",
    "modePicker": false
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": {
    "@codeciting/vuepress-plugin-echarts": {},
    "vuepress-plugin-mathjax": {
      target: 'svg',
      macros: {
        '*': '\\times',
      },
    }
  }
})
