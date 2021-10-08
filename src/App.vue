<template>
  <div id="app" :class="'page-name-' + $route.name" v-if="inited">
    <router-view/>
  </div>
</template>

<script>

import { ThemeUtils } from '@/utils/theme'
import { getConfig } from '@/utils/config'

export default {
  name: 'App',
  components: {},
  data () {
    return {
      inited: false,
      interval: null
    }
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  created () {
    if (this.$config.configNsId) {
      this.getConfigFromKGSearch() // 不是必须的，没有加载配置也有默认配置
    } else {
      // 也可以从其他接口获取主题色, 或者直接初始化完成
      // readFromSomeWhere().then((color) => {
      //   this.updateThemeColor(color)
      // })
      this.inited = true
    }
  },
  methods: {
    getConfigFromKGSearch () {
      setTimeout(() => { // 等待axios
        getConfig(this.$axios).then((config) => {
          Object.assign(this.$config, config)
          this.updateThemeColor(this.$config.primaryColor)
        })
      }, 0)
    },
    updateThemeColor (color) {
      this.interval = setInterval(() => {
        ThemeUtils.updateThemeColors(color)
      }, 0)
      this.inited = true
    }
  }
}
</script>

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
