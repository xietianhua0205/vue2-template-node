<template>
  <page-content>
    <template slot="page-title">
      SDK demo (SDK与NDK样式存在冲突，使用时请手动在App.vue中注释一个)
    </template>
    <template slot="header-right-extra">
      <el-link href="https://plantdata-jr.github.io/plantdata-sdk-docs/index.html" target="_blank">文档</el-link>
      <el-link href="https://shimowendang.com/docs/VtV6v8GjrXCDkgvx/read" target="_blank">教程</el-link>
      <el-link href="https://www.bilibili.com/video/BV1Sv411K7KC?p=1" target="_blank">视频</el-link>
    </template>
    <template slot="main-right">
      <div class="sdk" ref="sdk"></div>
    </template>
  </page-content>
</template>

<script>
import { PdSDKDcGraph } from '@plantdata/sdk'
import PageContent from '@/components/PageContent'

export default {
  name: 'TheSDKDemo',
  components: {
    PageContent
  },
  mixins: [],
  data () {
    return {
      graph: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.graph = new PdSDKDcGraph({
        kgName: this.$config.kgName,
        selector: this.$refs.sdk,
        ajaxSettings: {
          baseUrl: '/plantdata-sdk/api/sdk/',
          headers: { APK: this.$config.APK }
        }
      })
      this.graph.load({
        id: 9
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

.el-link {
  margin-left: $gap-small;
}

.sdk {
  ::v-deep {
    .pd-panel-float-left {
      margin-top: 72px;
    }
    .pd-panel-float.pd-panel-float-bottom {
      margin-right: 0;
    }
  }
}
</style>
