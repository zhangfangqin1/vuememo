<template>
  <div>
    <div v-if="ifShowPreview">
      <Preview :doc="{
        title: this.memo_title,
        content: this.memo_content
      }" @handleClose="handleClosePreviewBtn" />
    </div>
    <div v-else>
      <Header/>
      <mt-radio ref="category_id" title="笔记类型" v-model="memo_category_id" :options="this.$store.state.type">
      </mt-radio>
      <mt-switch ref="markdown_switch" v-model="ifMarkdown" @change.native="handleMarkdownSwitch">
        {{ this.ifMarkdown === true ? '采用': '不采用' }} markdown 模式
      </mt-switch>
      <mt-field ref="title" label="标题" placeholder="请输入标题" v-model="memo_title"></mt-field>
      <mt-field ref="content" label="内容" placeholder="文本内容" type="textarea" rows="12" v-model="memo_content"></mt-field>
      <div class="button-group">
        <mt-button v-if="ifShowPreviewBtn" plain size="large" class="new-memo" @click.native="handlePreviewBtn" type="default">Markdown 预览</mt-button>
        <mt-button id="submitBtn" plain size="large" class="new-memo" @click.native="handleSubmitBtn" type="primary">确认提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "Vuex";
import { Toast, MessageBox } from "mint-ui";
import utils from "../utils";

import actionType from "../store/action";
import Header from "@/components/Header";
import Preview from "@/components/Preview";

export default {
  name: "NewMemo",
  components: {
    Header,
    Preview
  },
  data: function() {
    return {
      memo_category_id: "",
      memo_title: "",
      memo_content: "",
      titleInputer: null,
      contentInputer: null,
      ifShowPreview: false,
      ifShowPreviewBtn: false,
      ifMarkdown: false
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
    handleMarkdownSwitch(e){
      if (this.ifMarkdown) {
        this.ifShowPreviewBtn = true;
      } else {
        this.ifShowPreviewBtn = false;
      }
    },
    handlePreviewBtn(e) {
      this.ifShowPreview = true
    },
    handleClosePreviewBtn() {
      this.ifShowPreview = false
    },
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
        ifMarkdown: this.ifMarkdown,
        timestamp: Date.now()
      })
        .then(() => {
          Toast({
            message: "发布成功"
          });
          // 清空缓存应大于 auto save timeout
          let t = setTimeout(() => {
            window.localStorage.removeItem('tempMemo');
          }, 3000);
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
  beforeMount: function() {
    if (window.localStorage.tempMemo) {
      MessageBox.confirm('是否加载缓存笔记').then(action => {
        let tempMemo = utils.localStorage.getItem('tempMemo');
        this.memo_category_id = tempMemo.memo_category_id;
        this.memo_title = tempMemo.memo_title;
        this.memo_content = tempMemo.memo_content;
        this.ifShowPreviewBtn = tempMemo.ifShowPreviewBtn;
        this.ifMarkdown = tempMemo.ifMarkdown;
      }).catch(action => {
        window.localStorage.removeItem('tempMemo');
      });
    }
  },
  mounted: function() {
    let ctx = this;

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

    // auto save in 3s
    Object.values(this.$refs).forEach((ref) => {
      // input
      if (ref.$refs.input) {
        ref.$refs.input.onkeypress = utils.throttle(2000, () => {
          utils.localStorage.setItem('tempMemo', this.$data);
        });
      }
      // textarea
      if (ref.$refs.textarea) {
        ref.$refs.textarea.onkeypress = utils.throttle(2000, () => {
          utils.localStorage.setItem('tempMemo', this.$data);
        });
      }
      // others
      if (ref.$el.nodeName.toLowerCase() === 'div' || 'label') {
        ref.$el.onclick = utils.throttle(2000, () => {
          utils.localStorage.setItem('tempMemo', this.$data);
        });
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
  margin-bottom: 0.0625rem;
}
</style>
