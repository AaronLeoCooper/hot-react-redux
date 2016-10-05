/**
 * Gulpfile for automating build tasks for development & production
 */

const env = process.env.NODE_ENV || 'development'
const usingHMR = process.env.HMR === 'true' || false
const isProduction = env === 'production'
const webpackConfigSrc = usingHMR ? './webpack/config.hmr' : './webpack/config.build'

const path = require('path')
const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const size = require('gulp-size')
const runSequence = require('run-sequence')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require(webpackConfigSrc)

const root = __dirname
const srcDir = path.join(root, 'src')
const outputDir = isProduction ? path.join(root, 'dist/production') : path.join(root, 'dist/development')

const srcPath = {
  scripts: path.join(srcDir, 'scripts'),
  images: path.join(srcDir, 'images'),
  html: srcDir
}

const distPath = {
  scripts: path.join(outputDir, 'assets', 'scripts'),
  images: path.join(outputDir, 'assets', 'images'),
  html: outputDir
}

gutil.log(` --- Gulp running for: ${env} --- `)
gutil.log(` --- Webpack config loaded: ${webpackConfigSrc} --- `)

gulp.task('images', function (cb) {
  return gulp.src(path.join(srcPath.images, '**/*'))
    .pipe(!isProduction ? plumber() : gutil.noop())
    .pipe(gulp.dest(distPath.images))
    .pipe(size({ title: 'images' }))
})

gulp.task('html', function (cb) {
  return gulp.src(path.join(srcPath.html, '*.html'))
    .pipe(!isProduction ? plumber() : gutil.noop())
    .pipe(gulp.dest(distPath.html))
    .pipe(size({ title: 'html' }))
})

gulp.task('webpack-dev-server', function (cb) {
  new WebpackDevServer(webpack(webpackConfig), {
    historyApiFallback: true,
    hot: true,
    publicPath: '/static/'
    // publicPath: webpackConfig.output.publicPath
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err)
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/dist/development')
  })
})

const webpackBuild = (cb) => {
  return (err, stats) => {
    if (err) {
      gutil.log('Webpack Build Error', err)
      if (cb) cb()
    } else {
      Object.keys(stats.compilation.assets).forEach(function (key) {
        gutil.log('Webpack: output ', gutil.colors.green(key))
      })
      gutil.log('Webpack: ', gutil.colors.blue('finished'))
      if (cb) cb()
    }
  }
}

gulp.task('webpack-build', function (cb) {
  webpack(webpackConfig).run(webpackBuild(cb))
})

gulp.task('clean', function (cb) {
  return del(path.join(outputDir, '/*'), { force: true }, cb)
})

gulp.task('watch', function () {
  gulp.watch(path.join(srcPath.images, '**/*'), ['images'])
  gulp.watch(path.join(srcPath.scripts, '**/*'), ['webpack-dev-server'])
  gulp.watch(path.join(srcPath.html, '*.html'), ['html'])
})

// default development - watch & HMR
gulp.task('default', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ default ]')
  runSequence(['html', 'images'], ['webpack-dev-server', 'watch'], cb)
})

// build:dev
gulp.task('build:dev', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ build:dev ]')
  runSequence(['html', 'images'], 'webpack-build', cb)
})

// build:prod
gulp.task('build:prod', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ build:prod ]')
  runSequence(['html', 'images'], 'webpack-build', cb)
})
