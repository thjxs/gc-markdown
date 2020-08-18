const gulp = require('gulp')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const rimraf = require('rimraf')
const merge = require('merge2')
const tsConfig = require('./tsconfig.json').compilerOptions

function babelify(js) {
  return js.pipe(babel()).pipe(gulp.dest('lib'))
}

function compile() {
  rimraf.sync('lib')
  const source = [
    'src/**/*.ts',
    'src/**/*.tsx'
  ]
  const tsResult = gulp.src(source).pipe(ts(tsConfig))
  return merge([
    tsResult.dts.pipe(gulp.dest('lib')),
    babelify(tsResult.js)
  ])
}

gulp.task('default', (done) => compile().on('finish', done))
