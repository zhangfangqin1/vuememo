<template>
  <div>
    <Header/>
    <div v-if="memoItem.ifMarkdown" class="container">
      <h3 class="title">{{memoItem.title}}</h3>
      <p class="timestamp">{{new Date(memoItem.timestamp).toLocaleTimeString()}}</p>
      <div v-html="md(memoItem.content)" class="content md"></div>
    </div>
    <div v-else class="container">
      <h3 class="title">{{memoItem.title}}</h3>
      <p class="timestamp">{{new Date(memoItem.timestamp).toLocaleTimeString()}}</p>
      <p class="content">{{memoItem.content}}</p>
    </div>
    <div class="button-group">
      <mt-button @click.native="handleModify" type="primary" plain size="large">修改</mt-button>
      <mt-button plain size="large" class="new-memo" @click.native="handleStar" type="default">{{ memoItem.star ? '取消收藏' : '收藏' }}</mt-button>
      <mt-button @click.native="handleDelete" type="danger" plain size="large">删除</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "Vuex";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import actionType from "../store/action";

import Header from "@/components/Header";

export default {
  name: "ShowMemo",
  components: {
    Header
  },
  computed: {
    ...mapState({
      memos: "memos"
    }),
    memoItem: function() {
      let uid = this.$route.params.id;
      return this.memos.find((item, index) => {
        return item.uid === uid;
      });
    }
  },
  beforeMount: function() {
    if (JSON.parse(window.localStorage.memos).length) {
      this.sync_memo();
    }
  },
  methods: {
    ...mapActions({
      delete_memo: actionType.DELETE_MEMO,
      star_memo: actionType.STAR_MEMO,
      sync_memo: actionType.SYNC_MEMO
    }),
    md: function(doc) {
      let MarkdownIt = require('markdown-it');
      let md = new MarkdownIt();
      let result = md.render(doc)
      return result
    },
    handleStar() {
      let uid = this.$route.params.id;
      this.star_memo(uid)
        .then(() => {
          Toast({
            message: `${this.memoItem.star ? "收藏成功" : "取消收藏"}`
          });
        })
        .catch(e => {
          Toast({
            message: `收藏失败，请重试`
          });
          console.log(e);
        });
    },
    handleModify() {
      let uid = this.$route.params.id;
      this.$router.push({ path: `/modify/${uid}` });
    },
    handleDelete() {
      let uid = this.$route.params.id;
      MessageBox.confirm("确定删除此笔记？", "提示").then(
        () => {
          console.log("确认删除笔记");
          this.delete_memo(uid)
            .then(() => {
              Toast({
                message: "已删除"
              });
            })
            .catch(e => {
              Toast({
                message: "删除失败，请重试"
              });
            });
          this.$router.push({ path: "/" });
        },
        () => {
          console.log("取消");
        }
      );
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 0.1875rem;
  margin-bottom: 0.1875rem;
}
.title {
  text-align: center;
  margin: 0.1875rem 0;
}
.timestamp {
  color: #a9a9a9;
  font-size: 13px;
  text-align: right;
  margin-right: 0.3125rem;
  margin-bottom: 0.1875rem;
}
.content {
  height: 100%;
  text-indent: 0.8125rem;
  margin-bottom: 1.25rem;
}
.button-group button {
  margin-bottom: 0.0625rem;
}
</style>
