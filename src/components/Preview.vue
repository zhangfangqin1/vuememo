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
