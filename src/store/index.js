import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutationType from "./mutation";
import actionType from "./action";
import mutation from './mutation';
import util from "../utils";

// getters
import getters from '../store/getters'

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    type: ['工作', '学习', '生活'],
    displayType: true,
    sortByTimeType: true,
    memos: []
  },
  getters,
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
      // if (util.localStorage.getItem('memos').length) {
      state.memos = util.localStorage.getItem('memos');
      // }
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
