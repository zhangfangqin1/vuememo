<template>
  <transition>
    <div>
      <Header/>
      <div class="content">
        <mt-field ref="title" label="标题" placeholder="请输入标题" v-model="memo_title"></mt-field>
        <mt-field ref="content" label="内容" placeholder="文本内容" type="textarea" rows="20" v-model="memo_content"></mt-field>
        <mt-radio title="笔记类型" v-model="memo_category_id" :options="this.$store.state.type"></mt-radio>
      </div>
      <div class="button-group">
        <mt-button plain size="large" class="new-memo" @click.native="handleSubmitBtn" type="primary">确认提交</mt-button>
      </div>

    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "Vuex";
import { Toast } from "mint-ui";
import utils from "../utils";

import actionType from "../store/action";
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
      memo_content: "",
      memo_star: false,
    };
  },
  methods: {
    ...mapActions({
      modify_memo: actionType.MODIFY_MEMO
    }),
    handleSubmitBtn() {
      let uid = this.$route.params.id;
      this.modify_memo({
        uid,
        categoryId: this.$store.state.type.indexOf(this.memo_category_id),
        title: this.memo_title,
        content: this.memo_content,
        star: this.memo_star,
        timestamp: Date.now()
      })
        .then(() => { Toast({ message: `修改成功` }) })
        .catch(e => { Toast({ message: `修改失败，请重试` }) });
      this.$router.go(-1);
    }
  },
  mounted: function() {
    let uid = this.$route.params.id;
    // render
    this.$store.state.memos.forEach(elem => {
      if (elem.uid === uid) {
        [
          this.memo_category_id,
          this.memo_title,
          this.memo_content,
          this.memo_star
        ] = [
          this.$store.state.type[elem.categoryId],
          elem.title,
          elem.content,
          elem.star
        ];
      }
    });
    // 避免输入法挡住输入框
    {
      const titleInputer = this.$refs.title.$refs.input;
      const contentInputer = this.$refs.content.$refs.textarea;
      titleInputer.onfocus = utils.intoView;
      contentInputer.onfocus = utils.intoView;
      window.ontouchstart = () => {
        // 防止再次挡住
        titleInputer.blur();
        contentInputer.blur();
      };
    }
    
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
.new-memo {
  margin-bottom: 0.0625rem;
}
.content {
  margin-bottom: 3.125rem;
}
</style>
