<template>
  <div>
    <transition-group name="list" mode="in-out">
      <div class="memos" :key="item.uid" v-for="item of memosData">
        <h3 @click="handleComplete(item)">
          {{item.title.length > 50 ? item.title.substr(0,50) + '...': item.title.substr(0,50)}}
          <transition name="slide-fade" mode="out-in">
            <font-awesome-icon class="check" v-if="item.completed === true" key="checked" :icon="['fas','check']" />
            <font-awesome-icon class="not-check" v-if="item.completed === false" key="notChecked" :icon="['fas','check']" />
          </transition>
        </h3>
        <div class="date">
          <font-awesome-icon :icon="['fas','calendar-alt']" />
          <span>{{new Date(item.timestamp).toLocaleTimeString()}}</span>
        </div>
        <p @click="handleClick(item.uid)">
          {{item.content.length > 100 ? item.content.substr(0,100) + '...': item.content.substr(0,100)}}
        </p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapMutations } from "Vuex";
import mutationType from "../store/mutation";
import { Toast } from "mint-ui";

export default {
  name: "MemoItem",
  props: ["memosData"],
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
.memos p {
  text-indent: 2rem;
}
.memos:last-of-type {
  margin-bottom: 120px;
}
.date {
  color: #999;
  font-size: 13px;
  margin-bottom: 5px;
}

.check {
  float: right;
  color: #26a2ff;
  font-size: 36px;
}
.not-check {
  float: right;
  color: #26a2ff;
  opacity: 0.1;
  font-size: 36px;
}
/* 是否完成按钮动效 */
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
/* memo笔记动效 */
.list-enter-active {
  transition: all 1s;
}
.list-leave-active {
  transition: all .1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
