<template>
  <div>
    <mt-header :title="strTitle">
      <mt-button @click="handleShowActionSheet" icon="more" slot="right"></mt-button>
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
      strTitle: "vuememo",
      isSheetVisible: false,
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
    }
  }
};
</script>
