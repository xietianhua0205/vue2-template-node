<template>
  <page-content>
    <template slot="page-title">
      Monaco demo
    </template>
    <template slot="header-right-extra">
      <el-link href="https://microsoft.github.io/monaco-editor/" target="_blank">官网</el-link>
    </template>
    <template slot="main-right">
      <div class="monaco" ref="monaco"></div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'

export default {
  name: 'TheMonacoDemo',
  components: {
    PageContent
  },
  mixins: [],
  data () {
    return {
      monacoIns: null,
      jsonStr: JSON.stringify({
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
      }, ' ', 2)
    }
  },
  beforeDestroy () {
    if (this.monacoIns) {
      this.monacoIns.dispose()
    }
  },
  mounted () {
    this.initMonaco()
  },
  methods: {
    initMonaco () {
      this.monacoIns = window.monaco.editor.create(this.$refs.monaco, Object.assign({
        automaticLayout: true,
        language: 'json',
        wrappingIndent: 'indent',
        foldingStrategy: 'indentation', // 代码可分小段折叠
        overviewRulerBorder: false, // 不要滚动条的边框
        tabSize: 2,
        theme: 'vs-dark',
        showFoldingControls: 'always',
        wordWrap: 'on',
        minimap: {
          // enabled: false // 不要小地图
        },
        readOnly: true
      }, window.APP_CONFIG?.monaco))
      this.monacoIns.setValue(this.jsonStr)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom.scss";

.monaco {
  height: 100%;
  overflow: hidden
}
</style>
