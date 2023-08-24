const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin('monaco').use(
      new MonacoWebpackPlugin({
        languages: ['json']
      })
    )
    config.plugin('circular').use(new CircularDependencyPlugin())
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
    }
  }
})
