<template>
  <div id="app" :class="'page-name-' + $route.name" v-if="inited">
    <router-view/>
  </div>
</template>

<script>

import config from '@/mixins/config'

export default {
  name: 'App',
  components: {},
  mixins: [config]
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables-custom";

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  min-width: $page-min-width;
  overflow: auto;
  font-size: $--font-size-base;
  color: $--color-text-regular;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}
</style>
