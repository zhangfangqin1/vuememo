import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutationType from "./mutation";

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    msg: 'vuememo demo'
  },
  mutations: {
    [mutationType.SET_DEMOTITLE](state, value) {
      state.msg = value;
    }
  }
});

export default store;