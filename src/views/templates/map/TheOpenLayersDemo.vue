<template>
  <page-content>
    <template slot="page-title">
      OpenLayers demo
    </template>
    <template slot="header-right-extra">
      <el-link href="https://openlayers.org/" target="_blank">官网</el-link>
    </template>
    <template slot="main-right">
      <div class="open-layers" ref="ol"></div>
    </template>
  </page-content>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import { Tile } from 'ol/layer'
import { fromLonLat, toLonLat } from 'ol/proj'
import { XYZ } from 'ol/source'
import PageContent from '@/components/PageContent'
import OSM from 'ol/source/OSM'

export default {
  name: 'TheOpenLayersDemo',
  components: {
    PageContent
  },
  mixins: [],
  data () {
    return {
      map: null
    }
  },
  beforeDestroy () {
    if (this.map) {
      this.map.dispose()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initMap()
      // 以下非必须
      // this.addPick()
    },
    initTile () {
      const query = this.$route.query || {}
      const xyz = query.xyz
      if (xyz) {
        // 黑色主题： http://192.169.4.71/arcgis-zyx/{z}/{y}/{x}.png
        // 卫星图： http://192.169.4.71/bing/{z}/{x}/{y}.jpg
        // ...
        return new Tile({
          source: new XYZ({
            url: xyz
          })
        })
      }
      return new Tile({
        source: new OSM()
      })
    },
    initMap () {
      this.map = new Map({
        target: this.$refs.ol,
        view: new View({
          center: fromLonLat([121.24489490716717, 31.381854830828424]),
          zoom: 5,
          maxZoom: 20,
          minZoom: 3
        }),
        layers: [
          this.initTile()
        ]
      })
    },
    addPick () {
      this.map.on('dblclick', (evt) => {
        console.log('坐标', evt.coordinate)
        console.log('经纬度', toLonLat(evt.coordinate))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

.open-layers {
  height: 100%;
  overflow: hidden
}
</style>
