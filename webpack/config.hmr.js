/**
 * HMR (Hot Module Replacement)
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



/**
 * Export hmr (npm start) config
 */

module.exports = {
  // debug: true,
  devtool: 'eval',

  context: root, // default: up 1 directory from this file's location

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    `./${srcDir}/scripts/index.hmr.js`
  ],

  output: {
    path: path.join(root, outputDir),
    filename: 'app.js',
    publicPath: '/dist/development/assets/scripts/'
  },

  resolve: {
    alias: {
      scripts: path.resolve(root, srcDir, 'scripts')
    },
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: [
          path.join(root, srcDir, 'scripts')
        ]
      }
    ]
  },

  plugins: [ new webpack.HotModuleReplacementPlugin() ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true
  }
}
