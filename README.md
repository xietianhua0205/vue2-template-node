# APP NAME

#### OEM说明
- 详见[OEM.md](./docs/OEM.md)

#### 部署配置说明
- 详见[DEPLOY.md](./docs/DEPLOY.md)

#### 主题开发说明
- 详见[THEME.md](./docs/THEME.md)

#### 启用KG-SEARCH管理动态配置说明
- 详见[启用KG-SEARCH管理动态配置说明.md](docs/CONFIG.md)

#### 脚本说明
- serve 启动开发
- serve-layout-left 启动左侧布局调试
- serve-layout-top 启动顶部布局调试
- build 打包发布
- build-report 打包并生成分析报告
- getToken 手动获取plantdata产品用户token
- count-code 代码量统计
- lint 代码格式校验
- lintfix 带自动修复的代码格式校验
- server 本地缓存服务器(待完善，可不使用)
- prepare 配置自动升级info.json的脚本

#### 依赖说明， 以下非必须，只做演示
- @plantdata/reactive-menu-item 动态菜单

#### 代理配置文件 (build/proxy.js)

#### 样式文件编写说明 (src/assets/styles)
- themes 主题文件夹
    - default 默认主题文件夹
        - common.scss 默认主题下公共覆盖样式
        - graph.scss 默认主题下ndk的样式配置
        - variables-custom.scss 自定义变量覆盖，修改时记得添加 !default
        - variables-defined.scss element内置变量覆盖，同语义下优先使用element的变量，修改时记得添加 !default
    - dark 黑色主题文件夹，内部文件同默认主题，引入默认主题的配置，内部变量不覆盖时使用default的主题变量
        - ...
- common.scss 引入主题中的common.scss，和主题无关的公共覆盖样式
- graph.scss 引入主题中的graph.scss，和主题无关的图谱覆盖样式，无图谱时不需要
- variables-custom.scss 引入主题中的variables-custom.scss

#### JS全局配置说明 (public/config.js)
- APPName 应用名
- primaryColor js代码中使用的主题色
- logo LOGO地址
- logoDisabled 关闭logo显示
- configNsId KGSearch中存储动态配置的项目空间ID
- configBaseURL 存储动态配置的KGSearch地址前缀
- tableMargin PageContent.vue 中 main-table 的边距
- layout 布局，值为layoutMap中的key
- layoutMap 布局配置，配置不同布局slot的位置
- theme主题，值为themeMap中的key
- themeMap 主题配置，配置不同主题中组件的样式
- element element组件的默认配置，需要配合全局注入，参考kg-search的element-custom
- monaco monaco编辑器的全局公用配置。显示代码的推荐统一换成monaco
- echartsTheme echarts主题配置，配置说明可见README-THEME.md  echarts主题的使用 部分，使用说明可见README-OEM.md echarts主题的使用 部分
- slot 内容所在插槽配置
- pageSlot 不同页面上内容所在插槽的配置

#### 样式变量说明 (src/assets/styles)
- 文字大小可使用element-ui提供的变量，无覆盖的默认值如下
    - $--font-size-base: 14px
    - $--font-size-small: 13px
    - $--font-size-extra-small: 12px
    - $--font-size-medium: 16px
    - $--font-size-large: 18px

- variables-defined.scss
    - $--color-primary scss代码中使用的主题色
    - 其他见文件中的内容注释
    
- variables-custom.scss
    - 见文件中的内容注释
    - 内置的混入如下：
        - scroll 滚动条样式
        - line-hidden 文字超出隐藏...
        - multiline-hidden 多行文字超出隐藏... 
        - text-gradient 渐变文字
    
- common.scss 内置类
    - no-data 默认的无数据样式
    - 其他见文件中的内容

- graph.less
    - @color-primary less代码中使用的主题色
    - 其他见文件中的内容注释

#### 内置组件说明 (src/components)
- ForceConfirmDialog.vue 待输入内容确认删除的弹框
- NotFound.vue 404页面
- PasswordReset.vue 重置密码弹框
- ThePage.vue 页面框架模板
- PageContent.vue 页面内容模板

#### 内置指令 (src/directives)
- dateFormat 格式化时间

#### 内置混入 (src/mixins)
- config.js 内置从KGSearch获取动态配置并更新主题色的混入
- query-page.js 支持刷新页面保留分页、搜索条件
- table-page.js 支持刷新页面保留分页、搜索条件的表格页面
- slot.js 模板插槽变量、方法
- dialog.js 表单弹窗

#### 内置路由守卫 (src/router) 
- 需按实际情况更改

#### 内置工具类 (src/utils) 
- common.js
    - listToTree 将列表结构的数据转为树形结构
- theme.js
    - 修改主题色的工具类
- user.js
    - 存储在localStorage中的用户信息辅助工具类
    
#### 内置页面 (src/views) 
- TheHome.vue 应用框架模板，支持动态菜单、重置密码、获取用户信息等内容
- TheLogin.vue 内置的登录页面，需按需设置登录接口，接入sso时不需要这个页面
- templates/TheSlotDemo.vue 应用内容模板的案例、内含部分插槽效果示例

#### 其他文件说明
- src/config.js 初始化配置
- src/axios.js 支持自动显示接口返回错误、支持自动添加token、支持产品的接口返回结构
- src/element-custom.js 应用element配置的工具类
- src/menu.js 菜单配置
