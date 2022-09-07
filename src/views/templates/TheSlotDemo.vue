<template>
  <page-content>
    <!--    <template slot="body">-->
    <!--      body (body)-->
    <!--    </template>-->
    <!--    <template slot="header">-->
    <!--      header (header)-->
    <!--    </template>-->
    <template slot="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item of currentMenuParentsGet()" :key="item.id">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <!--    <template slot="page-title">-->
    <!--      {{currentMenuGet().name}} (page-title)-->
    <!--    </template>-->
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
      <filter-item label="关键词">
        <el-input
          size="small"
          v-model="query.kw"
          @keyup.native.enter="search"
          clearable
          @clear="search"></el-input>
        <!-- TODO search方法是TablePageMixin中定义的,一般在参数发生变化时使用，会请求新参数的第一页数据-->
      </filter-item>
    </template>
    <template slot="main-top-right">
      <!-- TODO 此处演示，refresh方法是TablePageMixin中定义的,重新获取数据-->
      <el-link type="primary" @click="refresh"><i class="ic-refresh"></i></el-link>
      <el-divider direction="vertical"/>
      <el-button type="danger" :disabled="!tableData.selection.length">批量删除</el-button>
    </template>
    <template #main-table="scope">
      <!-- TODO handleSelectionChange方法是TablePageMixin中定义的,会把当前选中数据赋值给this.tableData.selection -->
      <el-table
        empty-text="table (main-table)"
        v-loading="tableData.loading"
        @selection-change="handleSelectionChange"
        :data="tableData.data"
        :height="scope.height">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="name">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--    <template slot="main-bottom">-->
    <!--      bottom (main-bottom)-->
    <!--    </template>-->
    <template slot="main-bottom-left">
      option (main-bottom-left)
    </template>
    <template slot="main-bottom-center">
      <!-- TODO 分页一般情况下直接复制这一段就好了，不用额外操作-->
      <el-pagination
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        :current-page.sync="query.pageNo"
        :page-size="query.pageSize"
        layout="prev, pager, next, total, sizes"
        :total="tableData.total"
      ></el-pagination>
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
import TablePageMixin from '@/mixins/table-page'
import FilterItem from '@/components/FilterItem'

// TODO 模拟的假数据
const remoteData = [
  {
    id: 1,
    name: 'a'
  },
  {
    id: 2,
    name: 'b'
  },
  {
    id: 3,
    name: 'c'
  },
  {
    id: 4,
    name: 'd'
  },
  {
    id: 5,
    name: 'e'
  },
  {
    id: 6,
    name: 'f'
  },
  {
    id: 7,
    name: 'g'
  },
  {
    id: 8,
    name: 'h'
  },
  {
    id: 9,
    name: 'i'
  },
  {
    id: 10,
    name: 'j'
  },
  {
    id: 11,
    name: 'k'
  }
]

export default {
  name: 'TheSlotDemo',
  mixins: [TablePageMixin],
  components: {
    FilterItem,
    PageContent
  },
  // ReactiveMenuMixin中提供的provide
  // currentMenuGet为当前选中的导航
  // currentMenuParentsGet为选中导航的链路，从src/menu.js中配置的第一层数据，到当前导航的祖、爷、父包括当前导航的数组，实际使用时可根据具体情况裁切
  // 其他provide可查看node_modules/@plantdata/reactive-menu-item/src/mixins/reactive-menu.js
  inject: ['currentMenuGet', 'currentMenuParentsGet'],
  data () {
    return {
      query: { // TablePageMixin中定义的参数，mixin中定义了pageSize、pageNo、kw,可覆盖或补充
        default: { // query中数据的定义，不会直接使用query.default
          pageSize: { // 自动生产query.pageSize
            value: 10 // 此处演示覆盖默认的值
          },
          customParams: { // 此处演示添加自定义的参数
            type: 'json', // 类型可选json、string、number
            value: '[]', // 默认值
            map: 'cp' // url中参数名的简写，非必填
          }
        }
      },
      tableData: { // TablePageMixin中定义的参数,具体可查看mixin
        // TablePageMixin 定义的参数，默认为true,会自动调用getTableData,
        // 此处演示若需要前置获取数据，可在此处覆盖为false,数据获取完成后置为true,手动调用getTableData
        // 前置获取数据指在获取列表数据前需要做额外的操作，例如先请求一个接口，根据接口的返回再请求列表
        inited: false
      }
    }
  },
  created () {
    // 此处演示前置获取数据的示例，若无前置获取数据需求，可忽略
    this.tableData.loading = true
    return new Promise((resolve) => {
      setTimeout(() => {
        // do something
        resolve()
      }, 3000)
    }).then(() => {
      this.tableData.inited = true
      return this.getTableData()
    }).finally(() => {
      this.tableData.loading = false
    })
  },
  methods: {
    // TablePageMixin中定义的会自动调用来获取列表数据的方法，必须实现此方法
    // 一般而言，query中的数据会作为此方法中请求的参数
    // 一般而言，此方法需要对this.tableData.data和this.tableData.total赋值
    // this.tableData.loading 为table的loading,推荐用上
    getTableData () {
      this.tableData.data = []
      this.tableData.loading = true
      console.log(this.query)
      return new Promise((resolve) => {
        setTimeout(() => {
          this.tableData.data = remoteData.filter(o => o.name.includes(this.query.kw)).slice((this.query.pageNo - 1) * this.query.pageSize, this.query.pageNo * this.query.pageSize)
          this.tableData.total = remoteData.length
          resolve()
        }, 1000)
      }).finally(() => {
        this.tableData.loading = false
      })
    },
    handleDelete (row) {
      this.$confirm(`此操作将永久删除${row.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remoteData.splice(remoteData.findIndex(d => d.id === row.id), 1)
        this.$message.success('删除成功')
        // 会判断是否需要加载前一页数据
        this.deleteResultHandler()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

</style>
