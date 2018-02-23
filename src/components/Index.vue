<template>
  <div>
    <Header/>
    <div id="memos">
      <MemoItem v-if="this.showType === 'all'" :memosData="this.allMemo"></MemoItem>
      <MemoItem v-if="this.showType === 'completed'" :memosData="this.completedMemo"></MemoItem>
      <MemoItem v-if="this.showType === 'incomplete'" :memosData="this.incompleteMemo"></MemoItem>
      <MemoItem v-if="this.showType === 'star'" :memosData="this.starMemo"></MemoItem>
      <MemoItem v-if="this.showType === '工作'" :memosData="this.work"></MemoItem>
      <MemoItem v-if="this.showType === '学习'" :memosData="this.study"></MemoItem>
      <MemoItem v-if="this.showType === '生活'" :memosData="this.life"></MemoItem>
    </div>
    <Tabbar @handleShow="handleShow" />
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import { mapActions } from "Vuex";
import mutationType from "../store/mutation";
import actionType from "../store/action";
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import MemoItem from "@/components/MemoItem";
import util from "../utils";

export default {
  name: "Index",
  components: {
    Header,
    MemoItem,
    Tabbar
  },
  data: function() {
    return {
      showType: "all"
    };
  },
  computed: {
    ...mapState({
      msg: "msg",
      memos: "memos",
      sortByTimeType: "sortByTimeType"
    }),
    allMemo: {
      get: function() {
        if (this.sortByTimeType) {
          return this.ascByTimeMemo;
        } else {
          return this.descByTimeMemo;
        }
      }
    },
    completedMemo: {
      get: function() {
        if (this.sortByTimeType) {
          return this.ascByTimeMemo.filter(item => {
            return item.completed === true;
          });
        } else {
          return this.descByTimeMemo.filter(item => {
            return item.completed === true;
          });
        }
      }
    },
    incompleteMemo: {
      get: function() {
        if (this.sortByTimeType) {
          return this.ascByTimeMemo.filter(item => {
            return item.completed === false;
          });
        } else {
          return this.descByTimeMemo.filter(item => {
            return item.completed === false;
          });
        }
      }
    },
    starMemo: {
      get: function() {
        if (this.sortByTimeType) {
          return this.ascByTimeMemo.filter(item => {
            return item.star === true;
          });
        } else {
          return this.descByTimeMemo.filter(item => {
            return item.star === true;
          });
        }
      }
    },
    // 类别
    work: {
      get: function() {
        if (this.sortByTimeType) {
          return this.ascByTimeMemo.filter(item => {
            return item.categoryId === 0;
          });
        } else {
          return this.descByTimeMemo.filter(item => {
            return item.categoryId === 0;
          });
        }
      }
    },
    study: {
      get: function() {
        if (this.sortByTimeType) {
          return this.ascByTimeMemo.filter(item => {
            return item.categoryId === 1;
          });
        } else {
          return this.descByTimeMemo.filter(item => {
            return item.categoryId === 1;
          });
        }
      }
    },
    life: {
      get: function() {
        if (this.sortByTimeType) {
          return this.ascByTimeMemo.filter(item => {
            return item.categoryId === 2;
          });
        } else {
          return this.descByTimeMemo.filter(item => {
            return item.categoryId === 2;
          });
        }
      }
    },
    // 排序
    ascByTimeMemo: {
      get: function() {
        let arr = util.bubbleSort(this.memos, "timestamp", "asc");
        arr = arr.map(item => item);
        return arr;
      }
    },
    descByTimeMemo: {
      get: function() {
        let arr = util.bubbleSort(this.memos, "timestamp", "desc");
        arr = arr.map(item => item);
        return arr;
      }
    }
  },
  methods: {
    ...mapActions({
      sync_memo: actionType.SYNC_MEMO
    }),
    ...mapMutations({
      add_memo: mutationType.ADD_MEMO
    }),
    handleShow(value) {
      this.showType = value;
    }
  },
  beforeMount() {
    if (JSON.parse(window.localStorage.memos).length) {
      this.sync_memo();
    }
  }
};
</script>