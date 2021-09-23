<template>
  <page-content>
    <template slot="page-title">
      NDK定制 demo (SDK与NDK样式存在冲突，使用时请手动在App.vue中注释一个)
    </template>
    <template slot="main-right">
      <n-d-k-preview ref="graph" @inited="handleInited" :settings="customSettings"></n-d-k-preview>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import { select } from 'd3'
import { PdVisNetChartNoneLayout } from '@plantdata/vis/src/net-chart/layout/none'
import { PdVisPluginNodeLegend } from '@plantdata/vis/src/plugin/legend/node-legend/node-legend'
import { PdVisPluginLinkLegend } from '@plantdata/vis/src/plugin/legend/link-legend/link-legend'
import { PdCommonUtils } from '@plantdata/core'
import NDKPreview from '@/components/NDKPreview'

export default {
  name: 'TheNDKDemo',
  components: {
    NDKPreview,
    PageContent
  },
  mixins: [],
  data () {
    const color = ['#faad14', '#f5222d', '#1890FF', '#52c41a', '#A0D911', '#FA8C16', '#FADB14', '#722ED1']
    PdCommonUtils.colorBase = color
    const gradientColorList = color.map(end => ({
      start: 'transparent',
      end
    }))
    const colorMap = {}
    gradientColorList.forEach((c, i) => {
      colorMap[gradientColorList[i].end] = 'url(#node-color-emphasis-' + i + ')'
    })
    return {
      color,
      gradientColorList,
      customSettings: {
        initData: {
          config: null,
          createTime: null,
          entities: [],
          id: null,
          kgName: '',
          type: ''
        },
        kgName: this.$config.kgName,
        showAllSchemaOptions: false,
        ajaxSettings: {
          baseUrl: '/api/kgsdk/v3/',
          headers: {
            APK: this.$config.APK
          }
        },
        netChartSettings: {
          layout: {
            defaultLayout: 'tree',
            layouts: {
              none: {
                name: '无布局',
                constr: PdVisNetChartNoneLayout
              }
            }
          },
          data: {
            linkStyle: {
              labelStyle: {
                // visible: false
              }
            },
            nodeStyle: {
              nodeStyle: {
                size: 20
              },
              labelStyle: {
                background: 'rgba(255,255,255,.1)',
                border: {
                  color: 'rgba(255,255,255,.5)'
                },
                fontColor: 'rgba(255,255,255,.5)'
              }
            }
          },
          render: {
            nodeSettings: {
              displayRule: {
                circle: {
                  creatorNode (node, i, groups) {
                    const $circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
                    setTimeout(() => {
                      const text = node.data._origin.conceptName
                      if (text.length > 2) {
                        select(groups[i])
                          .append('text')
                          .attr('fill', '#fff')
                          .attr('dy', -5)
                          .attr('font-size', 12)
                          .attr('text-anchor', 'middle')
                          .text(text.substring(0, 2))
                        select(groups[i])
                          .append('text')
                          .attr('fill', '#fff')
                          .attr('dy', 13)
                          .attr('font-size', 12)
                          .attr('text-anchor', 'middle')
                          .text(text.substring(2))
                      } else {
                        select(groups[i])
                          .append('text')
                          .attr('fill', '#fff')
                          .attr('dy', 6)
                          .attr('font-size', 12)
                          .attr('text-anchor', 'middle')
                          .text(text)
                      }
                    })
                    return $circle
                  }
                }
              },
              nodeStyleFunction: (node) => {
                // console.log(node)
                node.display = 'custom'
                node.style.nodeStyle.size = 24
                const s = node.svgStyle
                const strFocusId = this.focusId?.toString()
                s.iconStyle.attr.fill = node.id === strFocusId ? this.$config.primaryColor : colorMap[node.style.nodeStyle.color]
                s.iconStyle.attr.stroke = node.id === strFocusId ? 'rgba(255,255,255, 1)' : node.style.nodeStyle.color
                s.iconStyle.attr['stroke-width'] = node.id === strFocusId ? 2 : 1
                // s.labelTextStyle.attr.fill = node.id === strFocusId ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, .5)'
                s.labelTextStyle.attr.fill = 'rgba(255,255,255, 1)'
                s.labelRectStyle.attr.fill = node.id === strFocusId ? this.$config.primaryColor : 'rgba(0, 0,0, .2)'
                s.labelRectStyle.attr.stroke = node.id === strFocusId ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, .5)'
                s.labelTextStyle.attr['font-size'] = node.id === strFocusId ? 14 : 12
              }
            },
            linkSettings: {
              linkStyleFunction: (link) => {
                link.svgStyle.iconStyle.style['mix-blend-mode'] = 'initial'
                const { attr } = link.svgStyle.iconStyle
                const source = link.source
                const target = link.target
                // if (this.graph.netChart.layout.globalLayout.match(/tree/ig) && target !== source) {
                if (target !== source) {
                  attr.d = this.linkDraw(source, target)
                }
                link.svgStyle.labelStyle.attr.transform = () => {
                  return 'translate(0, -8)'
                }
                link.svgStyle.labelRectStyle.attr.fill = link.style.linkStyle.color
                link.svgStyle.labelTextStyle.attr.fill = '#fff'
                // link.svgStyle.iconStyle.attr.stroke = '#0a59b5'
                // link.style.linkStyle.color = this.$config.primaryColor
                link.style.linkStyle.size = 2
              }
            }
          }
        },
        pluginSettings: {
          nodeLegend: {
            side: 'bottom',
            async: false,
            constr: PdVisPluginNodeLegend,
            settings: {
              color
            }
          },
          linkLegend: {
            side: 'bottom',
            async: false,
            constr: PdVisPluginLinkLegend,
            settings: {
              color
            }
          }
        }
      },
      customData: {
        relationList: [
          {
            from: 9,
            to: 42,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63a0',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-06-20 00:00:00',
            endTime: '2022-03-23',
            score: 1,
            batch: null,
            origin: {
              sourceReason: null,
              source: null
            },
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: null,
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 21,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63a2',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-06-01 00:00:00',
            endTime: '2021-02-24',
            score: 0.8,
            batch: null,
            origin: {
              sourceReason: null,
              source: null
            },
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '204915.0',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: 'D轮',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 44,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63a3',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-05-31 00:00:00',
            endTime: null,
            score: 0.6,
            batch: null,
            origin: {
              sourceReason: null,
              source: null
            },
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '5000.0',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: 'A+轮',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 45,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63a4',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-05-30 00:00:00',
            endTime: null,
            score: 0.5,
            batch: null,
            origin: {
              sourceReason: null,
              source: null
            },
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '942609.0',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: '战略投资',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 47,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63a6',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-05-11 00:00:00',
            endTime: null,
            score: 0,
            batch: null,
            origin: null,
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '273220.0',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: 'D轮',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 48,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63a7',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-04-20 00:00:00',
            endTime: null,
            score: 0,
            batch: null,
            origin: null,
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '500000.0',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: '并购',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 50,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63a9',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-04-16 00:00:00',
            endTime: null,
            score: 0,
            batch: null,
            origin: null,
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '34900.0',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: 'C轮',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 53,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63ac',
            labelStyle: null,
            linkStyle: null,
            startTime: '2018-04-02 00:00:00',
            endTime: null,
            score: 0,
            batch: null,
            origin: null,
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '6488975.0',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: '并购',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 42,
            attId: 1,
            attName: '投资',
            direction: 0,
            id: '5e1552e3873cef639f1c63b2',
            labelStyle: null,
            linkStyle: null,
            startTime: '2017-08-18 00:00:00',
            endTime: null,
            score: 0,
            batch: null,
            origin: null,
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: [
              {
                name: '投资金额',
                seqNo: 1,
                value: '683360000',
                dataType: 2
              },
              {
                name: '投资轮次',
                seqNo: 2,
                value: 'A轮',
                dataType: 5
              }
            ],
            objAttrs: null,
            sourceRelationList: null
          },
          {
            from: 9,
            to: 102,
            attId: 22,
            attName: '投资行业',
            direction: 0,
            id: '60b84cb7e13da33d57d4f793',
            labelStyle: null,
            linkStyle: null,
            startTime: '',
            endTime: '',
            score: 0,
            batch: null,
            origin: null,
            reasonRuleId: null,
            reliability: 0,
            dataValAttrs: null,
            objAttrs: null,
            sourceRelationList: null
          }
        ],
        entityList: [
          {
            id: 9,
            name: '阿里资本',
            type: 1,
            conceptId: 1,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.10832,
            classId: 1,
            conceptName: '投资机构',
            conceptIdList: [
              1
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区9',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 42,
            name: '寒武纪科技',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.12519,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区58',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 21,
            name: '小红书',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.11473,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区9',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 44,
            name: '奥哲网络',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.11195,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区64',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 45,
            name: '中通快递',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.11195,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区45',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 47,
            name: '美味不用等',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.11195,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区65',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 48,
            name: '乐鑫科技',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.12179,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区93',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 50,
            name: 'Video++',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.11195,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区9',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 53,
            name: '饿了么',
            type: 1,
            conceptId: 2,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.11195,
            classId: 2,
            conceptName: '产品',
            conceptIdList: [
              2
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区53',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          },
          {
            id: 102,
            name: '工具软件',
            type: 1,
            conceptId: 5,
            meaningTag: null,
            imgUrl: null,
            startTime: null,
            endTime: null,
            score: 0.12437,
            classId: 5,
            conceptName: '行业',
            conceptIdList: [
              5
            ],
            coordinates: null,
            nodeStyle: null,
            labelStyle: null,
            openGis: true,
            tags: [
              {
                name: '社区9',
                source: 'graphx_generated',
                creationTime: '2021-09-07 15:49:20',
                grade: 3
              }
            ],
            additional: null
          }
        ]
      }
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    createNodeColor (graph, start, end, i) {
      const renderer = graph.netChart.renderer
      const shadow = renderer.$defs.append('filter')
        .attr('id', 'color-shadow-' + i)
      shadow.append('feDropShadow')
        .attr('flood-color', start)
        .attr('flood-opacity', 1)
        .attr('stdDeviation', 5)
        .attr('dx', 1)
        .attr('dy', 1)
      const color = renderer.$defs.append('linearGradient')
        .attr('id', 'node-color-emphasis-' + i)
      color.append('stop')
        .attr('stop-opacity', 0.5)
        .attr('stop-color', end)
        .attr('offset', '0%')
      color.append('stop')
        .attr('stop-opacity', 1)
        .attr('stop-color', end)
        .attr('offset', '100%')
    },
    handleCustom () {
      this.$message.success('待编写')
    },
    handleInited (graph) {
      this.gradientColorList.forEach(({ start, end }, i) => {
        this.createNodeColor(graph, start, end, i)
      })
      graph.addData(this.customData, { id: this.customData.entityList[0].id })
    },
    linkDraw (s, t) {
      if (s != null && t != null) {
        const sx = s.x
        const sy = s.y
        const tx = t.x
        const ty = t.y
        return 'M ' + sx + ' ' + sy +
          ' C ' + sx + ' ' + ty + ',' +
          tx + ' ' + sy + ',' +
          ' ' + tx + ' ' + ty
        // return 'M ' + sx + ' ' + sy +
        //   ' C ' + ((sx + tx) / 2) + ' ' + sy + ',' +
        //   ((sx + tx) / 2) + ' ' + ty + ',' +
        //   ' ' + tx + ' ' + ty
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom.scss";

</style>
