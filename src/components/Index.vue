<template>
  <div>
    <Header/>
    <div id="memos">
      <MemoItem v-if="sortByTimeType" :memosData="ascByTimeMemo"></MemoItem>
      <MemoItem v-if="!sortByTimeType" :memosData="descByTimeMemo"></MemoItem>
    </div>
    <Tabbar @handleShow="handleShow" />
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import mutationType from "../store/mutation";
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
      currentData: this.$store.state.memos
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
        return this.memos;
      }
    },
    completedMemo: {
      get: function() {
        return this.memos.filter(item => {
          return item.completed === true;
        });
      }
    },
    incompleteMemo: {
      get: function() {
        return this.memos.filter(item => {
          return item.completed === false;
        });
      }
    },
    starMemo: {
      get: function() {
        return this.memos.filter(item => {
          return item.star === true;
        });
      }
    },
    // 类别
    work: {
      get: function() {
        return this.memos.filter(item => {
          return item.categoryId === 0;
        });
      }
    },
    study: {
      get: function() {
        return this.memos.filter(item => {
          return item.categoryId === 1;
        });
      }
    },
    life: {
      get: function() {
        return this.memos.filter(item => {
          return item.categoryId === 2;
        });
      }
    },
    // 排序
    ascByTimeMemo: {
      get: function() {
        let arr = util.bubbleSort(this.currentData, "timestamp", "asc");
        arr = arr.map(item => item);
        return arr;
      }
    },
    descByTimeMemo: {
      get: function() {
        let arr = util.bubbleSort(this.currentData, "timestamp", "desc");
        arr = arr.map(item => item);
        return arr;
      }
    }
  },
  methods: {
    ...mapMutations({
      add_memo: mutationType.ADD_MEMO
    }),
    handleShow(value) {
      switch (value) {
        case "all":
          this.currentData = this.allMemo;
          break;
        case "completed":
          this.currentData = this.completedMemo;
          break;
        case "incomplete":
          this.currentData = this.incompleteMemo;
          break;
        case "star":
          this.currentData = this.starMemo;
          break;
        case "工作":
          this.currentData = this.work;
          break;
        case "学习":
          this.currentData = this.study;
          break;
        case "生活":
          this.currentData = this.life;
          break;
      }
    }
  }
};
</script>