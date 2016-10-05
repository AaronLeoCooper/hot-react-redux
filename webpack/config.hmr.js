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
    publicPath: '/assets/scripts/'
  },

  resolve: {
    alias: {
      scripts: path.resolve(root, srcDir, 'scripts'),
      styles: path.resolve(root, srcDir, 'styles'),
      images: path.resolve(root, srcDir, 'images')
    },
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass', '.jpg', '.png', '.gif']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: [
          path.join(root, srcDir, 'scripts'),
          path.join(root, srcDir, 'styles'),
          path.join(root, srcDir, 'images')
        ]
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap' ],
        include: [
          path.join(root, srcDir, 'styles'),
          path.join(root, srcDir, 'images')
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url?limit=25000',
        include: path.join(root, srcDir, 'images')
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file?name=[path][name].[hash].[ext]',
        include: path.join(root, srcDir, 'images')
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
