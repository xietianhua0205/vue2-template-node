<template>
  <page-content>
    <template slot="page-title">
      Label demo
    </template>
    <template slot="header-right-extra">
    </template>
    <template slot="main-right">
      <div class="label" ref="label"></div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import { PdLabel } from '@plantdata/media-label/src/label'

export default {
  name: 'TheLabelDemo',
  components: {
    PageContent
  },
  mixins: [],
  data () {
    return {
      labelIns: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const container = this.$refs.label
      const query = this.$route.query || {}
      const defaultConfig = {
        image: 'http://192.168.1.33:8198/deploy/1.png'
      }
      const type = 'image'
      let key = 'label'
      const width = parseInt(getComputedStyle(container, false).width)
      const height = parseInt(getComputedStyle(container, false).height)
      this.labelIns = new PdLabel({
        // autoActiveLabel: true,
        container,
        render: {
          width,
          height,
          align: 'center'
        },
        // tools: {
        //   link: false
        // },
        // toolsSettings: {
        // parallelogram: {
        //   forceRectangle: true
        // }
        // },
        type, // 'video' | 'image'
        onSave: (data) => {
          return new Promise((resolve) => {
            window.localStorage.setItem(key, JSON.stringify(data))
            this.$message.success('Save Successful')
            resolve()
          })
        },
        // labelList: ['person', 'cat', 'dog'],
        enableAppendLabel: true
        // videoBar: {
        //   saveSkip: true,
        //   skip: 3
        // },
        // pluginSettings: {
        // },
        // polygonRightClickCancel: true
      })
      this.labelIns.updateImage({
        url: () => {
          return query.image || defaultConfig.image
        },
        multiple: false
      }, 'center')
      this.labelIns.overview.updateImage(query.image || defaultConfig.image)
      key = 'image-label-' + this.labelIns.imageRender.settings.image.url()
      const label = window.localStorage.getItem(key)
      console.log(key, label)
      const labelJson = label ? JSON.parse(label) : []
      this.labelIns.setImageLabelData(labelJson)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom.scss";

.label {
  height: 100%;
  overflow: hidden;

  ::v-deep {
    .pd-label-list, .pd-label-data-list, .pd-label-list, .pd-label-data-list {
      .pdui-checkbox-group > .pdui-checkbox {
        height: 40px;
      }
    }
  }
}
</style>

<style lang="less">
@import '~@plantdata/media-label/src/index.less';

</style>
