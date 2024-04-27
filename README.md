## 前端小游戏开发项目

[![pipeline status](https://gitlab.lazytoki.cn/Toki/Toki/badges/main/pipeline.svg)](https://gitlab.lazytoki.cn/Toki/Toki/-/commits/main)

[![coverage report](https://gitlab.lazytoki.cn/Toki/Toki/badges/main/coverage.svg)](https://gitlab.lazytoki.cn/Toki/Toki/-/commits/main)

[![Latest Release](https://gitlab.lazytoki.cn/Toki/Toki/-/badges/release.svg)](https://gitlab.lazytoki.cn/Toki/Toki/-/releases)
#### 项目开发介绍
主要记录一些canvas 2D游戏，可能会有一些（类ps，pr 处理的工具类）

后期会加入一些webgl 3D 开发


#### 项目介绍

使用 pnpm 下载依赖




####  问题记录
1. **网页展示的内容`jsx`部分被编译过了** 
  - ts.config 里面也要设置  "sourceMap": true,
  - babel.config.js 里面也要注意
2. 懒加载路由死循环了是为什么
  - 需要使用 suspended 组件 loading 加载，不然随用随调会导致死循环。
  - Link 跳转失败， link和routes 要使用一个Router包裹起来。

#### TODO_LIST
1. gitlab ci 加上缓存等优化（待做）
2. 错误边界问题添加（待做），测试错误搜集可靠程度