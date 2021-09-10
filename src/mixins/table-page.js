import QueryPageMixin from './query-page'

export default {
  mixins: [QueryPageMixin],
  data () {
    return {
      query: {
        default: {
          pageNo: {
            value: 1,
            type: 'number',
            map: 'p'
          },
          pageSize: {
            value: 10,
            type: 'number',
            map: 's'
          },
          kw: ''
        }
      },
      tableData: {
        selection: [],
        data: [],
        editData: null,
        loading: false,
        total: 0
      }
    }
  },
  methods: {
    deleteResultHandler () {
      this.$message.success('删除成功')
      if (this.data.length === 1 && this.page.pageNo > 1) {
        this.query.pageNo--
      }
      this.updatePageURL()
    },
    getTableData () {
      // TODO
    },
    goPage (page) {
      this.handlePageChange(page)
    },
    handlePageChange (val) {
      this.query.pageNo = val
      this.updatePageURL()
    },
    handleRouteChange () {
      this.getTableData()
    },
    handleSizeChange (val) {
      this.query.pageNo = 1
      this.query.pageSize = val
      this.updatePageURL()
    },
    handleSelectionChange (v) {
      this.selection = v.map(v => v.id)
    },
    handleDelete (row) {
      this.editData = row
      // TODO
    },
    search () {
      this.handlePageChange(1)
    }
  }
}
