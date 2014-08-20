var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var react = require('gulp-react');

var styles = 'src/*.scss';
var scripts = 'src/*.js';

gulp.task('styles', function () {
  return gulp.src(styles)
    .pipe(sass())
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('built'));
});

gulp.task('jsx', function () {
  return gulp.src(scripts)
    .pipe(react())
    .pipe(gulp.dest('built'));
});

gulp.task('watch', function () {
  gulp.watch(styles, ['styles']);
  gulp.watch(scripts, ['jsx']);
});

gulp.task('default', ['watch', 'styles', 'jsx']);

gulp.task('build', ['styles', 'jsx']);
