<template>
  <div>
    <Header/>
    <mt-radio title="笔记类型" v-model="memo_category_id" :options="this.$store.state.type">
    </mt-radio>
    <mt-field label="标题" placeholder="请输入标题" v-model="memo_title"></mt-field>
    <mt-field label="内容" placeholder="文本内容" type="textarea" rows="8" v-model="memo_content"></mt-field>
    <mt-button class="new-memo" @click.native="handleSubmitBtn" type="primary">确认提交</mt-button>
    <mt-button class="new-memo" @click.native="handleCancelBtn" type="danger">取消</mt-button>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import { Toast } from "mint-ui";

import mutationType from "../store/mutation";
import Header from "@/components/Header";

export default {
  name: "NewMemo",
  data: function() {
    return {
      memo_category_id: "",
      memo_title: "",
      memo_content: ""
    };
  },
  mounted() {
    this.memo_category_id = this.type[0];
  },
  computed: {
    ...mapState({
      type: "type"
    })
  },
  methods: {
    ...mapMutations({
      add_memo: mutationType.ADD_MEMO
    }),
    handleSubmitBtn(e) {
      this.add_memo({
        categoryId: this.$store.state.type.indexOf(this.memo_category_id),
        title: this.memo_title,
        content: this.memo_content,
        completed: false,
        timestamp: Date.now()
      });
      Toast({
        message: "发布成功",
        duration: 1000
      });
      this.$router.push({ path: "/" });
    },
    handleCancelBtn() {
      this.$router.push({ path: "/" });
    }
  },
  components: {
    Header
  }
};
</script>

<style>
textarea {
  resize: none;
}
button.new-memo {
  display: block;
  width: 100%;
  margin: 3px 0;
}
</style>
