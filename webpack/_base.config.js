/**
 * Build
 *
 * NOTE: this config is to be extended by dev and prod configs!
 * Do NOT use this config directly!
 */

const path = require('path')

const root = path.join(__dirname, '../')
const srcDir = 'src'
const outputDir = 'dist/development'



/**
 * Export base config
 *
 * NOTE! 'output' block not included, please specify *explicitly* in extending config!
 */

module.exports = {
  devtool: 'cheap-module-source-map', // default: Production sourcemaps

  context: root, // default: up 1 directory from this file's location

  entry: `./${srcDir}/scripts/index.js`,

  resolve: {
    alias: {
      scripts: path.resolve(root, srcDir, 'scripts'),
      styles: path.resolve(root, srcDir, 'styles')
    },
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
