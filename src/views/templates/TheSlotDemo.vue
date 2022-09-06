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
      </filter-item>
    </template>
    <template slot="main-top-right">
      <el-link type="primary" @click="refresh"><i class="ic-refresh"></i></el-link>
      <el-divider direction="vertical"/>
      <el-button type="danger" :disabled="!tableData.selection.length">批量删除</el-button>
    </template>
    <template #main-table="scope">
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
import tablePageMixin from '@/mixins/table-page'
import FilterItem from '@/components/FilterItem'

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
  mixins: [tablePageMixin],
  components: {
    FilterItem,
    PageContent
  },
  inject: ['currentMenuGet', 'currentMenuParentsGet'],
  data () {
    return {
      query: {
        default: {
          pageSize: {
            value: 10
          },
          customParams: {
            type: 'json',
            value: '[]',
            map: 'cp'
          }
        }
      },
      tableData: {
        inited: false // tablePageMixin 定义的参数，默认为true,会自动调用getTableData,若需要前置获取数据，可在此处覆盖为false,数据获取完成后置为true,手动调用getTableData
      }
    }
  },
  created () {
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
    getTableData () {
      this.tableData.data = []
      this.tableData.loading = true
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
