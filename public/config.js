(function () {
  var themeMap = {
    light: {
      monaco: {
        theme: 'vs'
      }
    },
    dark: {
      monaco: {
        theme: 'vs-dark'
        // theme: 'hc-black'
      },
      echartsTheme: {
        color: [
          '#fc97af',
          '#87f7cf',
          '#f7f494',
          '#72ccff',
          '#f7c5a0',
          '#d4a4eb',
          '#d2f5a6',
          '#76f2f2'
        ],
        backgroundColor: 'rgba(0, 0, 0, 1)',
        textStyle: {},
        title: {
          textStyle: {
            color: '#ffffff'
          },
          subtextStyle: {
            color: '#dddddd'
          }
        },
        line: {
          itemStyle: {
            borderWidth: '4'
          },
          lineStyle: {
            width: '3'
          },
          symbolSize: '0',
          symbol: 'circle',
          smooth: true
        },
        radar: {
          itemStyle: {
            borderWidth: '4'
          },
          lineStyle: {
            width: '3'
          },
          symbolSize: '0',
          symbol: 'circle',
          smooth: true
        },
        bar: {
          itemStyle: {
            barBorderWidth: 0,
            barBorderColor: '#ccc'
          }
        },
        pie: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          }
        },
        scatter: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          }
        },
        boxplot: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          }
        },
        parallel: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          }
        },
        sankey: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          }
        },
        funnel: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          }
        },
        gauge: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          }
        },
        candlestick: {
          itemStyle: {
            color: '#fc97af',
            color0: 'transparent',
            borderColor: '#fc97af',
            borderColor0: '#87f7cf',
            borderWidth: '2'
          }
        },
        graph: {
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ccc'
          },
          lineStyle: {
            width: '1',
            color: '#ffffff'
          },
          symbolSize: '0',
          symbol: 'circle',
          smooth: true,
          color: [
            '#fc97af',
            '#87f7cf',
            '#f7f494',
            '#72ccff',
            '#f7c5a0',
            '#d4a4eb',
            '#d2f5a6',
            '#76f2f2'
          ],
          label: {
            color: '#293441'
          }
        },
        map: {
          itemStyle: {
            areaColor: '#f3f3f3',
            borderColor: '#999999',
            borderWidth: 0.5
          },
          label: {
            color: '#893448'
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(255,178,72,1)',
              borderColor: '#eb8146',
              borderWidth: 1
            },
            label: {
              color: 'rgb(137,52,72)'
            }
          }
        },
        geo: {
          itemStyle: {
            areaColor: '#f3f3f3',
            borderColor: '#999999',
            borderWidth: 0.5
          },
          label: {
            color: '#893448'
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(255,178,72,1)',
              borderColor: '#eb8146',
              borderWidth: 1
            },
            label: {
              color: 'rgb(137,52,72)'
            }
          }
        },
        categoryAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666666'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            show: true,
            color: '#aaaaaa'
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: [
                '#e6e6e6'
              ]
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)'
              ]
            }
          }
        },
        valueAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666666'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            show: true,
            color: '#aaaaaa'
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: [
                '#e6e6e6'
              ]
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)'
              ]
            }
          }
        },
        logAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666666'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            show: true,
            color: '#aaaaaa'
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: [
                '#e6e6e6'
              ]
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)'
              ]
            }
          }
        },
        timeAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666666'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            show: true,
            color: '#aaaaaa'
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: [
                '#e6e6e6'
              ]
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)'
              ]
            }
          }
        },
        toolbox: {
          iconStyle: {
            borderColor: '#999999'
          },
          emphasis: {
            iconStyle: {
              borderColor: '#666666'
            }
          }
        },
        legend: {
          textStyle: {
            color: '#999999'
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              color: '#cccccc',
              width: 1
            },
            crossStyle: {
              color: '#cccccc',
              width: 1
            }
          }
        },
        timeline: {
          lineStyle: {
            color: '#87f7cf',
            width: 1
          },
          itemStyle: {
            color: '#87f7cf',
            borderWidth: 1
          },
          controlStyle: {
            color: '#87f7cf',
            borderColor: '#87f7cf',
            borderWidth: 0.5
          },
          checkpointStyle: {
            color: '#fc97af',
            borderColor: '#fc97af'
          },
          label: {
            color: '#87f7cf'
          },
          emphasis: {
            itemStyle: {
              color: '#f7f494'
            },
            controlStyle: {
              color: '#87f7cf',
              borderColor: '#87f7cf',
              borderWidth: 0.5
            },
            label: {
              color: '#87f7cf'
            }
          }
        },
        visualMap: {
          color: [
            '#fc97af',
            '#87f7cf'
          ]
        },
        dataZoom: {
          backgroundColor: 'rgba(255,255,255,0)',
          dataBackgroundColor: 'rgba(114,204,255,1)',
          fillerColor: 'rgba(114,204,255,0.2)',
          handleColor: '#72ccff',
          handleSize: '100%',
          textStyle: {
            color: '#333333'
          }
        },
        markPoint: {
          label: {
            color: '#293441'
          },
          emphasis: {
            label: {
              color: '#293441'
            }
          }
        }
      }
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
    configNsId: null,
    configBaseURL: '',
    tableMargin: [16, 16, 16, 16],
    theme: theme,
    layout: layout,
    navProps: layoutMap[layout].navProps,
    slot: layoutMap[layout].slot,
    pageSlot: layoutMap[layout].pageSlot,
    element: layoutMap[layout].element,
    monaco: themeMap[theme].monaco,
    echartsTheme: themeMap[theme].echartsTheme,
    kgName: 's60zc4ni_graph_default',
    APK: 'c6046efc0f4741ad84aed43d3f8c964f'
  }
})()
