/**
 * Gulpfile for automating build tasks for development & production
 */

const env = process.env.NODE_ENV || 'production'
const isProduction = env === 'production'

const path = require('path')
const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const stylus = require('gulp-stylus')
const size = require('gulp-size')
const autoprefixer = require('gulp-autoprefixer')
const pug = require('gulp-pug')
const runSequence = require('run-sequence')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack/config.hmr')

const autoprefixerBrowsers = [ 'ie >= 9', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 23', 'ios >= 6', 'android >= 4.4', 'bb >= 10' ]



const root = __dirname
const srcDir = path.join(root, 'src')
const outputDir = isProduction ? path.join(root, 'dist/production') : path.join(root, 'dist/development')

const srcPath = {
  scripts: path.join(srcDir, 'scripts'),
  styles: path.join(srcDir, 'styles'),
  images: path.join(srcDir, 'images'),
  pug: srcDir
}

const distPath = {
  scripts: path.join(outputDir, 'assets', 'scripts'),
  styles: path.join(outputDir, 'assets', 'styles'),
  images: path.join(outputDir, 'assets', 'images'),
  pug: outputDir
}



gulp.task('styl', function (cb) {
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
    .pipe(size({ title: 'styles' }))
})

gulp.task('pug', function (cb) {
  var locals = {} // local variables visible inside pug files

  return gulp.src(path.join(srcPath.pug, '*.pug'))
    .pipe(!isProduction ? plumber() : gutil.noop())
    .pipe(pug({
      pretty: true,
      locals: locals
    }))
    .pipe(gulp.dest(distPath.pug))
    .pipe(size({ title: 'pug' }))
})

gulp.task('images', function (cb) {
  return gulp.src(path.join(srcPath.images, 'images/**/*'))
    .pipe(!isProduction ? plumber() : gutil.noop())
    .pipe(gulp.dest(path.join(distPath.images)))
    .pipe(size({ title: 'images' }))
})

gulp.task('webpack-dev-server', function (cb) {
  new WebpackDevServer(webpack(webpackConfig)).listen(3000, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err)
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/src')
  })
})

gulp.task('webpack-build', function (cb) {

})

gulp.task('clean', function (cb) {
  return del(path.join(distPath), { force: true }, cb)
})

gulp.task('watch', function () {
  gulp.watch(path.join(srcPath.styles, '*.styl'), ['styl'])
  gulp.watch(path.join(srcPath.images, '**/*'), ['images'])
  gulp.watch(path.join(srcPath.scripts, '**/*'), ['webpack-dev-server'])
  gulp.watch(path.join(root, '*.pug'), ['pug'])
})



// default development - watch & HMR
gulp.task('default', /*['clean'],*/ function (cb) {
  runSequence(['pug', 'styl', 'images'], ['webpack-dev-server', 'watch'], cb)
})

// build:dev
gulp.task('build:prod', /*['clean'],*/ function (cb) {
  runSequence('webpack-build', ['pug', 'styl', 'images'], cb)
})

// build:prod
gulp.task('build:prod', /*['clean'],*/ function (cb) {
  runSequence('webpack-build', ['pug', 'styl', 'images'], cb)
})
