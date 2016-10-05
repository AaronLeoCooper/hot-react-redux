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
  ? [ webpackEnv, webpackDeDupe, webpackOccuranceOrder, webpackMinify ]
  : [ webpackEnv ]

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
      scripts: path.resolve(root, srcDir, 'scripts')
    },
    extensions: ['', '.js', '.jsx']
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
          path.join(root, srcDir, 'scripts')
        ]
      }
    ]
  },

  plugins: plugins
}
