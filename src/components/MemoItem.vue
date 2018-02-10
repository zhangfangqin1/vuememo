<template>
  <div>
    <div class="memos" :key="item.uid" v-for="item of memos">
      <h3 @click="handleComplete(item)">
        {{item.title}}
        <transition name="slide-fade" mode="out-in">
          <font-awesome-icon class="check" v-if="item.completed === true" key="checked" :icon="['fas','check-circle']" />
          <font-awesome-icon class="check" v-if="item.completed === false" key="notChecked" :icon="['fas','circle']" />
        </transition>
      </h3>
      <p @click="handleClick(item.uid)">{{item.content}}</p>
      <p>日期：{{new Date(item.timestamp).toLocaleTimeString()}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import mutationType from "../store/mutation";
import { Toast } from "mint-ui";

export default {
  name: "MemoItem",
  computed: {
    ...mapState({
      memos: "memos"
    })
  },
  methods: {
    ...mapMutations({
      check_memo: mutationType.CHECK_MEMO
    }),
    handleClick(uid) {
      this.$router.push({ path: "/" + uid });
    },
    handleComplete(item) {
      this.check_memo(item.uid);
      Toast({
        message: `标记${item.completed ? "完成" : "未完成"}`
      });
    }
  }
};
</script>

<style scoped>
.memos {
  margin: 3px;
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 3px;
}
.memos h3 {
  margin-bottom: 10px;
}
.check {
  float: right;
  color: #26a2ff;
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
