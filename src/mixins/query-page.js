export default {
  data () {
    return {
      query: {
        default: {}
      }
    }
  },
  watch: {
    // 监听路由变化，解析url，生成query数据，并调用handleRouteChange（一般用来获取列表数据）
    $route: {
      immediate: true,
      handler () {
        const query = this.$route.query || {}
        const settings = this.query.default
        Object.keys(settings).forEach(k => {
          const isObject = settings[k] instanceof Object
          const v = query[isObject ? settings[k].map || k : k]
          const type = isObject ? settings[k].type || typeof settings[k].value : typeof settings[k]
          // eslint-disable-next-line valid-typeof
          let rv = (typeof v === 'string' || typeof v === type) ? v : isObject ? settings[k].value : settings[k]
          if (isObject && settings[k].transform) {
            rv = settings[k].transform(rv)
          } else {
            switch (type) {
              case 'number':
                rv = parseInt(rv)
                if (isNaN(rv)) {
                  rv = isObject ? settings[k].value : settings[k]
                }
                break
              case 'json':
                rv = rv && JSON.parse(rv)
                break
            }
          }
          this.$set(this.query, k, rv)
        })
        this.handleRouteChange()
      }
    }
  },
  methods: {
    handleRouteChange () {
    },
    // 刷新当前页
    refresh () {
      this.updatePageURL(true)
    },
    // 通过query数据生成新的url,并跳转
    updatePageURL (isReplace) {
      const settings = this.query.default
      const query = Object.assign({}, this.$route.query)
      query._t = new Date().getTime()
      Object.keys(this.query).forEach(k => {
        if (k !== 'default') {
          let key = k
          if (settings[k] instanceof Object) {
            key = settings[k].map || k
          }
          if (this.query[k] || this.query[k] === 0) {
            query[key] = this.query[k] instanceof Object ? JSON.stringify(this.query[k]) : this.query[k].toString()
          } else {
            delete query[key]
          }
        }
      })
      if (isReplace) {
        this.$router.replace({
          query
        })
      } else {
        this.$router.push({
          query
        })
      }
    }
  }
}
