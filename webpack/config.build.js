/**
 * Build Webpack Config
 *
 * Outputs a build of the app to /build/development or build/production
 * (Dependant on NODE_ENV)
 */

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production' || false

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const root = path.join(__dirname, '../')
const srcDir = 'src'
const outputDir = isProduction ? 'dist/production/assets/scripts' : 'dist/development/assets/scripts'

const webpackDeDupe = new webpack.optimize.DedupePlugin()
const webpackOccuranceOrder = new webpack.optimize.OccurenceOrderPlugin()
const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(env)
  }
})
const webpackMinify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: true
  }
})

const plugins = isProduction
  ? [ webpackEnv, new ExtractTextPlugin('styles.css'), webpackDeDupe, webpackOccuranceOrder, webpackMinify ]
  : [ webpackEnv, new ExtractTextPlugin('styles.css') ]

const devtool = isProduction ? 'cheap-module-source-map' : 'eval'



/**
 * Export build config
 */

module.exports = {
  debug: false,
  devtool: devtool, // default: Production sourcemaps

  context: root, // default: up 1 directory from this file's location

  entry: `./${srcDir}/scripts/index.js`,

  resolve: {
    alias: {
      scripts: path.resolve(root, srcDir, 'scripts'),
      styles: path.resolve(root, srcDir, 'styles'),
      images: path.resolve(root, srcDir, 'images')
    },
    extensions: ['', '.js', '.jsx', '.styl']
  },

  output: {
    path: path.join(root, outputDir),
    filename: 'app.js',
    publicPath: '/assets/scripts/'
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'),
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

  postcss: function () {
    return [ autoprefixer ]
  },

  plugins: plugins
}
