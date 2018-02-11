<template>
  <div>
    <mt-header class="header" :title="strTitle">
      <mt-button v-if="currentRouteName !== 'Index'" @click="handleBack" slot="left">
        <font-awesome-icon :icon="['fas','chevron-left']" />
      </mt-button>
      <mt-button @click="handleShowActionSheet" slot="right">
        <font-awesome-icon :icon="['fas','bars']" />
      </mt-button>
    </mt-header>
    <mt-actionsheet :actions="arrActions" v-model="isSheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapMutations } from "Vuex";
import { Toast } from "mint-ui";

import mutationType from "../store/mutation";

export default {
  name: "Header",
  data: function() {
    return {
      strTitle: "VUEMEMO",
      isSheetVisible: false,
      currentRouteName: this.$route.name,
      arrActions: [
        {
          name: "新建笔记",
          method: () => {
            this.$router.push({ path: "new" });
          }
        },
        {
          name: "删除全部笔记",
          method: () => {
            MessageBox.confirm("确定执行此操作?", "提示").then(
              () => {
                console.log("确认删除所有笔记");
                this.drop_memo();
                Toast({
                  message: "操作成功",
                  duration: 1000
                });
              },
              () => {
                console.log("取消");
              }
            );
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      drop_memo: mutationType.DROP_MEMO
    }),
    handleShowActionSheet(e) {
      this.isSheetVisible = true;
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCreate() {
      this.$router.push({ path: "/new" });
    }
  }
};
</script>

<style scoped>
.header {
  background: #fff;
  color: #26a2ff;
}
</style>
