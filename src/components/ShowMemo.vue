<template>
  <div>
    <Header/>
    <div class="container">
      <h3 class="title">{{title}}</h3>
      <p class="timestamp">{{new Date(timestamp).toLocaleTimeString()}}</p>
      <p class="content">{{content}}</p>
    </div>
    <div class="button-group">
      <mt-button @click.native="handleModify" type="primary" plain size="large">修改</mt-button>
      <mt-button @click.native="handleDelete" type="danger" plain size="large">删除</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "Vuex";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";

import Header from "@/components/Header";

export default {
  name: "ShowMemo",
  components: {
    Header
  },
  data: function() {
    return {
      title: "loading...",
      timestamp: "loading...",
      content: "loading..."
    };
  },
  computed: {
    ...mapState({
      memos: "memos"
    })
  },
  methods: {
    ...mapActions({
      delete_memo: "DELETE_MEMO"
    }),
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
  },
  mounted: function() {
    let uid = this.$route.params.id;
    this.memos.forEach((elem, index) => {
      let item = [];
      if (uid === elem.uid) {
        item = this.memos[index];
        // render
        [this.title, this.content, this.timestamp] = [
          item.title,
          item.content,
          item.timestamp
        ];
      }
    });
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
  margin-bottom: 3.125rem;
}
.button-group {
  background: #fff;
  opacity: 0.9;
  bottom: 0;
  position: fixed;
  width: 100%;
}
.button-group button {
  margin-bottom: 0.0625rem;
}
</style>
