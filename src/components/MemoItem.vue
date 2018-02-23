<template>
  <div>
    <div class="memos" :key="item.uid" v-for="item of memosData">
      <!-- 标记是否完成 -->
      <span @click="handleComplete(item)">
        <transition name="scale-fade" mode="out-in">
          <font-awesome-icon class="check" v-if="item.completed === true" key="checked" :icon="iconCheckCircle" />
          <font-awesome-icon class="not-check" v-if="item.completed === false" key="notChecked" :icon="iconCircle" />
        </transition>
      </span>
      <!--  -->
      <!-- 标题 -->
      <h3 @click="handleClick(item.uid)" class="title">
        {{item.title.length > 50 ? item.title.substr(0,50) + '...': item.title.substr(0,50)}}
      </h3>
      <!--  -->
      <!-- 内容 -->
      <transition name="slide-right" mode="out-in">
        <div v-if="displayType">
          <!-- 日期、分类、收藏 -->
          <div class="tag">
            <span class="tag-message">
              <font-awesome-icon style="color:black;opacity:0.4;" :icon="iconCalendarAlt" />
              <span>{{new Date(item.timestamp).toLocaleTimeString()}}</span>
            </span>
            <span class="tag-message">
              <font-awesome-icon style="color:red;opacity:0.4;" :icon="iconBookmark" />
              <span>{{memoType[item.categoryId]}}</span>
            </span>
            <span class="tag-message">
              <font-awesome-icon v-if="item.star" style="color:gold;opacity:0.4;" :icon="iconStar" />
            </span>
          </div>
          <!--  -->
          <!-- 文本 -->
          <p @click="handleClick(item.uid)">
            {{item.content.length > 100 ? item.content.substr(0,100) + '...': item.content.substr(0,100)}}
          </p>
          <!--  -->
        </div>
      </transition>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "Vuex";
import actionType from "../store/action";
import { Toast } from "mint-ui";

import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import iconCheckCircle from "@fortawesome/fontawesome-free-regular/faCheckCircle";
import iconCircle from "@fortawesome/fontawesome-free-regular/faCircle";
import iconCalendarAlt from "@fortawesome/fontawesome-free-solid/faCalendarAlt";
import iconBookmark from "@fortawesome/fontawesome-free-solid/faBookmark";
import iconStar from "@fortawesome/fontawesome-free-solid/faStar";

export default {
  name: "MemoItem",
  props: ["memosData"],
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapState({
      displayType: "displayType",
      memoType: "type"
    }),
    iconCheckCircle: function() {
      return iconCheckCircle;
    },
    iconCircle: function() {
      return iconCircle;
    },
    iconCalendarAlt: function() {
      return iconCalendarAlt;
    },
    iconBookmark: function() {
      return iconBookmark;
    },
    iconStar: function() {
      return iconStar;
    }
  },
  methods: {
    ...mapActions({
      check_memo: actionType.CHECK_MEMO
    }),
    handleClick(uid) {
      this.$router.push({ path: "/" + uid });
    },
    handleComplete(item) {
      this.check_memo(item.uid)
        .then(() => {
          Toast({
            message: `标记${item.completed ? "完成" : "待完成"}`
          });
        })
        .catch(e => {
          Toast({
            message: `标记失败，请重试`
          });
          console.log(e);
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
.tag {
  color: #999;
  font-size: 13px;
  margin: 0.125rem 0;
}
.tag .tag-message {
  margin-right: 0.3125rem;
}
.title {
  display: inline;
  font-size: 18px;
}

.check {
  color: #26a2ff;
  font-size: 18px;
}
.not-check {
  color: #888;
  font-size: 18px;
}
</style>
