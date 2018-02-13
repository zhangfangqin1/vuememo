<template>
  <div>
    <!-- tabbar -->
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item @click.native="handleShow('all')" id="全部">
        <font-awesome-icon class="icon" :icon="['far','list-alt']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleShow('completed')" id="已完成">
        <font-awesome-icon class="icon" :icon="['far','check-circle']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleShow('incomplete')" id="未完成">
        <font-awesome-icon class="icon" :icon="['far','circle']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleShowPopup" id="类别">
        <font-awesome-icon class="icon" :icon="['far','bookmark']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleShow('star')" id="收藏">
        <font-awesome-icon class="icon" :icon="['far','star']" />
      </mt-tab-item>
      <mt-tab-item @click.native="handleCreate" id="创建">
        <font-awesome-icon class="icon" :icon="['far','edit']" />
      </mt-tab-item>
    </mt-tabbar>
    <!-- 菜单 -->
    <mt-popup class="container" popup-transition="popup-fade" v-model="popupVisible" :closeOnClickModal="true" position="middle">
        <div class="main">
            <mt-cell :key="index" v-for="(item, index) of this.$store.state.type" @click.native="handleShow(item)" :title="item"></mt-cell>
        </div>
    </mt-popup>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data: function() {
    return {
      selected: "全部",
      popupVisible: false
    };
  },
  methods: {
    handleShow(value) {
      this.$emit("handleShow", value);
      this.popupVisible = false;
    },
    handleCreate() {
      this.$router.push({ path: "/new" });
    },
    handleShowPopup() {
      this.popupVisible = !this.popupVisible;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
}

svg {
  font-size: 28px;
}
</style>
