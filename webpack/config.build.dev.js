/**
 * Build : Development
 *
 * ======== This config extends _base.config.js ========
 *
 * Outputs a build of the app to /build/development
 * Similar to build:production, but without optimisations
 */

const path = require('path')
const webpack = require('webpack')

const root = path.join(__dirname, '../')
const srcDir = 'src'
const outputDir = 'dist/development/assets'

const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
})

/**
 * Export build:dev config
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

  plugins: [ webpackEnv ]
})
