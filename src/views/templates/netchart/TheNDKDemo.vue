<template>
  <page-content>
    <template slot="page-title">
      NDK demo (SDK与NDK样式存在冲突，使用时请手动在App.vue中注释一个)
    </template>
    <template slot="main-right">
      <n-d-k-preview ref="graph" @inited="handleInited" :settings="customSettings"></n-d-k-preview>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import { PdVisPluginNodeLegend } from '@plantdata/vis/src/plugin/legend/node-legend/node-legend'
import NDKPreview from '@/components/NDKPreview'

export default {
  name: 'TheNDKDemo',
  components: {
    NDKPreview,
    PageContent
  },
  mixins: [],
  data () {
    return {
      customSettings: {
        kgName: this.$config.kgName,
        showAllSchemaOptions: false,
        ajaxSettings: {
          baseUrl: '/api/kgsdk/v3/',
          headers: {
            APK: this.$config.APK
          }
        },
        initSettings: {
          ajaxSettings: {
            type: 'GET',
            urlPostfix: 'app/graphExplore/init/{kgName}',
            queryData: {
              type: 'graph'
            }
          }
        },
        loaderSettings: {
          ajaxSettings: {
            urlPostfix: 'app/graphExplore/common/{kgName}'
          }
        },
        pluginSettings: {
          nodeLegend: {
            side: 'bottom',
            async: false,
            constr: PdVisPluginNodeLegend
          }
        }
      }
    }
  },
  methods: {
    handleInited (graph) {
      graph.load({ id: 9 })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom.scss";

</style>
