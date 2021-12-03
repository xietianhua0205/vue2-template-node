export default {
  data () {
    return {
      query: {
        default: {}
      }
    }
  },
  watch: {
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
          switch (type) {
            case 'number':
              rv = parseInt(rv)
              break
            case 'json':
              rv = rv && JSON.parse(rv)
              break
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
    refresh () {
      // this.getTableData()
      this.updatePageURL(true)
    },
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
          if (this.query[k]) {
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
