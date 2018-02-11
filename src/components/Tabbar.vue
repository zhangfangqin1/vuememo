<template>
  <div>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item @click.native="handleShowAll" id="全部">
        <font-awesome-icon class="icon" :icon="['far','list-alt']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleShowComplete" id="已完成">
        <font-awesome-icon class="icon" :icon="['far','check-circle']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleShowIncomplete" id="未完成">
        <font-awesome-icon class="icon" :icon="['far','circle']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleCreate" id="创建">
        <font-awesome-icon class="icon" :icon="['far','edit']" />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data: function() {
    return {
      selected: "全部"
    };
  },
  methods: {
    handleShowAll() {
      this.$emit("handleShowAll");
    },
    handleShowComplete() {
      this.$emit("handleShowComplete");
    },
    handleShowIncomplete() {
      this.$emit("handleShowIncomplete");
    },
    handleCreate() {
      this.$router.push({ path: "/new" });
    }
  }
};
</script>

<style scoped>
svg {
  font-size: 28px;
}
</style>
