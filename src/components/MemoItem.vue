<template>
  <div>
    <div class="memos" :key="item.uid" v-for="(item, index) of memos">
      <h3>{{item.title}}</h3>
      <p>{{item.content}}</p>
      <p>日期：{{new Date(item.timestamp).toLocaleTimeString()}}</p>
      <p>是否完成：{{item.completed}}</p>
      <p>uid: {{item.uid}}</p>
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
