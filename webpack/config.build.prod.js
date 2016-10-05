/**
 * Build : Production
 *
 * ======== This config extends _base.config.js ========
 *
 * Outputs a build of the app to /build/production
 * Includes optimisations for production-ready app build
 */

const path = require('path')
const webpack = require('webpack')

const root = path.join(__dirname, '../')
const srcDir = './src'
const outputDir = './dist/production/assets'

const webpackDeDupe = new webpack.optimize.DedupePlugin()
const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
})
const webpackMinify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: true
  }
})

/**
 * Export build:prod config
 *
 * This config extends _base.config.js
 */

const _baseConfig = require('./_base.config')

module.exports = Object.assign({}, _baseConfig, {
  output: {
    path: path.join(root, outputDir),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  plugins: [ webpackEnv, webpackDeDupe, webpackMinify ]
})
