<template>
  <page-content>
    <template slot="page-title">
      Quill demo
    </template>
    <template slot="header-right-extra">
      <el-link href="https://quilljs.com/" target="_blank">官网</el-link>
    </template>
    <template slot="main-right">
      <quill-editor
        ref="quill"
        class="quill-editor"
        v-model="text"
        :options="editorOptions">
      </quill-editor>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'TheQuillDemo',
  components: {
    PageContent,
    quillEditor
  },
  mixins: [],
  data () {
    return {
      editorOptions: {},
      text: '实现图片上传功能请参考：<a href="https://www.npmjs.com/package/vue-quill-editor" target="_blank">https://www.npmjs.com/package/vue-quill-editor</a>'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom.scss";

.quill {
  height: 100%;
  overflow: hidden
}
</style>
