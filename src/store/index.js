import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutationType from "./mutation";

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    msg: 'vuememo demo',
    memos: [{
      categoryId: 0,
      title: '异步逻辑都应该封装到 action 里面',
      content: '只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。',
      completed: false,
      timestamp: 1518021887038
    }, {
      categoryId: 1,
      title: '相关代码分割',
      content: '对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例',
      completed: false,
      timestamp: 1518021187038
    }, {
      categoryId: 2,
      title: 'VUEX',
      content: 'Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则',
      completed: false,
      timestamp: 1518020887038
    }]
  },
  mutations: {
    [mutationType.SET_DEMOTITLE](state, value) {
      state.msg = value;
    },
    [mutationType.ADD_MEMO](state, value) {
      state.memos.unshift(value);
    },
    [mutationType.DROP_MEMO](state, index) {
      state.memos = [];
    }
  }
});

export default store;