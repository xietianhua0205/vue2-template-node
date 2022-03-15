# 模板更新日志


## [2.2.3] （2022-03-15）
#### feat
- page-content 支持无header内容自动隐藏
- page-content 添加noMainGap、noMargin配置项

## [2.2.2] （2022-02-22）
#### feat
- 404页支持自动跳转首页
- page-title 推荐使用 currentMenuGet 获取

#### fix
- 修复替换主题色引起的文件路径错误
- 修复主题色指定失败的BUG
- 新开一页的菜单项点击后样式未重置

#### refactor
- `APPName`使用`package.json`中的`name`值,无需配置
- isDev强制为true
- 打包生成目录修改
- 优化OEM布局、主题、主题色的配置


## [2.2.0] （2021-12-17）
#### feat
- 增加v-highlight指令

#### fix
- 修复登录页改成深色注意的时的BUG

#### other
- 升级`ElementUI`到`2.15.7`,使用`dart-sass`替换`node-sass`

## [2.1.0] （2021-12-03）
#### feat
- 支持不需要登录的配置
- 支持顶部菜单只有一项时配置显示/隐藏，默认隐藏

#### fix
- 修复query参数对象类型时出现的错误
- 适配KG-Search 1.2.x
- 修复token失效后刷新无效的BUG
- 修复文档错误
- 修复登录相关BUG
- 修复style的innerText为null时报错的BUG

#### other
- 优化vue中config的使用
- 补充产品登录部署文档
- 合并scss变量文件
- 增加不同布局的启动命令

## [2.0.2] （2021-10-11）
#### fix
- 修复登录页LOGO显示过大的BUG

## [2.0.1] （2021-10-09）
#### feature
- 支持动态从search项目空间索引中获取配置
- 首页 登录页支持动态logo
- 支持动态修改主题色

#### other
- 使用dayjs替换moment

## [2.0.0] （2021-09-10）
#### feature
- 开发时产品自动登录
- 打包时版本序号自动更新
- 使用`@plantdata/reactive-menu-item`实现动态菜单
- 支持主题切换,内置白色\黑色两套主题
- 支持布局切换,内置三种布局
- query-page.js 支持刷新页面保留分页、搜索条件
- table-page.js 支持刷新页面保留分页、搜索条件的表格页面
- TheHome.vue 应用框架模板，支持动态菜单、重置密码、获取用户信息等内容
- TheLogin.vue 内置的登录页面，需按需设置登录接口，接入sso时不需要这个页面
- templates/TheSlotDemo.vue 应用内容模板的案例、内含部分插槽效果示例
