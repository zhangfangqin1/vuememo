<template>
  <div>
    <div class="memos" :key="item.uid" v-for="item of memos" @click="handleClick(item.uid)">
      <h3>{{item.title}}</h3>
      <p>{{item.content}}</p>
      <p>日期：{{new Date(item.timestamp).toLocaleTimeString()}}</p>
      <p><i class="fas fa-check"></i>{{item.completed}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
export default {
  name: "MemoItem",
  computed: {
    ...mapState({
      memos: "memos"
    })
  },
  methods: {
    handleClick(uid) {
      this.$router.push({ path: "/" + uid });
    }
  }
};
</script>

<style scoped>
div.memos {
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 3px;
  padding: 5px;
}
</style>
