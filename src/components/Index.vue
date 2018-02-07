<template>
  <div>
    <Header/>
    <p>{{ msg }}</p>
    <input type="text" @change="handleChangeTitle" placeholder="click here to change app title">
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { mapMutations } from "Vuex";
import mutationType from "../store/mutation";
import Header from "@/components/Header";

export default {
  name: "Index",
  components: {
    Header
  },
  computed: {
    ...mapState({
      msg: "msg"
    })
  },
  methods: {
    ...mapMutations({
      set_demotitle: mutationType.SET_DEMOTITLE
    }),
    handleChangeTitle(e) {
      this.set_demotitle(e.target.value);
    }
  }
};
</script>

<style>
input {
  width: 100%;
}
</style>
