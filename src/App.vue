<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html,
body,
div,
p,
h1,
h2,
h3,
h4,
h5,
h6,
header {
  padding: 0;
  margin: 0;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #34495e;
  overflow-x: hidden;
  font-size: 16px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2c3e50;
}
/* 过渡动画 */
.component-fade-enter-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter {
  opacity: 0;
}
/* 是否完成按钮动效 */
.scale-fade-enter-active {
  transition: all 0.3s ease;
}
.scale-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.scale-fade-enter,
.scale-fade-leave-to {
  transform: scale(3);
  opacity: 0;
}
/* 切换显示模式 */
.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateX(1.875rem);
}
.slide-right-enter-to,
.slide-right-leave {
  opacity: 1;
  max-height: 18.75rem; /* 300/16 */
}
.slide-right-enter-active {
  transition: all 1s ease;
}
.slide-right-leave-active {
  transition: all 0.3s ease;
}
/* mintUI v-modal */
.v-modal {
  background: #fff;
  opacity: 0.9;
}
.mint-cell-label {
  font-size: 14px;
}
/* button-group */
.button-group {
  bottom: 0;
  position: relative;
  width: 100%;
  background: #fff;
  opacity: 0.9;
}
</style>
