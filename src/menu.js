// 配置说明参考node_modules/@plantdata/reactive-menu-item/interface.ts
// 导航使用参考node_modules/@plantdata/reactive-menu-item/README.md
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
        name: '校验模板',
        enable: true,
        checked: true,
        type: 'menu',
        order: 1,
        config: {
          isDefault: true,
          icon: 'ic-system',
          route: {
            name: 'verify',
            params: [],
            query: []
          }
        }
      }
    ]
  }
]
