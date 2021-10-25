# OEM

### 定制主题
- 修改`src/assets/styles/common.scss`中引入的全局样式文件
    - 默认主题使用`@import "themes/default/common";`
    - 深色主题使用`@import "themes/dark/common";`
    
- 修改`src/assets/styles/variables-custom.scss`中引入的主题变量文件
    - 默认主题使用`@import "themes/default/variables-custom";`
    - 深色主题使用`@import "themes/dark/variables-custom";`
    
- 修改`public/config.js`中的主题主题变量`theme`
    - 默认主题使用`var theme = 'light'`
    - 深色主题使用`var theme = 'dark'`

### 定制布局
- 修改`public/config.js`中的主题主题变量`layout`
    - 默认布局使用`var layout = 'default'`
    - 左侧布局使用`var layout = 'left'`
    - 顶部布局使用`var layout = 'top'`
