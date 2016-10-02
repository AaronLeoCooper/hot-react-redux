const path = require('path')
const webpack = require('webpack')

const srcDir = './src'
const outputDir = './dist/production'

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

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: [
    './src/scripts/index.js'
  ],

  output: {
    path: path.join(__dirname, outputDir),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  plugins: [ webpackEnv, webpackDeDupe, webpackMinify ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          'presets': ['es2015', 'react']
        },
        include: path.join(__dirname, srcDir)
      },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.{jpg|png|gif}$/, loader: 'file-loader' }
    ]
  },

  stylus: {
    preferPathResolver: 'webpack'
  }
}
