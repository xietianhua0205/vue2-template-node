<template>
  <page-content>
    <!--    <template slot="body">-->
    <!--      body (body)-->
    <!--    </template>-->
    <!--    <template slot="header">-->
    <!--      header (header)-->
    <!--    </template>-->
<!--    <template slot="breadcrumb">-->
<!--      breadcrumb (breadcrumb)-->
<!--    </template>-->
    <template slot="page-title">
      title (page-title){{currentMenuGet().name}}
    </template>
    <template slot="header-extra">
      extra (header-extra)
    </template>
    <template slot="header-left">
      filter (header-left)
    </template>
    <template slot="header-center">
      article-title (header-center)
    </template>
    <template slot="header-right">
      toolbar (header-right)
    </template>
    <template slot="main-left">
      tree (main-left)
    </template>
    <!--    <template slot="main-right">-->
    <!--      main-right (main-right)-->
    <!--    </template>-->
<!--    <template slot="main-top">-->
<!--      top (main-top)-->
<!--    </template>-->
    <template slot="main-top-left">
      table-filter (main-top-left)
    </template>
    <template slot="main-top-right">
      table-tool (main-top-right)
    </template>
    <template #main-table="scope" >
      <el-table
        empty-text="table (main-table)"
        :height="scope.height"></el-table>
    </template>
<!--    <template slot="main-bottom">-->
<!--      bottom (main-bottom)-->
<!--    </template>-->
    <template slot="main-bottom-left">
      option (main-bottom-left)
    </template>
    <template slot="main-bottom-center">
      pagination (main-bottom-center)
    </template>
    <template slot="main-bottom-right">
      pagination (main-bottom-right)
    </template>
    <!--        <template slot="footer">-->
    <!--          footer (footer)-->
    <!--        </template>-->
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'

export default {
  name: 'TheSlotDemo',
  components: {
    PageContent
  },
  inject: ['currentMenuGet'],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

</style>
