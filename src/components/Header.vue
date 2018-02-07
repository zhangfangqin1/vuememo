<template>
  <div>
    <mt-header :title="strTitle">
      <mt-button @click="handleShowActionSheet" icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-actionsheet :actions="arrActions" v-model="isSheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      strTitle: "vuememo",
      isSheetVisible: false,
      arrActions: [
        {
          name: "新建笔记",
          method: () => {}
        }
      ]
    };
  },
  methods: {
    handleShowActionSheet(e) {
      this.isSheetVisible = true;
    }
  }
};
</script>
