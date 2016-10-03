const path = require('path')
const webpack = require('webpack')

const srcDir = './src'
const outputDir = './dist/development'

const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
})

module.exports = {
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    `${srcDir}/scripts/index.js`
  ],

  output: {
    path: path.join(__dirname, '../', outputDir),
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
          'presets': ['es2015', 'react'],
          'plugins': ['react-hot-loader/babel']
        },
        include: path.join(__dirname, '../', srcDir)
      },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.{jpg|png|gif}$/, loader: 'file-loader' }
    ]
  },

  stylus: {
    preferPathResolver: 'webpack'
  }
}
