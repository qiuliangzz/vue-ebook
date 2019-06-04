// 接口模拟
// mock.js 下载BUG，只能使用文本不能使用block对象
function mock(app, url, data) {
  app.get(url, (request, response) => {
    response.json(data)
  })
}

const homeData = require('./src/mock/bookHome')
const listData = require('./src/mock/bookList')
const shelfData = require('./src/mock/bookShelf')
const flatListData = require('./src/mock/bookFlatList')

// webpack配置
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // devServer 提供虚拟服务器，让我们进行开发和调试
  devServer: {
    // 启动app之前
    before(app) {
      mock(app, '/book/home', homeData)
      mock(app, '/book/list', listData)
      mock(app, '/shelf', shelfData)
      mock(app, '/book/flatList', flatListData)
    }
  },
  configureWebpack: {
    performance: {
      hints: "warning",
      maxAssetSize: 524288,
      maxEntrypointSize: 524288
    }
  }
}
