import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutationType from "./mutation";
import actionType from "./action";
import mutation from './mutation';
import util from "../utils";

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    type: ['工作', '学习', '生活'],
    displayType: true,
    sortByTimeType: true,
    memos: [{
      uid: '4053377u49mkby',
      categoryId: 0,
      title: '原创时政微视频丨习近平寄语冰雪运动',
      content: '中国代表团将参加5个大项、12个分项、55个小项的比赛。这是中国参赛人数最多、参加项目最多的一届冬奥会。事实上，从申办冬奥开始，习近平总书记就一直对这一赛事格外关注，他曾在短短7个多月内5次对2022年北京冬奥会作出指示。央视新闻新媒体推出原创微视频《习近平寄语冰雪运动》，从索契到北京，梳理总书记对冰雪运动的深入理解及关注。',
      completed: true,
      star: true,
      timestamp: 1518021887038
    }, {
      uid: '4053002oy0tdtd',
      categoryId: 1,
      title: '春运前10天铁路旅客近9000万人次 节前高峰来临',
      content: '中新网客户端北京2月11日电 2018年春运今天进入第11天。今天是农历腊月二十六，春节的脚步越来越近，节前客流高峰也已经来临。根据铁路部门的数据，春运开启以来，全国铁路发送旅客规模近9000万人次。针对客流高峰，各地多措并举，保障民众的平安回家路。',
      completed: false,
      star: false,
      timestamp: 1518021187038
    }, {
      uid: '40875526chmnan',
      categoryId: 2,
      title: '歼-20开始列装我空军作战部队 歼-20列装作战部队有何重要意义？',
      content: '央视网消息：9日，中国空军发布重磅消息，中国自主研制的新一代隐身战斗机歼-20开始列装空军作战部队，向全面形成作战能力迈出重要一步，引发广泛关注，这其中的关键是列装的是“作战部队”。而去年9月28日，国防部新闻发言人吴谦的当时的说法是“歼-20飞机已经列装部队，试验试飞工作正在按计划顺利推进”，关键词是“试验试飞”。两相对比，可以明显看出歼-20装备部队的进程大大地推进了。',
      completed: false,
      star: false,
      timestamp: 1518020887038
    }]
  },
  actions: {
    [actionType.CHECK_MEMO]({
      commit
    }, uid) { // context
      return new Promise((response, reject) => {
        commit(mutationType.CHECK_MEMO, uid);
        response();
      });
    },
    [actionType.STAR_MEMO]({
      commit
    }, uid) { // context
      return new Promise((response, reject) => {
        commit(mutationType.STAR_MEMO, uid);
        response();
      });
    },
    [actionType.ADD_MEMO]({
      commit
    }, obj) { // context
      return new Promise((response, reject) => {
        commit(mutationType.ADD_MEMO, obj);
        response();
      });
    },
    [actionType.MODIFY_MEMO]({
      commit
    }, obj) {
      return new Promise((response, reject) => {
        commit(mutationType.MODIFY_MEMO, obj);
        response();
      });
    },
    [actionType.DELETE_MEMO]({
      commit
    }, uid) {
      return new Promise((response, reject) => {
        commit(mutationType.DELETE_MEMO, uid);
        response();
      });
    },
    [actionType.DROP_MEMO]({
      commit
    }) {
      return new Promise((response, reject) => {
        commit(mutationType.DROP_MEMO);
        response();
      });
    },
    [actionType.SYNC_MEMO]({
      commit
    }) {
      return new Promise((response, reject) => {
        commit(mutationType.SYNC_MEMO);
        response();
      });
    }
  },
  mutations: {
    [mutationType.ADD_MEMO](state, value) {
      state.memos.unshift(value);
      let currentLocalStorage = util.localStorage.getItem('memos');
      currentLocalStorage.unshift(value);
      util.localStorage.setItem('memos', currentLocalStorage);
    },
    [mutationType.MODIFY_MEMO](state, value) {
      let uid = value.uid;
      state.memos.forEach((elem, index) => {
        if (uid === elem.uid) {
          elem.categoryId = value.categoryId;
          elem.title = value.title;
          elem.content = value.content;
          elem.timestamp = value.timestamp;
        }
      });
      // 为了方便，直接同步了全部信息，考虑到性能不可这样写
      util.localStorage.setItem('memos', state.memos);
    },
    [mutationType.DROP_MEMO](state) {
      state.memos.splice(0, state.memos.length);
      util.localStorage.setItem('memos', []);
    },
    [mutationType.CHECK_MEMO](state, uid) {
      state.memos.forEach((elem, index) => {
        if (uid === elem.uid) {
          elem.completed = !elem.completed;
        }
      });
      util.localStorage.setItem('memos', state.memos);
    },
    [mutationType.STAR_MEMO](state, uid) {
      state.memos.forEach((elem, index) => {
        if (uid === elem.uid) {
          elem.star = !elem.star;
        }
      });
      util.localStorage.setItem('memos', state.memos);
    },
    [mutationType.DELETE_MEMO](state, uid) {
      state.memos.forEach((elem, index) => {
        if (uid === elem.uid) {
          state.memos.splice(index, 1);
        }
      });
      util.localStorage.setItem('memos', state.memos);
    },
    [mutationType.SYNC_MEMO](state) {
      state.memos = util.localStorage.getItem('memos');
    },
    [mutationType.SWITCH_DISPLAY](state) {
      this.state.displayType = !this.state.displayType;
    },
    [mutationType.SWITCH_BY_TIME](state) {
      this.state.sortByTimeType = !this.state.sortByTimeType;
    }
  }
});

export default store;
