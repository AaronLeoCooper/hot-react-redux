/**
 * Build : Development
 *
 * Outputs a build of the app to /build/development
 * Similar to build:production, but without optimisations
 */

const path = require('path')
const webpack = require('webpack')

const root = path.join(__dirname, '../')
const srcDir = 'src'
const outputDir = 'dist/development'

const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
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

  plugins: [ webpackEnv ],

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
