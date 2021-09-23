<template>
  <page-content>
    <template slot="page-title">
      列表模板
    </template>
    <template :slot="slotFilter">
      <filter-item label="名称">
        <el-input
          placeholder="请输入关键词查询"
          :size="$config.element.form.size"
          @keyup.enter.native="search"
          clearable
          @clear="search"
          v-model="query.kw">
        </el-input>
      </filter-item>
    </template>
    <template :slot="slotToolbar">
      <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
    </template>
    <template slot="main-table" slot-scope="{height}">
      <el-table
        :data="tableData.data"
        :height="height"
        class="main-table"
        v-loading="tableData.loading">
        <el-table-column
          label="序号"
          type="index"
          width="70">
        </el-table-column>
        <el-table-column
          prop="title"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="180"
          label="创建时间">
          <template slot-scope="{row}">
            <span v-date-format>{{ row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          width="180"
          label="修改时间">
          <template slot-scope="{row}">
            <span v-date-format="{time: parseInt(row.updateTime)}"></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          width="180"
          label="操作">
          <template slot-scope="{row}">
            <el-link
              type="primary"
              @click="handleEdit(row)">
              编辑
            </el-link>
            <el-link
              type="danger"
              @click="handleDelete(row)">
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <force-confirm-dialog
        @success="handleDeleteConfirm"
        ref="delete">
      </force-confirm-dialog>
    </template>
    <template :slot="slotPagination">
      <el-pagination
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        :page-size="query.pageSize"
        :current-page.sync="query.pageNo"
        :total="tableData.total">
      </el-pagination>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import ForceConfirmDialog from '@/components/ForceConfirmDialog'
import { getUser } from '@/utils/user'
import TablePageMixin from '@/mixins/table-page'
import SlotMixin from '@/mixins/slot'
import FilterItem from '@/components/FilterItem'

export default {
  name: 'TheListDemo',
  components: {
    FilterItem,
    PageContent,
    ForceConfirmDialog
  },
  mixins: [TablePageMixin, SlotMixin],
  data () {
    return {
    }
  },
  computed: {
    userId () {
      return getUser()?.id
    }
  },
  methods: {
    getTableData (pageNo = this.query.pageNo) {
      this.query.pageNo = pageNo
      this.tableData.loading = true
      this.tableData.total = 0
      this.tableData.data = []
      return new Promise(resolve => {
        setTimeout(() => {
          this.tableData.total = this.query.pageSize * 100
          for (let i = 0; i < this.query.pageSize; i++) {
            this.tableData.data.push({
              id: i + 1,
              title: '表格数据' + (i + 1),
              createTime: '2011-10-01',
              updateTime: new Date().getTime().toString()
            })
          }
          this.tableData.loading = false
          resolve()
        }, 300)
      })
    },
    handleDelete (row) {
      this.tableData.editData = row
      this.$refs.delete.open(row.title)
    },
    handleAdd () {
      this.$message.success('点击添加')
    },
    handleEdit (row) {
      this.$message.success('点击编辑', row.title)
    },
    handleDeleteConfirm () {
      return new Promise(resolve => {
        setTimeout(() => {
          this.deleteResultHandler()
          resolve()
        }, 300)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

.main-table {
  ::v-deep em {
    font-style: normal;
    color: $--color-danger;
  }
}
</style>
