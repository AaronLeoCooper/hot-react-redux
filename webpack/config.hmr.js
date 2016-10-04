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
const outputDir = 'dist/development'

const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
})

module.exports = {
  devtool: 'eval',

  context: root,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    `${srcDir}/scripts/index.js`
  ],

  output: {
    path: path.join(root, outputDir),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
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
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          'presets': ['react', 'es2015'],
          'plugins': ['react-hot-loader/babel']
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
