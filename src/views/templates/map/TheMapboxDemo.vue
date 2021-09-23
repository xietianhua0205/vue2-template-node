<template>
  <page-content>
    <template slot="page-title">
      Mapbox demo
    </template>
    <template slot="header-right-extra">
      <el-link href="https://www.mapbox.com/" target="_blank">官网</el-link>
    </template>
    <template slot="main-right">
      <div class="mapbox" ref="mapbox"></div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import * as mapboxgl from 'mapbox-gl'

export default {
  name: 'TheMapboxDemo',
  components: {
    PageContent
  },
  mixins: [],
  data () {
    return {
      map: null
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
      mapboxgl.accessToken = 'pk.eyJ1IjoiamlhbmdydW4wMDIiLCJhIjoiY2tocHQza3h6MDB0MjJxbXR6c2QzZDVrZSJ9.PkNM-hkYusSgOmsU0HPVOw'
      const query = this.$route.query || {}
      const style = query.style || 'mapbox://styles/mapbox/streets-v11'
      mapboxgl.config.SESSION_PATH = '/map-sessions/v1' // 由于跟离线版本冲突，必须加上此代码，不同时存在在线地图和离线地图时可以忽略这两行代码
      mapboxgl.config.API_URL = 'https://api.mapbox.com' // 由于跟离线版本冲突，必须加上此代码，不同时存在在线地图和离线地图时可以忽略这两行代码
      this.map = new mapboxgl.Map({
        container: this.$refs.mapbox,
        style,
        center: [121, 31],
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
