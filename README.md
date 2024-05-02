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
3. suspense 组件的使用场景
  - 路由懒加载，使用lazy 包裹组件，在组件内部使用Suspense 包裹异步加载的组件。
  - 尝试使用了一下利用 返回 promise pending 状态实现请求的 loading 效果。代码如下。
    先说结论（效果不好，只能用于数据展示，涉及增删操作目前尝试无法实现）
  ```js
  /**
  *  1. 初始化：查询数据，抛出 promise
  *  2. 加载中: 直接抛出 promise
  *  3. 加载完成：设置 promise 返回的数据
  */
  export const showLoadingFetch = (fetch: () => Promise<any>): any => {
    let status = "uninit"
    let data = null
    let promise = null
    return () => {
      switch(status){
        // 初始状态，发出请求并抛出 promise
        case "uninit": {
          const p = fetch()
            .then(x => {
              status = "resolved"
              data = x
            })
            status = "loading"
            promise = p
          throw promise
        };
        // 加载状态，直接抛出 promise
        case "loading": throw promise;
        // 如果加载完成直接返回数据
        case "resolved": return data;
        default: break;
      }
    }
  }

  function mockApi(){
    return delay(2000).then(() => "data fetched")
  }

  const fnDataGet = showLoadingFetch(mockApi)


  function TestDataLoad(){

    let data = fnDataGet()

    return (
        <p>{data}</p>
    )
  }
  ```



#### TODO_LIST
1. gitlab ci 加上缓存等优化（待做）
2. <del>错误边界问题添加（待做），测试错误搜集可靠程度 </del>(已完成)
3. 实现守卫和预加载？（待做）