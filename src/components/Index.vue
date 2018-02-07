<template>
  <div>
    <!-- 标题和工具栏 -->
    <Header/>
    <!--  -->
    <!-- <p>{{ msg }}</p> -->
    <input type="text" @change="handleChangeTitle" placeholder="click here to change app title">
    <!-- memos -->
    <div id="memos">
      <MemoItem></MemoItem>
    </div>
    <!--  -->
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import mutationType from "../store/mutation";
import Header from "@/components/Header";
import MemoItem from "@/components/MemoItem";

export default {
  name: "Index",
  components: {
    Header,
    MemoItem
  },
  computed: {
    ...mapState({
      msg: "msg"
    })
  },
  methods: {
    ...mapMutations({
      set_demotitle: mutationType.SET_DEMOTITLE,
      add_memo: mutationType.ADD_MEMO
    }),
    handleChangeTitle(e) {
      this.add_memo({
        categoryId: 0,
        title: "demo",
        content: "新增memo" + e.target.value,
        completed: false,
        timestamp: Date.now()
      });
    }
  }
};
</script>

<style>
input {
  width: 100%;
}
</style>
