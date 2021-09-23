<template>
  <page-content>
    <template slot="page-title">
      Mapbox Local demo
    </template>
    <template slot="header-right-extra">
      <el-link href="https://www.mapbox.com/" target="_blank">官网</el-link>
    </template>
    <template slot="main-right">
      <div class="mapbox" ref="mapboxLocal"></div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import { PdMapboxLocal } from '@plantdata/mapbox-local'

export default {
  name: 'TheMapboxLocalDemo',
  components: {
    PageContent
  },
  mixins: [],
  data () {
    return {
      mapLocal: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initMap()
    },
    initMap () {
      // 'http://127.0.0.1/mapbox/style/satellite/style.json'
      // 'http://127.0.0.1/mapbox/style/dark/style.json'
      const query = this.$route.query || {}
      const style = query.style || 'http://127.0.0.1/mapbox/style/dark/style.json'
      this.mapLocal = new PdMapboxLocal({
        container: this.$refs.mapboxLocal, // container ID
        style, // style URL
        center: [121, 31], // starting position [lng, lat]
        zoom: 7
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

.mapbox {
  height: 100%;
  overflow: hidden
}
</style>
