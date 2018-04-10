#### 因为webpack的require.context的第一个参数只支持字面量，无法使用变量，所以本项目的路径是写死的，具体可以在chunkRoutesStore文件中修改，或者在webpack的alias配置中添加别称。

+ 路由的路径为`~/routes`，在webpack的alias别称中添加了`~`来代替`src`，`~/routes`即是`src`下的`routes`文件夹。

+ 同理`~/store/modules`即为`src/store/modules`文件夹。

#### 使用了这个插件后。

#### 不需要在`routes/index.js`中写routes，会自动检索`src/routes`下的所有除了index.js的js文件，自动注册到路由中。

#### 不需要在`store/index.js`中写入modules，会自动检索`src/store/modules`下所有的js文件，自动注册到store中。

#### 额外技巧：使用require.context也可以放到相应的components、mixins、filters、directives中减少重复export到外部的工作。

>使用方法

``` js

import store from '~/store'
import router from '~/routes'

import chunkRoutesStore from './chunkRoutesStore'

Vue.use(chunkRoutesStore, {router, store})
```

>注意事项

因webpack在dev下的缓存配置问题，当删除目录下的文件夹时，需要`npm run dev`重新启动项目来更新缓存

#### 目录

```
|__src
  |__routes
    |__index.js
    |__demo1-router.js
    |__demo2-router.js
  |__store
    |__modules
      |__demo1-store.js
      |__demo2-store.js
    |__global.js
    |__index.js
```

#### `routes/index.js`
``` js
import Vue from 'vue'   // 引入vue
import VueRouter from 'vue-router'   // 引入vue-router

const router = new VueRouter({
  routes: []
})

Vue.use(VueRouter)

export default router

```

#### `store/index.js`

``` js
import Vue from 'vue'
import Vuex from 'vuex'

import global from '~/store/global'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global
  }
})

export default store

```
