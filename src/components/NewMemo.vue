<template>
  <div>
    <Header/>
    <mt-radio title="笔记类型" v-model="memo_category_id" :options="this.$store.state.type">
    </mt-radio>
    <mt-field label="标题" placeholder="请输入标题" v-model="memo_title"></mt-field>
    <mt-field label="内容" placeholder="文本内容" type="textarea" rows="12" v-model="memo_content"></mt-field>
    <div class="button-group">
      <mt-button plain size="large" class="new-memo" @click.native="handleSubmitBtn" type="primary">确认提交</mt-button>
      <mt-button plain size="large" class="new-memo" @click.native="handleCancelBtn" type="danger">取消</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import { Toast } from "mint-ui";
import utils from "../utils";

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
      if (this.memo_title.length === 0 || this.memo_content.length === 0) {
        Toast({
          message: '标题或内容不能为空',
          position: 'middle'
        });
        return false;
      }
      this.add_memo({
        uid: utils.uid(),
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
  height: 50%;
}
.new-memo {
  margin-bottom: 3px;
}
.button-group {
  bottom: 0;
  position: absolute;
  width: 100%;
}
</style>
