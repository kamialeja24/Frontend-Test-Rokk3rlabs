// Require Gulp
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    eslint = require('gulp-eslint'),
    clean = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect')
    // concatCss = require('gulp-concat-css'),
    // del = require('del'),
    // gls = require('gulp-live-server')


gulp.task('sass', function () {
  return gulp.src('app/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(connect.reload());
});
gulp.task('js', function(){
  return gulp.src('app/**/*.js')
  .pipe(uglify())
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('assets/js'))
  .pipe(connect.reload());
});

gulp.task('clean', function () {
  return gulp.src("assets/*", { read: false }).pipe(clean());
});

gulp.task('lint', () => {
    return gulp.src(['./app/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task('html',function(){
  return gulp.src(['app/components/**/*.html', 'index.html'])
  .pipe(connect.reload());
});
gulp.task('watch', function(){
  // Watch .css files
  gulp.watch('app/**/*.sass', ['sass']);
  // Watch .js files
  gulp.watch('app/**/*.js', ['js']);
  // Watch html files
  gulp.watch(['app/components/**/*.html', 'index.html'], ['html']);
});

gulp.task('connect',function(){
  connect.server({
    root: './',
    livereload: true
  });
});
gulp.task('serve',['sass','js','watch','connect'],function(){

});
