# 主题开发

### 定义
- 在`public/config.js`的`themeMap`变量对应的主题中定义对应的配置，例如：
```javascript
    var themeMap = {
        light: {
          monaco: {}, // 浅色主题时monaco对应的配置
          echartsTheme: {} // 浅色主题时echarts对应的配置
        },
        dark: {
          monaco: {}, // 深色主题时monaco对应的配置
          echartsTheme: {} // 深色主题时echarts对应的配置
        }
    }
```
- 在`public/config.js`的`window.APP_CONFIG`变量中定义选择主题的配置结果，例如：
```javascript
    window.APP_CONFIG = {
        monaco: themeMap[theme].monaco,
        echartsTheme: themeMap[theme].echartsTheme,
    }
```
- 在实际场景中使用主题配置的结果
```javascript
  echarts.registerTheme('echartsTheme', this.$config.echartsTheme)
```

### echarts 主题的使用
#### 关于配置
- 主题在echarts官网-资源-主题构建工具中进行配置
- 配置完成后在下载主题-JSON版本中复制配置项
- 将复制的配置项放入public/config.js 中
```javascript
  const echartsTheme = {<!--复制的配置--> }
  window.APP_CONFIG = {
    echartsTheme: echartsTheme
  }
```
- 若要取消主题，删除或注释掉echartsTheme即可
