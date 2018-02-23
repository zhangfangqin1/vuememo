<template>
  <div>
    <!-- tabbar -->
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item @click.native="handleShow('all')" id="全部">
        <font-awesome-icon class="icon" :icon="iconListAlt" />
        <div class="tabbar-tag">全部</div>
      </mt-tab-item>
      <mt-tab-item @click.native="handleShow('completed')" id="已完成">
        <font-awesome-icon class="icon" :icon="iconCheckCircle" />
        <div class="tabbar-tag">已完成</div>
      </mt-tab-item>
      <mt-tab-item @click.native="handleShow('incomplete')" id="未完成">
        <font-awesome-icon class="icon" :icon="iconCircle" />
        <div class="tabbar-tag">未完成</div>
      </mt-tab-item>
      <mt-tab-item @click.native="handleShowPopup" id="类别">
        <font-awesome-icon class="icon" :icon="iconBookmark" />
        <div class="tabbar-tag">类别</div>
      </mt-tab-item>
      <mt-tab-item @click.native="handleShow('star')" id="收藏">
        <font-awesome-icon class="icon" :icon="iconStar" />
        <div class="tabbar-tag">收藏</div>
      </mt-tab-item>
      <mt-tab-item @click.native="handleCreate" id="创建">
        <font-awesome-icon class="icon" :icon="iconEdit" />
        <div class="tabbar-tag">创建</div>
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
// icon
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import iconListAlt from "@fortawesome/fontawesome-free-regular/faListAlt";
import iconCheckCircle from "@fortawesome/fontawesome-free-regular/faCheckCircle";
import iconCircle from "@fortawesome/fontawesome-free-regular/faCircle";
import iconBookmark from "@fortawesome/fontawesome-free-regular/faBookmark";
import iconStar from "@fortawesome/fontawesome-free-regular/faStar";
import iconEdit from "@fortawesome/fontawesome-free-regular/faEdit";

export default {
  name: "Tabbar",
  components: {
    FontAwesomeIcon
  },
  data: function() {
    return {
      selected: "全部",
      popupVisible: false
    };
  },
  computed: {
    iconListAlt: function() {
      return iconListAlt;
    },
    iconCheckCircle: function() {
      return iconCheckCircle;
    },
    iconCircle: function() {
      return iconCircle;
    },
    iconBookmark: function() {
      return iconBookmark;
    },
    iconStar: function() {
      return iconStar;
    },
    iconEdit: function() {
      return iconEdit;
    }
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

.tabbar-tag {
  margin-top: 4px;
  font-size: 12px;
}

svg {
  font-size: 28px;
}
</style>
