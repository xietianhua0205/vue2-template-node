<template>
  <div class="ndk-graph-container" ref="graph">
  </div>
</template>

<script>
import * as _ from 'lodash'
import { PdLanguage } from '@plantdata/locale/src/language'
import containerZhCn from '@plantdata/container/src/locale/zh-cn'
import uiZhCn from '@plantdata/ui/src/locale/zh-cn'
import visZhCn from '@plantdata/vis/src/locale/zh-cn'
import zhCn from '@plantdata/ndk/src/locale/zh-cn'
import { PdSDKNetChart } from '@plantdata/ndk/src/net-chart/net-chart'

PdLanguage.setLanguage(containerZhCn)
PdLanguage.setLanguage(uiZhCn)
PdLanguage.setLanguage(visZhCn)
PdLanguage.setLanguage(zhCn)

export default {
  name: 'NDKPreview',
  props: {
    focusId: {
      type: Number
    },
    settings: {
      type: Object
    }
  },
  data () {
    return {
      graph: null
    }
  },
  computed: {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const settings = {
        selector: this.$refs.graph
      }
      this.graph = new PdSDKNetChart(_.merge(true, settings, this.settings))
      this.graph.on('inited', () => {
        this.$emit('inited', this.graph)
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables-custom.scss";

.ndk-graph-container.pd-container {
  background: transparent;

  .pd-water-masker {
    //display: none;
  }

  .pd-panel-main > .pd-tool-body > .pd-panel-tabs {
    border-top: 0;
  }
}
</style>
