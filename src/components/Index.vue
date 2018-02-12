<template>
  <div>
    <Header/>
    <mt-cell v-show="msg.length" title="通知" :value="msg"></mt-cell>
    <div id="memos">
      <MemoItem :memosData="currentData"></MemoItem>
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
    })
  },
  watch: {
    sortByTimeType: function(newValue, oldValue) {
      if (newValue) {
        this.handleAscByTime();
      } else {
        this.handleDescByTime();
      }
    }
  },
  methods: {
    ...mapMutations({
      set_demotitle: mutationType.SET_DEMOTITLE,
      add_memo: mutationType.ADD_MEMO
    }),
    handleShowAll() {
      this.currentData = this.$store.state.memos;
    },
    handleShowComplete() {
      this.currentData = this.memos.filter(item => {
        return item.completed === true;
      });
    },
    handleShowIncomplete() {
      this.currentData = this.memos.filter(item => {
        return item.completed === false;
      });
    },
    handleAscByTime() {
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
      this.currentData = arr;
    },
    handleDescByTime() {
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
      this.currentData = arr;
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
