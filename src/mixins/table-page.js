import QueryPageMixin from './query-page'

export default {
  mixins: [QueryPageMixin],
  data () {
    return {
      query: { // query中的参数，
        default: { // 参数的定义，禁止直接使用this.query.default.xx，使用this.query.xx；转换的方法在QueryPageMixin中
          pageNo: {
            value: 1, // 默认值
            type: 'number', // 值类型 number,string,json
            map: 'p' // 参数缩写
          },
          pageSize: {
            value: 20,
            type: 'number',
            map: 's'
          },
          kw: '' // 简写，类型默认string
        }
      },
      tableData: {
        selection: [], // table中选中行的数据list,默认是id的数组
        data: [], // table中要展示的数据
        editData: null, // table中编辑的数据
        loading: false, // table 数据加载时的loading状态
        total: 0, // 列表全部数据条数
        inited: true // 是否已初始化，设为false,将不自动调用getTableData来获取列表数据
      }
    }
  },
  methods: {
    // 删除后的回调，将获取当前或前一页的数据
    deleteResultHandler (length = 1) {
      if (this.tableData.data.length === length && this.query.pageNo > 1) {
        this.query.pageNo--
      }
      this.updatePageURL()
    },
    // 获取table数据的方法，占位用，需要被覆写
    getTableData () {
      // TODO
    },
    // 跳转到指定页
    goPage (page) {
      this.handlePageChange(page)
    },
    // 页码发生变化时调用
    handlePageChange (val) {
      this.query.pageNo = val
      this.updatePageURL()
    },
    // 路由发生变化时调用
    handleRouteChange () {
      if (!this.tableData.inited) {
        return
      }
      this.getTableData()
    },
    // pageSize发生变化时调用
    handleSizeChange (val) {
      this.query.pageNo = 1
      this.query.pageSize = val
      this.updatePageURL()
    },
    // el-table @selection-change 时调用，默认记录id,可覆写
    handleSelectionChange (v) {
      this.tableData.selection = v.map(v => v.id)
    },
    handleDelete (row) {
      this.tableData.editData = row
      // TODO
    },
    // 筛选项发生变化时调用，会请求筛选后的第一页数据（前提是在getTableData方法中用了query的参数，筛选项绑定query的参数）
    search () {
      this.handlePageChange(1)
    },
    // 清空query的搜索
    resetSearch () {
      const query = Object.assign({}, this.$route.query)
      for (const key of Object.keys(this.query.default)) {
        delete query[key]
      }
      query._t = new Date().getTime()
      this.$router.push({
        query
      })
    }
  }
}
