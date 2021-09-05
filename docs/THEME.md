# 主题定制

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
