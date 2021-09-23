export default [
  {
    id: 1,
    pid: 0,
    name: '内容模板介绍',
    enable: true,
    checked: true,
    type: 'menu',
    order: 1,
    config: {
      isDefault: true,
      icon: 'ic-zsjm-gndy',
      boundary: true
    },
    children: [
      {
        id: 11,
        pid: 1,
        name: '模板插槽',
        enable: true,
        checked: true,
        type: 'menu',
        order: 1,
        config: {
          isDefault: true,
          icon: 'ic-system',
          route: {
            name: 'slot',
            params: [],
            query: []
          }
        }
      },
      {
        id: 12,
        pid: 1,
        name: '表格模板',
        enable: true,
        checked: true,
        type: 'menu',
        order: 2,
        config: {
          isDefault: false,
          icon: 'ic-table',
          route: {
            name: 'table',
            params: [],
            query: []
          }
        }
      },
      {
        id: 13,
        pid: 1,
        name: '图谱使用',
        enable: true,
        checked: true,
        type: 'menu',
        order: 3,
        config: {
          isDefault: false,
          icon: 'ic-bubble-chart'
        },
        children: [
          {
            id: 131,
            pid: 1,
            name: 'SPA',
            enable: true,
            checked: true,
            type: 'menu',
            order: 1,
            config: {
              isDefault: true,
              route: {
                name: 'spa',
                params: [],
                query: []
              }
            }
          },
          {
            id: 132,
            pid: 1,
            name: 'NDK',
            enable: true,
            checked: true,
            type: 'menu',
            order: 2,
            config: {
              isDefault: true,
              route: {
                name: 'ndk',
                params: [],
                query: []
              }
            }
          },
          {
            id: 133,
            pid: 1,
            name: 'NDK定制',
            enable: true,
            checked: true,
            type: 'menu',
            order: 3,
            config: {
              isDefault: true,
              route: {
                name: 'ndkCustom',
                params: [],
                query: []
              }
            }
          },
          {
            id: 134,
            pid: 1,
            name: 'SDK',
            enable: true,
            checked: true,
            type: 'menu',
            order: 3,
            config: {
              isDefault: true,
              route: {
                name: 'sdk',
                params: [],
                query: []
              }
            }
          }
        ]
      },
      {
        id: 14,
        pid: 1,
        name: '地图使用',
        enable: true,
        checked: true,
        type: 'menu',
        order: 4,
        config: {
          isDefault: false,
          icon: 'ic-map'
        },
        children: [
          {
            id: 141,
            pid: 1,
            name: 'OpenLayers',
            enable: true,
            checked: true,
            type: 'menu',
            order: 1,
            config: {
              isDefault: true,
              route: {
                name: 'ol',
                params: [],
                query: []
              }
            }
          },
          {
            id: 142,
            pid: 1,
            name: 'Cesium',
            enable: true,
            checked: true,
            type: 'menu',
            order: 2,
            config: {
              isDefault: true,
              route: {
                name: 'cesium',
                params: [],
                query: []
              }
            }
          },
          {
            id: 143,
            pid: 1,
            name: 'Mapbox',
            enable: true,
            checked: true,
            type: 'menu',
            order: 3,
            config: {
              isDefault: true,
              route: {
                name: 'mapbox',
                params: [],
                query: []
              }
            }
          },
          {
            id: 144,
            pid: 1,
            name: 'Mapbox Local',
            enable: true,
            checked: true,
            type: 'menu',
            order: 4,
            config: {
              isDefault: true,
              route: {
                name: 'mapboxLocal',
                params: [],
                query: []
              }
            }
          }
        ]
      },
      {
        id: 15,
        pid: 1,
        name: '富文本',
        enable: true,
        checked: true,
        type: 'menu',
        order: 5,
        config: {
          isDefault: false,
          icon: 'ic-edit'
        },
        children: [
          {
            id: 151,
            pid: 1,
            name: 'Quill',
            enable: true,
            checked: true,
            type: 'menu',
            order: 1,
            config: {
              isDefault: true,
              route: {
                name: 'quill',
                params: [],
                query: []
              }
            }
          }
        ]
      },
      {
        id: 16,
        pid: 1,
        name: '代码编辑器',
        enable: true,
        checked: true,
        type: 'menu',
        order: 6,
        config: {
          isDefault: false,
          icon: 'ic-code'
        },
        children: [
          {
            id: 161,
            pid: 1,
            name: 'Monaco',
            enable: true,
            checked: true,
            type: 'menu',
            order: 1,
            config: {
              isDefault: true,
              route: {
                name: 'monaco',
                params: [],
                query: []
              }
            }
          }
        ]
      },
      {
        id: 17,
        pid: 1,
        name: '标注',
        enable: true,
        checked: true,
        type: 'menu',
        order: 6,
        config: {
          isDefault: false,
          icon: 'ic-wallpaper',
          route: {
            name: 'label',
            params: [],
            query: []
          }
        }
      }
    ]
  },
  {
    id: 2,
    pid: 0,
    name: 'Iframe',
    enable: true,
    checked: true,
    type: 'menu',
    order: 3,
    config: {
      isDefault: false,
      icon: 'ic-overview',
      route: {
        name: 'iframe',
        params: [],
        query: []
      },
      boundary: true
    }
  },
  {
    id: 3,
    pid: 0,
    name: 'Git',
    enable: true,
    checked: true,
    type: 'menu',
    order: 3,
    config: {
      isDefault: false,
      icon: 'ic-git',
      target: '_blank',
      route: {
        href: 'http://192.168.4.1/product/front/vue2-template'
      },
      boundary: true
    }
  }
]
