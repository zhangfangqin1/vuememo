<template>
  <div>
    <Header/>
    <div contenteditable="true"
      @click="handleClick"
      @blur="handleBlur"
      @keypress.enter="handleSearch"
    class="search">{{search}}</div>
    <div id="memos">
      <MemoItem v-if="this.showType === 'all'" :memosData="this.allMemo"></MemoItem>
      <MemoItem v-if="this.showType === 'completed'" :memosData="this.completedMemo"></MemoItem>
      <MemoItem v-if="this.showType === 'incomplete'" :memosData="this.incompleteMemo"></MemoItem>
      <MemoItem v-if="this.showType === 'search'" :memosData="this.searchMemo"></MemoItem>
      <MemoItem v-if="this.showType === 'star'" :memosData="this.starMemo"></MemoItem>
      <MemoItem v-if="this.showType === '工作'" :memosData="this.work"></MemoItem>
      <MemoItem v-if="this.showType === '学习'" :memosData="this.study"></MemoItem>
      <MemoItem v-if="this.showType === '生活'" :memosData="this.life"></MemoItem>
    </div>
    <Tabbar @handleShow="handleShow" />
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import { mapActions } from "Vuex";
import mutationType from "../store/mutation";
import actionType from "../store/action";

import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import MemoItem from "@/components/MemoItem";

import util from "../utils";

export default {
  name: "Index",
  components: {
    Header,
    MemoItem,
    Tabbar
  },
  data: function() {
    return {
      showType: "all",
      search: "关键词搜索",
      kw: ""
    };
  },
  computed: {
    ...mapState({
      msg: "msg",
      sortByTimeType: "sortByTimeType"
    }),
    allMemo: function() {
      return this.$store.getters.allMemos(this.sortByTimeType);
    },
    completedMemo: function() {
      return this.$store.getters.completedMemos(this.sortByTimeType);
    },
    incompleteMemo: function() {
      return this.$store.getters.incompleteMemos(this.sortByTimeType);
    },
    starMemo: function() {
      return this.$store.getters.starMemos(this.sortByTimeType);
    },
    searchMemo: function() {
      return this.$store.getters.search(this.kw);
    },
    // 类别
    work: function() {
      return this.$store.getters.work(this.sortByTimeType);
    },
    study: function() {
      return this.$store.getters.study(this.sortByTimeType);
    },
    life: function() {
      return this.$store.getters.life(this.sortByTimeType);
    }
  },
  methods: {
    ...mapActions({
      sync_memo: actionType.SYNC_MEMO
    }),
    ...mapMutations({
      add_memo: mutationType.ADD_MEMO
    }),
    handleClick(e) {
      e.preventDefault();
      e.target.style.color = "#000";
      e.target.innerHTML = "";
    },
    handleBlur(e) {
      e.preventDefault();
      e.target.style.color = "#ccc";
    },
    handleSearch(e) {
      e.preventDefault();
      e.target.style.color = "#000";
      this.kw = e.target.innerText;
      this.showType = "search"; // 搜索
    },
    handleShow(value) {
      this.showType = value;
    }
  },
  beforeMount() {
    if (!window.localStorage.memos) {
      //如果localstorage不存在 memos
      // 初始化 localStorage
      let testData = [
        {
          uid: "4053377u49mkbs",
          categoryId: 0,
          ifMarkdown: true,
          title: "谢谢关注 新增支持 MarkDown 格式",
          content:
            "## VUEMEMO DEMO\n\n> 项目只用于测试，基于 Vue.js 的简单记事本 SPA ，Mint-UI、Vue、VueRouter、Vuex，使用`localStorage`作为数据本地持久化，并支持使用Markdown格式笔记\n\n- 主要功能有增查改删笔记\n- 按条件过滤和排序笔记\n- 并支持文字和图片等形式的笔记\n\n项目只用于测试，此项目托管于 [GITHUB]（http://github.com/oliyg/vuememo），欢迎 star",
          completed: true,
          star: true,
          timestamp: 1518021987038,
          imgs: []
        },
        {
          uid: "4053377u49mkby",
          categoryId: 0,
          ifMarkdown: false,
          title: "原创时政微视频丨习近平寄语冰雪运动",
          content:
            "中国代表团将参加5个大项、12个分项、55个小项的比赛。这是中国参赛人数最多、参加项目最多的一届冬奥会。事实上，从申办冬奥开始，习近平总书记就一直对这一赛事格外关注，他曾在短短7个多月内5次对2022年北京冬奥会作出指示。央视新闻新媒体推出原创微视频《习近平寄语冰雪运动》，从索契到北京，梳理总书记对冰雪运动的深入理解及关注。",
          completed: true,
          star: true,
          timestamp: 1518021887038,
          imgs: []
        },
        {
          uid: "4053002oy0tdtd",
          categoryId: 1,
          ifMarkdown: false,
          title: "春运前10天铁路旅客近9000万人次 节前高峰来临",
          content:
            "中新网客户端北京2月11日电 2018年春运今天进入第11天。今天是农历腊月二十六，春节的脚步越来越近，节前客流高峰也已经来临。根据铁路部门的数据，春运开启以来，全国铁路发送旅客规模近9000万人次。针对客流高峰，各地多措并举，保障民众的平安回家路。",
          completed: false,
          star: false,
          timestamp: 1518021187038,
          imgs: []
        },
        {
          uid: "40875526chmnan",
          categoryId: 2,
          ifMarkdown: false,
          title: "歼-20开始列装我空军作战部队 歼-20列装作战部队有何重要意义？",
          content:
            "央视网消息：9日，中国空军发布重磅消息，中国自主研制的新一代隐身战斗机歼-20开始列装空军作战部队，向全面形成作战能力迈出重要一步，引发广泛关注，这其中的关键是列装的是“作战部队”。而去年9月28日，国防部新闻发言人吴谦的当时的说法是“歼-20飞机已经列装部队，试验试飞工作正在按计划顺利推进”，关键词是“试验试飞”。两相对比，可以明显看出歼-20装备部队的进程大大地推进了。",
          completed: false,
          star: false,
          timestamp: 1518020887038,
          imgs: []
        }
      ];

      util.localStorage.setItem("memos", testData);
      testData = null;
      this.sync_memo();
    } else {
      // 如果localstorage存在 memos
      if (JSON.parse(window.localStorage.memos).length) {
        this.sync_memo();
      }
    }
  }
};
</script>

<style>
.search {
  font-size: 16px;
  text-align: left;
  padding-left: 0.3125rem;
  padding-top: 0.1875rem;
  outline: none;
  color: #ccc;
}
</style>
