<template>
  <page-content>
    <template slot="page-title">
      Cesium demo
    </template>
    <template slot="header-right-extra">
      <el-link href="https://cesium.com/" target="_blank">官网</el-link>
    </template>
    <template slot="main-right">
      <div class="cesium" ref="cesium"></div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import * as _ from 'lodash'

const Cesium = window.Cesium

export default {
  name: 'TheCesiumDemo',
  components: {
    PageContent
  },
  mixins: [],
  data () {
    return {
      map: null,
      defaultPosition: [121.24489490716717, 31.381854830828424, 10000]
    }
  },
  beforeDestroy () {
    if (this.map) {
      this.map.destroy()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initMap()
      // 以下非必要
      // this.showPosition()
    },
    initMap () {
      const query = this.$route.query || {}
      // 黑色主题： http://192.169.4.71/arcgis-zyx/{z}/{y}/{x}.png
      // 卫星图： http://192.169.4.71/bing/{z}/{x}/{y}.jpg
      // ...
      const imageryProvider = query.xyz && new Cesium.UrlTemplateImageryProvider({
        url: query.xyz
      })
      // 'http://192.169.4.71/terrain/'
      const terrainProvider = query.terrain && new Cesium.CesiumTerrainProvider({
        url: query.terrain,
        requestWaterMask: true,
        requestVertexNormals: true
      })
      this.map = new Cesium.Viewer(this.$refs.cesium, _.merge({
        contextOptions: {
          webgl: {
            alpha: true,
            depth: false,
            stencil: true,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: true
          },
          allowTextureFilterAnisotropic: true
        },
        // geocoder: false,
        // homeButton: false,
        // fullscreenButton: false,
        // timeline: false,
        // animation: false,
        // sceneModePicker: false,
        // infoBox: false,
        // navigationHelpButton: false,
        // baseLayerPicker: false,
        // selectionIndicator: false,
        // shadows: true,
        // shouldAnimate: false,
        // pickTranslucentDepth: true, // 无效
        imageryProvider,
        terrainProvider // 地形
      }))
      if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        this.map.resolutionScale = window.devicePixelRatio
      }
      const position = this.defaultPosition
      if (position && this.map.homeButton) {
        // 修改 home button默认行为
        this.map.homeButton.viewModel.command.beforeExecute.addEventListener((e) => {
          e.cancel = true
          this.map.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(...position)
          })
        })
      }
    },
    lookAt (position = this.defaultPosition, animate = false, bind = false) {
      const option = {
        destination: Cesium.Cartesian3.fromDegrees(...position),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0
        }
      }
      if (animate) {
        this.map.camera.flyTo(option)
      } else {
        this.map.camera.setView(option)
      }
      if (!bind) {
        this.map.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      }
    },
    resetOrientation () {
      this.map.camera.setView({
        orientation: {
          heading: Cesium.Math.toRadians(0.0)
        }
      })
    },
    showPosition () {
      const handler = new Cesium.ScreenSpaceEventHandler(this.map.scene.canvas)
      handler.setInputAction((movement) => {
        // const cartesian = viewer.camera.pickEllipsoid(
        //   movement.endPosition,
        //   viewer.scene.globe.ellipsoid
        // );
        const ray = this.map.camera.getPickRay(movement.endPosition)
        const cartesian = this.map.scene.globe.pick(ray, this.map.scene)
        if (cartesian) {
          const cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian)
          const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)
          const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)
          const height = cartographic.height.toFixed(2)
          const text = 'Lon: ' +
            ('   ' + longitudeString) +
            '\u00B0' +
            '\nLat: ' +
            ('   ' + latitudeString) +
            '\u00B0' +
            '\nHeight: ' +
            ('   ' + height) +
            'm'
          console.log(text)
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

.cesium {
  height: 100%;
  overflow: hidden
}
</style>
