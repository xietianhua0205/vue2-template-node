# APP NAME

## 本项目模板推荐nodejs使用v14.20.0以上，暂不推荐v14以上版本，由于v16改动较大，暂不支持

#### OEM说明
- 详见[OEM.md](./docs/OEM.md)

#### 部署配置说明
- 详见[DEPLOY.md](./docs/DEPLOY.md)

#### 主题开发说明
- 详见[THEME.md](./docs/THEME.md)

#### 启用KG-SEARCH管理动态配置说明
- 详见[启用KG-SEARCH管理动态配置说明.md](docs/CONFIG.md)

#### 支持单页编排配置
- 详见[支持单页编排配置.md](./docs/支持单页编排配置.md)

#### 脚本说明
- serve 启动开发，待获取plantdata token脚本
- start 启动开发，跳过获取plantdata token脚本
- build 打包发布
- build-studio 打包并生成上传到studio的压缩包
- lint 代码格式校验
- build-report 打包并生成js文件依赖关系的分析报告
- get-token 手动获取plantdata产品用户token
- count-code 代码量统计
- lintfix 带自动修复的代码格式校验
- prepare 配置自动升级info.json的脚本
- lint-staged 配置代码提交时触发eslint校验
- commit 配置代码提交时的message校验
- local-server 本地缓存服务器(待完善，暂不使用)
- local-start 启动开发，接口先经过本地缓存服务器后，把最后一次的接口数据缓存，以便离线开发

#### 部分依赖说明
- @plantdata/pd 版权信息
- @plantdata/reactive-menu-item 动态菜单,非必须，只做演示

#### 代理配置文件 (build/proxy.js)
- '^/api' 接口的一般代理地址(根据项目实际情况调整)
- '^/oauth/token' 获取PLANTDATA用户认证TOKEN的代理地址
- '^/spa' SPA项目的代理地址
- '^/plantdata-sdk' SDK v2的代理地址，v3版本为/api/kgsdk/v3/,已在'^/api'覆盖到，这里没有单独列
- '^/group1' KGMS中多媒体资源的代理地址（旧版）
- '^/minio' KGMS中多媒体资源的代理地址（新版）
- '^/cesium' cesium库资源的代理地址
- '^/mapbox' 矢量地图的代理地址，由于十段线+虚线的错误可能不符合中国国情，慎重使用
- '^/bing' bing卫星地图瓦片的代理地址
- '^/google' google卫星地图瓦片的代理地址
- '^/wind' 气象地图瓦片的代理地址
- '^/arcgis-zx-y' arcgis街道地图瓦片的代理地址，ZXY顺序，由于十段线+虚线的错误可能不符合中国国情，慎重使用
- '^/arcgis-zyx' arcgis街道地图瓦片的代理地址，ZYX顺序，由于十段线+虚线的错误可能不符合中国国情，慎重使用
- '^/osm' OSM街道地图瓦片的代理地址，由于十段线+虚线的错误可能不符合中国国情，慎重使用
- '^/gd' 某街道地图瓦片的代理地址,十段线+虚线
- '^/mapbox-satellite' Mapbox卫星地图瓦片的代理地址

#### 样式文件编写说明 (src/assets/styles)
- themes 主题文件夹
    - default 默认主题文件夹
        - common.scss 默认主题下公共覆盖样式
        - graph.less 默认主题下ndk的样式配置，由于本模板项目没有使用，内部代码已注释
        - variables-custom.scss 自定义变量覆盖，修改时记得添加 !default
        - variables-defined.scss element内置变量覆盖，同语义下优先使用element的变量，修改时记得添加 !default
    - dark 黑色主题文件夹，内部文件同默认主题，引入默认主题的配置，内部变量不覆盖时使用default的主题变量
        - ...
- common.scss 引入主题中的common.scss，和主题无关的公共覆盖样式
- graph.less 引入主题中的graph.less，和主题无关的图谱覆盖样式，无图谱时不需要
- variables-custom.scss 引入主题中的variables-custom.scss

#### JS全局配置说明 (public/config.js)
- APPName 应用名，需要修改，建议每个项目设置不同，英文
- primaryColor js代码中使用的主题色，默认不要修改
- logo LOGO地址
- logoDisabled 关闭logo显示，关闭后不显示logo
- configNsId KGSearch中存储动态配置的项目空间ID，不建议使用，默认null即可
- configBaseURL 存储动态配置的KGSearch地址前缀，不建议使用，默认空即可
- theme主题，值为themeMap中的key，内置default、dark两个选项
- verifyConfig 校验配置，配置校验规则、特殊字符和校验开启状态（长度校验、接口参数完整性校验、特殊字符校验），配置的使用参考src/views/templates/TheVerifyDataDemo.vue中的示例
- logParamInHeader 接口发送请求日志的开关
- layout 布局，值为layoutMap中的key，内置为default、top、left
- navProps 不同布局中导航相关配置
- slot 内容所在插槽配置， 比如一级菜单（navPrimary）所在的页面插槽
- pageSlot 不同页面上内容所在插槽的配置
- element element组件的默认配置，可以统一配置诸如模态框是否全局可以点击遮罩进行关闭等，需要配合全局注入，参考element-custom.js
- monaco monaco编辑器的全局公用配置，诸如不同项目主题下的monaco主题。显示代码的推荐统一换成monaco
- echartsTheme echarts主题配置，诸如不同项目主题下的echarts配色，配置说明参考docs/THEME.md  echarts主题的使用 部分
- kgName 该项目用到的图谱的默认kgName，根据实际情况可能没有，或者多个
- APK 该项目用到的图谱的默认APK，根据实际情况可能没有，或者多个
- isDev 是否开发模式，会强制指定模式，不同模式会影响登录退出等操作的表现形态
- needLogin 是否需要登录，会影响判断登录状态来显示页面和页面上的部分内容，比如是否等登录后再显示页面等
- titleAutoUpdate 是否自动更新浏览器标签页上显示的名称，内置会根据@plantdata/reactive-menu-item中配置的name进行切换显示

#### 样式变量说明 (src/assets/styles)
- 文字大小可使用element-ui提供的变量，无覆盖情况下的默认值如下
    - $--font-size-base: 14px
    - $--font-size-small: 13px
    - $--font-size-extra-small: 12px
    - $--font-size-medium: 16px
    - $--font-size-large: 18px

- variables-defined.scss
    - $--color-primary scss代码中使用的主题色，直接修改无效，如需修改在vue.config.js中配置
    - 其他见文件中的内容注释
    
- variables-custom.scss
    - 见文件中的内容注释
    - 内置的混入如下：
        - scroll 滚动条样式
        - line-hidden 文字超出隐藏...
        - multiline-hidden 多行文字超出隐藏... 不同场景可能失效
        - text-gradient 渐变文字
    
- common.scss 内置类
    - no-data 默认的无数据样式，建议直接使用ElementUI中的组件
    - 其他见文件中的内容

- graph.less
    - 修改主题色，直接修改无效，如需修改在vue.config.js中配置
    - 其他见文件中的内容注释

#### 内置组件说明 (src/components)
- ForceConfirmDialog.vue 带输入内容确认删除的弹框，删除时需要反复确认的时候使用
- NotFound.vue 默认内置的404页面
- PasswordReset.vue 重置密码弹框，需要根据实际情况修改
- ThePage.vue 页面框架模板
- PageContent.vue 页面内容模板

#### 内置指令 (src/directives)
- dateFormat 格式化时间
- highlight 高亮文本，由于使用的是highlight class来高亮，失败时注意样式是否正确，dom是否替换

#### 内置混入 (src/mixins)
- config.js 内置从KGSearch获取动态配置并更新主题色的混入，由于KG-SEARCH不断迭代，可能会过时，不建议使用，使用请咨询
- query-page.js 支持刷新页面保留分页、搜索条件等超链接参数
- table-page.js 支持刷新页面保留分页、搜索条件的表格页面
- slot.js 模板插槽变量、方法
- dialog.js 表单弹窗，由于复杂性，不建议使用

#### 内置路由守卫 (src/router) 
- 需按实际情况更改

#### 内置工具类 (src/utils) 
- common.js
    - listToTree 将列表结构的数据转为树形结构
    - getStyle 计算DOM元素的css样式，常用来计算宽高的实际值
- localStorage.js
    - 读写localStorage的统一工具类，统一localStorage中key前缀
- token.js
    - 读写localStorage中token的统一工具类
- theme.js
    - 动态修改主题色的工具类
- user.js
    - 存储在localStorage中的用户信息辅助工具类
- route.js
    - 动态替换路由参数的工具类
    
#### 内置页面 (src/views) 
- TheHome.vue 应用框架模板，支持动态菜单、重置密码、获取用户信息等内容
- TheLogin.vue 内置的登录页面，需按需设置登录接口，接入sso时不需要这个页面
- templates/TheSlotDemo.vue 应用内容模板的案例、内含部分插槽效果示例
- templates/TheVerifyDataDemo.vue 应用内容模板的案例、内含数据校验示例
- templates/TheDynamicDemo.vue 单页编排时的动态路由示例

#### 其他文件说明
- src/config.js 初始化配置
- src/axios.js 支持自动显示接口返回错误、支持开发模式自动添加token、支持plantdata产品的接口返回结构解析，支持添加完整性校验和请求日志
- src/element-custom.js 应用element全局配置的工具类
- src/menu.js 菜单配置，动态菜单或者使用了@plantdata/reactive-menu-item则必须在这里进行配置
