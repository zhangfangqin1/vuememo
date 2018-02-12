<template>
  <div>
    <Header/>
    <mt-cell v-show="msg.length" title="通知" :value="msg"></mt-cell>
    <div id="memos">
      <MemoItem v-if="sortByTimeType" :memosData="ascByTimeMemo"></MemoItem>
      <MemoItem v-if="!sortByTimeType" :memosData="descByTimeMemo"></MemoItem>
    </div>
    <Tabbar @handleShowAll="handleShowAll" @handleShowComplete="handleShowComplete" @handleShowIncomplete="handleShowIncomplete" />
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import mutationType from "../store/mutation";
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import MemoItem from "@/components/MemoItem";

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
        return this.$store.state.memos;
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
    ascByTimeMemo: {
      get: function() {
        let arr = this.currentData;
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].timestamp < arr[j].timestamp) {
              let temp = arr[j];
              arr[j] = arr[i];
              arr[i] = temp;
            }
          }
        }
        arr = arr.map(item => item);
        return arr;
      }
    },
    descByTimeMemo: {
      get: function() {
        let arr = this.currentData;
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].timestamp > arr[j].timestamp) {
              let temp = arr[j];
              arr[j] = arr[i];
              arr[i] = temp;
            }
          }
        }
        arr = arr.map(item => item);
        return arr;
      }
    }
  },
  methods: {
    ...mapMutations({
      set_demotitle: mutationType.SET_DEMOTITLE,
      add_memo: mutationType.ADD_MEMO
    }),
    handleShowAll() {
      this.currentData = this.allMemo;
    },
    handleShowComplete() {
      this.currentData = this.completedMemo;
    },
    handleShowIncomplete() {
      this.currentData = this.incompleteMemo;
    }
  }
};
</script>

<style scoped>
.new-memo {
  position: fixed;
  right: 10%;
  bottom: 5%;
  font-size: 64px;
  color: #26a2ff;
}
</style>
