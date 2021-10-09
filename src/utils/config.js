const { configNsId, configBaseURL = '', APPName } = window.APP_CONFIG || {}

export function getConfig (axios) {
  return new Promise(resolve => {
    const nsId = configNsId
    if (nsId) {
      axios.get(configBaseURL + '/api/kg-search/index/' + nsId).then((d) => {
        const configIndex = d.find(d => d.name === 'config') // 索引别名必须是config
        if (configIndex) {
          axios.post(configBaseURL + '/api/kg-search/search/page', {
            limit: 999,
            nsId,
            skip: 1
          }).then(a => {
            const searchAPI = a.find(a => a.type === 2 && a.status === 1) // 必须有一个启用的全文检索功能
            if (searchAPI) {
              axios.post(configBaseURL + '/api/kg-search/search/', {
                apk: searchAPI.apk,
                from: 0,
                index: [configIndex.indexName],
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
