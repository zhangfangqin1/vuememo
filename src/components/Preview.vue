<template>
  <div>
    <div class="container">
      <h3 class="title">{{doc.title}}</h3>
      <div v-html="md" class="content md"></div>
    </div>
    <div class="button-group">
      <mt-button @click.native="handleClose" type="primary" plain size="large">关闭预览</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: ['doc'],
  computed: {
      md: function() {
            let MarkdownIt = require('markdown-it');
            let md = new MarkdownIt();
            let result = md.render(this.doc.content)
            return result
      }
  },
  methods: {
      handleClose() {
          this.$emit('handleClose');
      }
  },
}
</script>

<style>
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
/* a */
.md a {
  color: #428bca;
  text-decoration: none;
}
/* pre and code */
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
}
/* list */
.md > ul,
ol > li {
  text-indent: 0;
}
/* title */
.md > h1 {
  font-size: 36px;
}
.md > h2 {
  font-size: 30px;
}
.md > h3 {
  font-size: 24px;
}
.md > h4 {
  font-size: 18px;
}
.md > h5 {
  font-size: 12px;
}
.md > h6 {
  font-size: 6px;
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

/* container */
.container {
  margin: 0 0.1875rem;
  margin-bottom: 0.1875rem;
}
.content {
  height: 100%;
  text-indent: 0.8125rem;
  margin-bottom: 1.25rem;
}
.title {
  text-align: center;
  margin: 0.1875rem 0;
}
</style>
