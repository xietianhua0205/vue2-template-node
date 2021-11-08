import { ThemeUtils } from '@/utils/theme'

export default {
  data () {
    return {
      inited: false,
      interval: null
    }
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  created () {
    if (this.$config.configNsId) {
      this.getConfigFromKGSearch() // 不是必须的，没有加载配置也有默认配置
    } else {
      // 也可以从其他接口获取主题色, 或者直接初始化完成
      // readFromSomeWhere().then((color) => {
      //   this.updateThemeColor(color)
      // })
      this.inited = true
    }
  },
  methods: {
    getConfigFromKGSearch () {
      setTimeout(() => { // 等待axios
        this.getConfig().then((config) => {
          Object.assign(this.$config, config)
          this.updateThemeColor(this.$config.primaryColor)
        })
      }, 0)
    },
    updateThemeColor (color) {
      this.interval = setInterval(() => {
        ThemeUtils.updateThemeColors(color)
      }, 0)
      this.inited = true
    },
    getConfig () {
      const { configNsId, configBaseURL = '', APPName } = this.$config || {}
      return new Promise(resolve => {
        const nsId = configNsId
        if (nsId) {
          this.$axios.get(configBaseURL + '/api/kg-search/index/' + nsId).then((d) => {
            const configIndex = d.find(d => d.name === 'config') // 索引别名必须是config
            if (configIndex) {
              this.$axios.post(configBaseURL + '/api/kg-search/search/page', {
                limit: 999,
                nsId,
                skip: 1
              }).then(a => {
                const searchAPI = a.find(a => a.type === 2 && a.status === 1) // 必须有一个启用的全文检索功能
                if (searchAPI) {
                  this.$axios.post(configBaseURL + '/api/kg-search/search/', {
                    apk: searchAPI.apk,
                    from: 0,
                    index: [nsId + '-' + configIndex.name],
                    kw: '',
                    nsId,
                    size: 100,
                    queryFilter: [],
                    skipError: false
                  }).then(({ data }) => {
                    const item = data.result?.find(r => r.id === APPName) // 数据id必须和APPName相同
                    if (item) {
                      try {
                        const config = JSON.parse(item.config)
                        if (item.style) {
                          const styleTag = document.createElement('style')
                          styleTag.innerText = item.style
                          document.body.append(styleTag)
                        }
                        resolve(config)
                      } catch (e) {
                        console.error('配置解析失败')
                      }
                    }
                    resolve({})
                  })
                } else {
                  resolve({})
                }
              })
            } else {
              resolve({})
            }
          })
        } else {
          resolve({})
        }
      })
    }
  }
}
