const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
// 用于返回文件相对于根目录的绝对路径
const resolve = dir => path.posix.join(__dirname, '..', dir)
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: resolve('client/src/entry-server.js'),
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: []
  },
  devtool: false,
  plugins: [
    new VueSSRServerPlugin()
  ]
})
