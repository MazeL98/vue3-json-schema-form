const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin('monaco').use(
      new MonacoWebpackPlugin({
        languages: ['json']
      })
    )
    config.plugin('circular').use(new CircularDependencyPlugin())
    config.plugin('compression').use(
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(js|css|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    )
    // if (process.env.use_analyzer) {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //     .end()
    // }
  }
})
