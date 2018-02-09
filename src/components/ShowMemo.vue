<template>
  <div>
    <Header/>
    <div class="container">
      <h3 class="title">{{title}}</h3>
      <p class="timestamp">{{new Date(timestamp).toLocaleTimeString()}}</p>
      <p class="content">{{content}}</p>
    </div>
    <div class="button-group">
      <mt-button type="primary" size="large">修改</mt-button>
      <mt-button @click.native="handleDelete" type="danger" size="large">删除</mt-button>
      <mt-button @click.native="handleBack" type="default" size="large">返回主页</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import mutationType from "../store/mutation";
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
    ...mapMutations({
      delete_memo: "DELETE_MEMO"
    }),
    handleBack(e) {
      this.$router.push({ path: "/" });
    },
    handleDelete() {
      let uid = this.$route.params.id;
      MessageBox.confirm("确定删除此笔记？", "提示").then(
        () => {
          console.log("确认删除笔记");
          this.delete_memo(uid);
          this.$router.push({ path: "/" });
          Toast({
            message: "已删除"
          });
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
  margin: 0 3px;
  margin-bottom: 5%;
}
.title {
  text-align: center;
  margin: 3% 0;
}
.timestamp {
  color: #a9a9a9;
  font-size: 14px;
  text-align: right;
  margin-right: 10%;
  margin-bottom: 3%;
}
.content {
  height: 100%;
  text-indent: 2rem;
  margin-bottom: 6%;
}
.button-group {
  bottom: 0;
  position: absolute;
  width: 100%;
}
</style>
