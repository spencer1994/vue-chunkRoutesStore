#### 因为webpack的require.context的第一个参数只支持字面量，无法使用变量，所以本项目的路径是写死的，具体可以在chunkRoutesStore文件中修改，或者在webpack的alias配置中添加别称。

+ 路由的路径为`~/routes`，在webpack的alias别称中添加了`~`来代替`src`，`~/routes`即是`src`下的`routes`文件夹。

+ 同理`~/store/modules`即为`src/store/modules`文件夹。

>使用方法

``` js
import chunkRoutesStore from './chunkRoutesStore'

Vue.use(chunkRoutesStore, {router, store})
```

>注意事项

因webpack在dev下的缓存配置问题，当删除目录下的文件夹时，需要`npm run dev`重新启动项目来更新缓存