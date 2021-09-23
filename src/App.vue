<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  created () {
  }
}
</script>

<style lang="less">
// ndk 样式
@import "~@/assets/styles/graph";
</style>

<style lang="less">
// sdk 样式
@import "~@plantdata/sdk/src/index";
@import "~@zc/netchart/netchart";
</style>

<style lang="scss">
@import "~@/assets/styles/variables-custom";

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  min-width: $page-min-width;
  overflow: auto;
  color: $--color-text-regular;
  font-size: $--font-size-base;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*, *:after, *:before {
  box-sizing: border-box;
}
</style>
