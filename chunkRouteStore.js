// 根据context 动态引入依赖
// see: https://doc.webpack-china.org/guides/dependency-management/#require-context

const getChunks = (modulesContext) => {
  const chunks = modulesContext.keys().reduce((modules, key) => {
    modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key).default
    return modules
  }, {})

  return chunks
}
export default {
  install: (Vue, {router, store}) => {
    if (!router && !store) {
      console.error('chunkRoutesStore need options: router or store')
      return
    }
    if (router) {
      const routerContext = require.context('~/routes', true, /\.js$/)
      const routerChunks = getChunks(routerContext)
      Object.keys(routerChunks).forEach((item) => {
        if (item !== 'index') {
          router.addRoutes(routerChunks[item])
        }
      })
    }
    if (store) {
      const storeContext = require.context('~/store/modules', true, /\.js$/)
      const storeChunks = getChunks(storeContext)
      Object.keys(storeChunks).forEach((item) => {
        store.registerModule(item, {...storeChunks[item]})
      })
    }
  }
}
