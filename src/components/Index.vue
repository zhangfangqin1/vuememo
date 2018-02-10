<template>
  <div>
    <Header/>
    <mt-cell v-show="msg.length" title="通知" :value="msg"></mt-cell>
    <div id="memos">
      <MemoItem></MemoItem>
    </div>
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
    })
  }
};
</script>