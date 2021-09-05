export default [
  {
    id: 1,
    pid: 0,
    name: '主页',
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
        id: 10,
        pid: 1,
        name: '主页子菜单',
        enable: true,
        checked: true,
        type: 'menu',
        order: 1,
        config: {
          isDefault: true,
          icon: 'ic-system',
          route: {
            name: 'demo',
            params: [],
            query: []
          },
          boundary: true
        }
      }
    ]
  },
  {
    id: 2,
    pid: 0,
    name: '后台管理',
    enable: true,
    checked: true,
    type: 'menu',
    order: 3,
    config: {
      isDefault: true,
      icon: 'ic-overview',
      boundary: true
    },
    children: [
      {
        id: 20,
        pid: 2,
        name: '后台管理子菜单',
        enable: true,
        checked: true,
        type: 'menu',
        order: 1,
        config: {
          isDefault: true,
          icon: 'ic-system',
          route: {
            name: 'demo',
            params: [],
            query: []
          },
          boundary: true
        }
      }
    ]
  }
]
