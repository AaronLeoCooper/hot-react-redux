/**
 * Gulpfile for automating build tasks for development & production
 */

const env = process.env.NODE_ENV || 'development'
const usingHMR = process.env.HMR === 'true' || false
const isProduction = env === 'production'

const path = require('path')
const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const size = require('gulp-size')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')

const runSequence = require('run-sequence')

const autoprefixerBrowsers = [ 'ie >= 9', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 23', 'ios >= 6', 'android >= 4.4', 'bb >= 10' ]

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfigSrc = usingHMR ? './webpack/config.hmr' : './webpack/config.build'
const webpackConfig = require(webpackConfigSrc)

const root = __dirname
const srcDir = path.join(root, 'src')
const outputDir = isProduction ? path.join(root, 'dist/production') : path.join(root, 'dist/development')

const srcPath = {
  scripts: path.join(srcDir, 'scripts'),
  styles: path.join(srcDir, 'styles'),
  images: path.join(srcDir, 'images'),
  html: srcDir
}

const distPath = {
  scripts: path.join(outputDir, 'assets', 'scripts'),
  styles: path.join(outputDir, 'assets', 'styles'),
  images: path.join(outputDir, 'assets', 'images'),
  html: outputDir
}



gutil.log(` --- Gulp running for: ${env} --- `)
gutil.log(` --- Webpack config loaded: ${webpackConfigSrc} --- `)

gulp.task('stylus', function (cb) {
  var localsStylus = {} // local variables visible inside stylus sheets

  return gulp.src(path.join(srcPath.styles, 'app.styl'))
    .pipe(!isProduction ? plumber() : gutil.noop())
    .pipe(stylus({
      compress: isProduction,
      'include css': true,
      linenos: true,
      define: localsStylus
    }))
    .pipe(autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(gulp.dest(path.join(distPath.styles)))
    .pipe(size({ title: 'stylus' }))
})

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
    publicPath: webpackConfig.output.publicPath
    // publicPath: webpackConfig.output.publicPath
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err)
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/dist/development/index.html')
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
  gulp.watch(path.join(srcPath.styles, '**/*'), ['stylus', 'webpack-dev-server'])
  gulp.watch(path.join(srcPath.images, '**/*'), ['images', 'webpack-dev-server'])
  // gulp.watch(path.join(srcPath.scripts, '**/*'), ['webpack-dev-server'])
  gulp.watch(path.join(srcPath.html, '*.html'), ['html', 'webpack-dev-server'])
})

// default development - watch & HMR
gulp.task('default', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ default ]')
  runSequence(['html', 'stylus', 'images'], ['webpack-dev-server', 'watch'], cb)
})

// build:dev
gulp.task('build:dev', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ build:dev ]')
  runSequence(['html', 'stylus', 'images'], 'webpack-build', cb)
})

// build:prod
gulp.task('build:prod', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ build:prod ]')
  runSequence(['html', 'stylus', 'images'], 'webpack-build', cb)
})
