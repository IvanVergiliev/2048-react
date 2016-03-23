var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var babel = require('gulp-babel');

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
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('built'));
});

gulp.task('watch', function () {
  gulp.watch(styles, ['styles']);
  gulp.watch(scripts, ['jsx']);
});

gulp.task('default', ['watch', 'styles', 'jsx']);

gulp.task('build', ['styles', 'jsx']);
