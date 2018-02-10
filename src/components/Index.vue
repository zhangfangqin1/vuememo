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
      memos: "memos"
    }),
    incomplete: function() {
      return this.memos.filter(item => {
        return item.completed === false;
      });
    },
    completed: function() {
      return this.memos.filter(item => {
        return item.completed === true;
      });
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
      this.currentData = this.completed;
    },
    handleShowIncomplete() {
      this.currentData = this.incomplete;
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
