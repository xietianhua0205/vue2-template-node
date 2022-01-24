// 由于本js不会经过babel转义，所有的语法都需要使用兼容性最好的语法，const，let等避免使用
(function () {
  var theme = window.APP_THEME || 'default'
  var layout = window.APP_LAYOUT || 'default'
  /**
   * 必须和样式中的主题色保持一致，否则可能出现主题色部分替换失败的问题
   */
  window.APP_PRIMARY_COLOR = window.APP_PRIMARY_COLOR || '#00b38a'
  var themeMap = {
    default: {},
    dark: {}
  }
  var hideOnlyChild = true
  var layoutMap = {
    default: {
      navProps: {
        hideOnlyChild: hideOnlyChild,
        border: true
      },
      slot: {
        navPrimary: 'header-right-end', // 不存在的slot不显示
        navSecondary: 'main-left',
        // filter: 'header-left',
        // toolbar: 'header-right',
        // pagination: 'main-bottom-center'
        filter: 'main-top-left',
        toolbar: 'main-top-right',
        pagination: 'main-bottom-right'
      },
      pageSlot: {
        indexRebuildManage: {
          toolbar: 'header-right'
        }
      },
      element: {
        button: {
          size: 'small', // medium small mini
          round: false
        },
        dialog: {
          closeOnClickModal: false,
          appendToBody: true
        },
        link: {
          underline: false
        },
        form: {
          size: 'small',
          labelPosition: 'left', // left right top
          labelWidth: '100px'
        },
        pagination: {
          small: false,
          background: false,
          hideOnSinglePage: false,
          layout: 'prev, pager, next, total, sizes'
        },
        table: {
          border: true,
          stripe: false,
          size: 'middle',
          headerCellStyle: function () {
            return {}
          },
          rowStyle: function () {
            return {}
          }
        }
      }
    },
    top: {
      navProps: {
        hideOnlyChild: hideOnlyChild,
        border: false
      },
      slot: {
        navPrimary: 'header-center',
        navSecondary: 'header-secondary',
        filter: 'main-top-left',
        toolbar: 'main-top-right',
        pagination: 'main-bottom-right'
      },
      pageSlot: {},
      element: {
        button: {
          size: 'small', // medium small mini
          round: true
        },
        dialog: {
          closeOnClickModal: false,
          appendToBody: true
        },
        link: {
          underline: false
        },
        form: {
          size: 'small',
          labelPosition: 'top', // left right top
          labelWidth: '100px'
        },
        pagination: {
          small: false,
          background: true,
          hideOnSinglePage: false,
          layout: 'prev, pager, next, total'
        },
        table: {
          border: false,
          stripe: true,
          size: 'middle',
          headerCellStyle: function () {
            return {}
          },
          rowStyle: function () {
            return {}
          }
        }
      }
    },
    left: {
      navProps: {
        hideOnlyChild: hideOnlyChild,
        border: true
      },
      slot: {
        navPrimary: null, // 不存在的slot不显示
        navSecondary: 'header-right-start',
        filter: 'header-left',
        toolbar: 'header-right',
        pagination: 'main-bottom-center'
        // filter: 'main-top-left',
        // toolbar: 'main-top-left',
        // pagination: 'main-top-right'
      },
      pageSlot: {
        pageKey: {
          toolbar: 'header-right'
        }
      },
      element: {
        button: {
          size: 'small', // medium small mini
          round: false
        },
        dialog: {
          closeOnClickModal: false,
          appendToBody: true
        },
        link: {
          underline: false
        },
        form: {
          size: 'small',
          labelPosition: 'left', // left right top
          labelWidth: '100px'
        },
        pagination: {
          small: false,
          background: false,
          hideOnSinglePage: false,
          layout: 'prev, pager, next, total, sizes'
        },
        table: {
          border: true,
          stripe: false,
          size: 'middle',
          headerCellStyle: function () {
            return {}
          },
          rowStyle: function () {
            return {}
          }
        }
      }
    }
  }
  /**
   * 无特殊需求，不要直接使用window.APP_CONFIG, 使用vue对象中的$config,或者Vue.prototype.$config代替,
   * Vue.prototype.$config考虑后续克隆一份window.APP_CONFIG，而不直接使用该引用，以免合并动态配置后，丢失原始数据
   */
  window.APP_CONFIG = {
    CUSTOM_LOGIN: false,
    APPName: 'plantdata',
    primaryColor: window.APP_PRIMARY_COLOR,
    logo: '',
    logoDisabled: false,
    configNsId: null,
    configBaseURL: '',
    tableMargin: [16, 16, 16, 16],
    theme: theme,
    layout: layout,
    navProps: layoutMap[layout].navProps,
    slot: layoutMap[layout].slot,
    pageSlot: layoutMap[layout].pageSlot,
    element: layoutMap[layout].element,
    inputCharacterLimit: {
      name: 50,
      info: 255
    },
    kgName: 's60zc4ni_graph_default',
    APK: 'c6046efc0f4741ad84aed43d3f8c964f',
    isDev: false,
    needLogin: false
  }
})()
