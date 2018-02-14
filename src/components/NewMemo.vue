<template>
  <div>
    <Header/>
    <mt-radio title="笔记类型" v-model="memo_category_id" :options="this.$store.state.type">
    </mt-radio>
    <mt-field label="标题" placeholder="请输入标题" v-model="memo_title"></mt-field>
    <mt-field label="内容" placeholder="文本内容" type="textarea" rows="12" v-model="memo_content"></mt-field>
    <div class="button-group">
      <mt-button plain size="large" class="new-memo" @click.native="handleSubmitBtn" type="primary">确认提交</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "Vuex";
import { Toast } from "mint-ui";
import utils from "../utils";

import actionType from "../store/action";
import Header from "@/components/Header";

export default {
  name: "NewMemo",
  components: {
    Header
  },
  data: function() {
    return {
      memo_category_id: "",
      memo_title: "",
      memo_content: "",
      titleInputer: null,
      contentInputer: null
    };
  },
  computed: {
    ...mapState({
      type: "type"
    })
  },
  methods: {
    ...mapActions({
      add_memo: actionType.ADD_MEMO
    }),
    handleSubmitBtn(e) {
      if (this.memo_title.length === 0 || this.memo_content.length === 0) {
        Toast({
          message: "标题或内容不能为空",
          position: "middle"
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
      })
        .then(() => {
          Toast({
            message: "发布成功"
          });
        })
        .catch(e => {
          Toast({
            message: "发布失败，请重试"
          });
          console.log(e);
        });

      this.$router.push({ path: "/" });
    },
    handleCancelBtn() {
      this.$router.push({ path: "/" });
    }
  },
  mounted: function() {
    this.memo_category_id = this.type[0];
    // 避免输入法挡住输入框
    this.titleInputer = document.querySelector("input.mint-field-core");
    this.contentInputer = document.querySelector("textarea.mint-field-core");
    this.titleInputer.onfocus = e => {
      setTimeout(() => {
        this.titleInputer.scrollIntoView(true);
        this.titleInputer.scrollIntoViewIfNeeded();
      }, 300);
    };
    this.contentInputer.onfocus = e => {
      setTimeout(() => {
        this.contentInputer.scrollIntoView(true);
        this.contentInputer.scrollIntoViewIfNeeded();
      }, 300);
    };
    window.ontouchstart = () => {
      // 防止再次挡住
      this.titleInputer.blur();
      this.contentInputer.blur();
    };
  }
};
</script>

<style>
textarea {
  resize: none;
  height: 50%;
}
.new-memo {
  margin-bottom: 0.0625rem;
}
</style>
