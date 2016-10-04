/**
 * Dev Server
 *
 * This runs a local server with webpack's HMR (Hot Module Replacement)
 * enabled to speed up development
 * Serves to: localhost:3000/webpack-dev-server/src
 */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack/config.hmr')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at localhost:3000, go to: http://localhost:3000/webpack-dev-server/src for HMR development')
})
