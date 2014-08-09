var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

var styles = './*.scss';

gulp.task('styles', function () {
  return gulp.src(styles)
    .pipe(sass())
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  gulp.watch(styles, ['styles']);
});

gulp.task('default', ['watch', 'styles']);
