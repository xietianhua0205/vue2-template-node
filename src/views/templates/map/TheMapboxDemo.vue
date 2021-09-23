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
      this.map = new mapboxgl.Map({
        container: this.$refs.mapbox,
        style,
        center: [121, 31],
        zoom: 7
      })
      console.log(this.map)
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
