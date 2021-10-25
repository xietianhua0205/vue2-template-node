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


### 示例
#### monaco 主题
- 在`public/config.js`的主题配置中添加不同主题对应的配置，例如：
```javascript
    var themeMap = {
        light: {
          monaco: {
            theme: 'vs'
          }, // 浅色主题时monaco对应的配置
        },
        dark: {
          monaco: {          
            theme: 'vs-dark'
          }, // 深色主题时monaco对应的配置
        }
    }
```
- 在`public/config.js`的`window.APP_CONFIG`变量中定义选择主题的配置结果，例如：
```javascript
    window.APP_CONFIG = {
        monaco: themeMap[theme].monaco,
    }
```
- 在init 实例时
```javascript
    this.monacoIns = window.monaco.editor.create(this.$refs.monacoContainer, Object.assign({
        language: 'json'
    }, this.$config.monaco))
```

#### echarts 主题
- 主题在echarts官网-资源-主题构建工具中进行配置
- 配置完成后在下载主题-JSON版本中复制配置项
- 将复制的配置项放入public/config.js 中
```javascript
    var echartsTheme = {<!--复制的配置--> }
    var themeMap = {
        light: {
          monaco: {}, // 浅色主题时monaco对应的配置
          echartsTheme: {} // 浅色主题时echarts对应的配置
        },
        dark: {
          monaco: {}, // 深色主题时monaco对应的配置
          echartsTheme: echartsTheme // 深色主题时echarts对应的配置
        }
    }
```
- 在`public/config.js`的`window.APP_CONFIG`变量中定义选择主题的配置结果，例如：
```javascript
    window.APP_CONFIG = {
        echartsTheme: themeMap[theme].echartsTheme,
    }
```
- 在init 实例前
```javascript
    if (this.$config.echartsTheme) {
      echarts.registerTheme('echartsTheme', this.$config.echartsTheme)
    }
```
- 在init 实例时
```javascript
  this.echartsIns = echarts.init(this.$refs.echartsInsContainer, this.$config.echartsTheme ? 'echartsTheme' : '')
