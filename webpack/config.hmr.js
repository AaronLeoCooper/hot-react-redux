/**
 * HMR (Hot Module Replacement)
 *
 * ======== This config extends _base.config.js ========
 *
 * IMPORTANT: No files are outputted using HMR!!
 * This build is optimised to fully utilize Webpack's
 * HMR using webpack-dev-server. All file changes are
 * stored and retrieved from memory for fast development
 */

const path = require('path')
const webpack = require('webpack')

const root = path.join(__dirname, '../')
const srcDir = 'src'
const outputDir = 'dist/development/assets/scripts'

const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
})



/**
 * Export hmr (npm start) config
 *
 * This config extends _base.config.js
 */

const _baseConfig = require('./_base.config')

module.exports = Object.assign({}, _baseConfig, {
  debug: true,
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    `./${srcDir}/scripts/index.js`
  ],

  output: {
    path: path.join(root, outputDir),
    filename: 'app.js',
    publicPath: '/assets/scripts/'
  },

  plugins: [
    webpackEnv,
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true
  }
})
