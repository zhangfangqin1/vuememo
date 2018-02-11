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
</style>
