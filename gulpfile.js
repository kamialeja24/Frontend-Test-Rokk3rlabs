// Require Gulp
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    eslint = require('gulp-eslint'),
    clean = require('gulp-rimraf'),
    concatJs = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    del = require('del'),
    gls = require('gulp-live-server')

gulp.task('sass', function () {
  return gulp.src('./app/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./tmp/css'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('./app/**/*.js'),
        uglify(),
        gulp.dest('tmp/js')
    ],
    cb
  );
});

gulp.task('concatjs', ['compress'], function () {
  return gulp.src('./tmp/js/**/*.js')
    .pipe(concatJs('scripts.js'))
    .pipe(gulp.dest('./assets/js/'));
})

gulp.task('concatcss', ['sass'], function(){
  return gulp.src('./tmp/css/**/*.css')
  .pipe(concatCss("bundle.css"))
  .pipe(gulp.dest('./assets/css/'));
})

gulp.task('clean', function () {
  return gulp.src("assets/*", { read: false }).pipe(clean());
});

gulp.task('cleanTmp', ['concatcss', 'concatjs'], function () {
  return del(['tmp']);
});

gulp.task('dist', ['clean'], function () {
  gulp.start('concatjs');
  gulp.start('concatcss');
});


gulp.task('lint', () => {
    return gulp.src(['./app/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', function() {
  gulp.start('dist');
});

gulp.task('serve', function(event) {
  var server = gls.static(['./', './assets']);
  server.start();

  // Watch .css files
  gulp.watch('app/**/*.css', ['concatcss'], function(file){
    server.notify.apply(server, [file]);
  });

  // Watch .js files
  gulp.watch('app/**/*.js', ['concatjs'], function(file){
    server.notify.apply(server, [file]);
  });

  gulp.watch(['dist/**', 'app/components/**/*.html', 'index.html'], function(file){
    server.notify.apply(server, [file]);
  });
});
