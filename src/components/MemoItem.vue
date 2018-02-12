<template>
  <div>
    <div class="memos" :key="item.uid" v-for="item of memosData">
      <span @click="handleComplete(item)">
        <transition name="scale-fade" mode="out-in">
          <font-awesome-icon class="check" v-if="item.completed === true" key="checked" :icon="['far','check-circle']" />
          <font-awesome-icon class="not-check" v-if="item.completed === false" key="notChecked" :icon="['far','circle']" />
        </transition>
      </span>
      <h3 @click="handleClick(item.uid)" class="title">
        {{item.title.length > 50 ? item.title.substr(0,50) + '...': item.title.substr(0,50)}}
      </h3>
      <transition name="slide-right" mode="out-in">
        <div v-if="displayType">
          <div class="date">
            <font-awesome-icon :icon="['fas','calendar-alt']" />
            <span>{{new Date(item.timestamp).toLocaleTimeString()}}</span>
          </div>
          <p @click="handleClick(item.uid)">
            {{item.content.length > 100 ? item.content.substr(0,100) + '...': item.content.substr(0,100)}}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "Vuex";
import { mapState } from "Vuex";
import mutationType from "../store/mutation";
import { Toast } from "mint-ui";

export default {
  name: "MemoItem",
  props: ["memosData"],
  computed: {
    ...mapState({
      displayType: "displayType"
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
  margin: 0.1875rem 0;
  padding: 0.1875rem 0.3125rem;
  border-bottom: 0.0625rem solid #eee;
}

.memos:last-of-type {
  margin-bottom: 7.5rem;
}
.date {
  color: #999;
  font-size: 13px;
  margin-bottom: 0.3125rem;
}
.title {
  display: inline;
  font-size: 20px;
}

.check {
  color: #26a2ff;
  font-size: 20px;
}
.not-check {
  color: #888;
  font-size: 20px;
}
</style>
