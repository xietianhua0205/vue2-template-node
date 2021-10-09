(function () {
  var themeMap = {
    light: {
    },
    dark: {
    }
  }
  var theme = 'light'
  var layoutMap = {
    default: {
      navProps: {
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
  var layout = 'default'
  window.APP_CONFIG = {
    APPName: 'vue2-template',
    primaryColor: '#00b38a',
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
    kgName: 's60zc4ni_graph_default',
    APK: 'c6046efc0f4741ad84aed43d3f8c964f'
  }
})()
