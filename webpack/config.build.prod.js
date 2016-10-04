/**
 * Build : Production
 *
 * Outputs a build of the app to /build/production
 * Includes optimisations for production-ready app build
 */

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

  context: root,
  entry: `./${srcDir}/scripts/index.js`,

  output: {
    path: outputDir,
    filename: 'app.js',
    publicPath: '/assets/'
  },

  plugins: [ webpackEnv, webpackDeDupe, webpackMinify ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          'presets': ['react', 'es2015']
        },
        include: [
          path.join(root, srcDir, 'scripts'),
          path.join(root, srcDir, 'styles'),
          path.join(root, srcDir, 'images')
        ]
      },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.{jpg|png|gif}$/, loader: 'file-loader' }
    ]
  },

  stylus: {
    preferPathResolver: 'webpack'
  }
}
