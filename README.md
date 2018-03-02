# 💯 VUEMEMO

> 基于 Vue.js 的简单记事本 SPA 。Mint-UI、Vue、VueRouter、Vuex，使用localStorage作为数据本地持久化，并支持使用Markdown格式笔记，主要功能有增查改删笔记、按条件过滤和排序笔记、并支持文字和图片等形式的笔记.

> Vue.js-based simple notepad SPA. Mint-UI, Vue, VueRouter, Vuex, the use of localStorage as local database(storage), and support the Markdown formatting language, the main features are increased check delete notes, conditional filtering and sorting notes , And supports notes in the form of words and pictures.

## 🚀 DEMO

点击这里看演示：[DEMO](http://alljs.cc:8080)

源代码：[github](https://github.com/oliyg/vuememo)

---

## 🚨 BUILD SETUP

``` bash
# 安装依赖
npm install
# 开发模式localhost:8080
npm run dev
# 打包构建
npm run build
```

## 🎯 主要功能

- v1
  - ✔️响应适配 Responsive
  - ✔️创建、修改笔记 create or modify notes
  - ✔️删除部分或全部笔记 delete notes or drop all data
  - ✔️查看笔记详细内容 read the note content
  - ✔️标记笔记是否完成 check if completed
  - ✔️切换笔记显示模式 switch display mode
- v2
  - ✔️按是否完成进行过滤 filter by completed
  - ✔️按创建时间排序 sort by timestamp
  - ✔️按类别进行过滤 filter by type
  - ✔️收藏、取消收藏和显示收藏笔记 star or unstar
  - ✔️通过 localStorage 对象的数据本地持久化 user data stored in localStorage
- v3
  - ✔️支持Markdown格式 support Markdown
  - ✔️以图片的形式保存笔记 save note as img(.png)
  - ✔️复制笔记内容到剪贴板 Copy the note content to clipboard
  - ✔️导出全部笔记至 JSON 文件格式(Blob)  export all notes to JSON file
- v4
  - ✔️实时保存笔记 save note in real time
  - 定时推送提醒通知 notifications
  - 通过base64支持保存图片 save the image via base64
  - 通过Canvas支持绘图 draw in canvas 

## 📦 文件目录

```
├── App.vue
├── assets // 静态资源
├── components // 组件
|  ├── Header.vue // 导航栏
|  ├── Index.vue // 主页
|  ├── MemoItem.vue // 笔记文档
|  ├── ModifyMemo.vue // 修改笔记界面
|  ├── NewMemo.vue // 新建笔记界面
|  ├── Preview.vue // 预览 MD 笔记
|  ├── ShowMemo.vue // 查看笔记界面
|  └── Tabbar.vue // tabbar栏
├── main.js
├── router // 路由
|  └── index.js
├── store // 全局 store 管理
|  ├── action.js
|  ├── index.js
|  └── mutation.js
└── utils // 全局共用方法
   └── index.js
```

---

## 🍎 MESSAGE ME

- [github](http://github.com/oliyg)
- [blog](http://alljs.cc)
- [email](billyangg@qq.com)