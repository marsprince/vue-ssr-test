const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    splitChunks:{
      name: "manifest",
      minChunks: Infinity
    }
  },
  output: {
    // chunkhash是根据内容生成的hash, 易于缓存,
    // 开发环境不需要生成hash，目前先不考虑开发环境，后面详细介绍
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[id].[chunkhash].js'
  },
  module: {
    rules: []
  },
  devtool: false,
  plugins: [
    //  当vendor模块不再改变时, 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})
