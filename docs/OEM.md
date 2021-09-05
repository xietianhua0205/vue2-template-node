# OEM

### echarts 主题的使用
#### 关于组件中的使用
- 在init 实例前
```javascript
if (this.$config.echartsTheme) {
  echarts.registerTheme('echartsTheme', this.$config.echartsTheme)
}
```
- 在init 实例时
```javascript
this.echartsIns = echarts.init(this.$refs.echartsInsContainer, this.$config.echartsTheme ? 'echartsTheme' : '')
```
