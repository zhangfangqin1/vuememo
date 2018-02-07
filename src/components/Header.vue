<template>
  <div>
    <mt-header :title="strTitle">
      <mt-button @click="handleShowActionSheet" icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-actionsheet :actions="arrActions" v-model="isSheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import { mapMutations } from "Vuex";
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
          method: () => {}
        },
        {
          name: "删除全部笔记",
          method: this.drop_memo
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
