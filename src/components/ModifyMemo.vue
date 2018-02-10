<template>
  <transition>
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
  </transition>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import { Toast } from "mint-ui";
import utils from "../utils";

import mutationType from "../store/mutation";
import Header from "@/components/Header";

export default {
  name: "ModifyMemo",
  components: {
    Header
  },
  data: function() {
    return {
      memo_category_id: "",
      memo_title: "",
      memo_content: ""
    };
  },
  methods: {
    ...mapMutations({
      modify_memo: mutationType.MODIFY_MEMO
    }),
    handleSubmitBtn() {
      let uid = this.$route.params.id;
      this.modify_memo({
        uid,
        categoryId: this.$store.state.type.indexOf(this.memo_category_id),
        title: this.memo_title,
        content: this.memo_content,
        timestamp: Date.now()
      });
      Toast({
        message: `修改成功`
      });
      this.$router.go(-1);
    },
    handleCancelBtn() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    let uid = this.$route.params.id;
    this.$store.state.memos.forEach(elem => {
      if (elem.uid === uid) {
        console.log(elem);
        // render
        [this.memo_category_id, this.memo_title, this.memo_content] = [
          this.$store.state.type[elem.categoryId],
          elem.title,
          elem.content
        ];
      }
    });
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
