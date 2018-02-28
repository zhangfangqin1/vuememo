<template>
  <div>
    <mt-header class="header" :title="appTitle" @click="handleGoHome">
      <mt-button v-if="currentComponentName !== 'Index'" @click="handleBack" slot="left">
        <font-awesome-icon :icon="iconChevronLeft" />
      </mt-button>
      <mt-button v-if="currentComponentName === 'Index'" @click="handleShowActionSheet" slot="right">
        <font-awesome-icon :icon="iconBars" />
      </mt-button>
    </mt-header>
    <mt-actionsheet :actions="menu" v-model="isMenuVisible"></mt-actionsheet>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapMutations, mapActions } from "Vuex";
import { Toast } from "mint-ui";

import mutationType from "../store/mutation";
import actionType from "../store/action";
import util from '../utils/index';

// icon
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import bars from "@fortawesome/fontawesome-free-solid/faBars";
import chevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";

export default {
  name: "Header",
  components: {
    FontAwesomeIcon
  },
  data: function() {
    return {
      isMenuVisible: false,
      menu: [
        {
          name: "新建笔记",
          method: () => {
            this.$router.push({ path: "new" });
          }
        },
        // {
        //   name: "导出全部笔记",
        //   method: () => {
        //     let allMemos = JSON.stringify(this.$store.state.memos);
        //     // TBD
        //   }
        // },
        {
          name: "删除全部笔记",
          method: () => {
            MessageBox.confirm("确定执行此操作?", "提示").then(
              () => {
                console.log("确认删除所有笔记");
                this.drop_memo()
                  .then(() => {
                    Toast({
                      message: "操作成功"
                    });
                  })
                  .catch(e => {
                    Toast({
                      message: "操作失败，请重试"
                    });
                    console.log(e);
                  });
              },
              () => {
                console.log("取消");
              }
            );
          }
        },
        {
          name: "切换显示模式",
          method: () => {
            this.switch_display();
          }
        },
        {
          name: "按时间排序⇩⇧",
          method: () => {
            this.switch_by_time();
          }
        },
        {
          name: "重置数据",
          method: () => {
            window.localStorage.removeItem('memos');
            window.location.reload();
          }
        },
        {
          name: "导出全部数据",
          method: () => {
            util.downloadJSONFile();
          }
        }
      ]
    };
  },
  computed: {
    iconBars() {
      return bars;
    },
    iconChevronLeft() {
      return chevronLeft;
    },
    appTitle: {
      get: function() {
        return "VUEMEMO";
      }
    },
    currentComponentName: function() {
      return this.$route.name;
    }
  },
  methods: {
    ...mapMutations({
      switch_display: mutationType.SWITCH_DISPLAY,
      switch_by_time: mutationType.SWITCH_BY_TIME
    }),
    ...mapActions({
      drop_memo: actionType.DROP_MEMO,
      sync_memo: actionType.SYNC_MEMO
    }),
    handleSync(e) {
      this.sync_memo();
    },
    handleShowActionSheet(e) {
      this.isMenuVisible = true;
    },
    handleGoHome() {
      this.$router.push({ path: "/" });
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCreate() {
      this.$router.push({ path: "/new" });
    }
  },
  mounted: function() {
    window.document.title = this.appTitle;
  }
};
</script>

<style scoped>
.header {
  background: #fff;
  color: #26a2ff;
  border-bottom: 0.0625rem solid #eee; /* 1/16 */
  overflow: hidden;
}
</style>
