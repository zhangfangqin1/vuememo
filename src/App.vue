<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import 'babel-polyfill'
export default {
  name: "App"
};
</script>

<style>
html,
body,
div,
p,
h1,
h2,
h3,
h4,
h5,
h6,
header {
  padding: 0;
  margin: 0;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #34495e;
  overflow-x: hidden;
  font-size: 14px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2c3e50;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0;
}
/* 过渡动画 */
.component-fade-enter-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter {
  opacity: 0;
}
/* 是否完成按钮动效 */
.scale-fade-enter-active {
  transition: all 0.3s ease;
}
.scale-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.scale-fade-enter,
.scale-fade-leave-to {
  transform: scale(3);
  opacity: 0;
}
/* 切换显示模式 */
.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateX(1.875rem);
}
.slide-right-enter-to,
.slide-right-leave {
  opacity: 1;
  max-height: 18.75rem; /* 300/16 */
}
.slide-right-enter-active {
  transition: all 1s ease;
}
.slide-right-leave-active {
  transition: all 0.3s ease;
}
/* mintUI v-modal */
.v-modal {
  background: #fff;
  opacity: 0.9;
}
.mint-cell-label {
  font-size: 14px;
}
/* button-group */
.button-group {
  bottom: 0;
  position: relative;
  width: 100%;
  background: #fff;
  opacity: 0.9;
}

/* hr */
.md hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}
/* important */
.md b,
strong {
  font-weight: bold;
}
/* a and p */
.md p {
  margin-bottom: 20px;
  font-size: 14px;
  word-break: break-all;
}
.md a {
  color: #428bca;
  text-decoration: none;
}
/* pre and code */
.md code {
  overflow: scroll;
  word-break: break-all;
}
.md li > code {
  color: #c7254e;
  background: #f9f2f4;
  border-radius: 3px;
}
.md p > code {
  color: #c7254e;
  background: #f9f2f4;
  border-radius: 3px;
}
.md pre {
  text-indent: 0;
}
.md > pre > code {
  margin: 0;
  padding: 0;
}
.md > pre {
  margin: 0;
  padding: 0;
  max-height: 3.25rem;
  overflow: scroll;
  background-color: #fafafa;
  text-align: left;
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
}
.md blockquote {
  border-left: 2px solid #ccc;
  padding: 10px 10px;
  margin: 0;
  font-size: 17.5px;
}
.md blockquote p {
  overflow: scroll;
  text-align: left;
  text-indent: 0;
  margin-bottom: 0;
}
/* list */
.md > ul,
ol > li {
  text-indent: 0;
}
/* title */
.md > h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 10px;
}
.md > h1 {
  font-size: 18px;
}
.md > h2 {
  font-size: 16px;
}
.md > h3 {
  font-size: 14px;
}
.md > h4 {
  font-size: 12px;
}
.md > h5 {
  font-size: 12px;
}
.md > h6 {
  font-size: 12px;
}
/* table */
.md table {
  display: table;
}
.md thead {
  display: table-header-group;
  vertical-align: middle;
}
.md tr {
  display: table-row;
}
.md th {
  text-align: left;
}
.md tbody {
  display: table-row-group;
}
.md td {
  vertical-align: top;
  text-indent: 0;
}
.md tbody tr:nth-child(odd) > td {
  background-color: #f9f9f9;
}
/* img */
.md img {
  vertical-align: middle;
  max-width: 35%;
}
</style>
