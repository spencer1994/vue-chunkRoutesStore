// 根据context 动态引入依赖
// see: https://doc.webpack-china.org/guides/dependency-management/#require-context

const getChunks = (modulesContext) => {
  const chunks = modulesContext.keys().reduce((modules, key) => {
    modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key).default
    return modules
  }, {})

  return chunks
}
module.exports = {
  install: (Vue, {router, routerContext, store, storeContext}) => {
    if (!router && !store) {
      console.error('auto-route-store need options: router or store')
      return
    }
    if (router) {
      const routerChunks = getChunks(routerContext)
      Object.keys(routerChunks).forEach((item) => {
        router.addRoutes(routerChunks[item])
      })
    }
    if (store) {
      const storeChunks = getChunks(storeContext)
      Object.keys(storeChunks).forEach((item) => {
        store.registerModule(item, storeChunks[item])
      })
    }
  }
}
