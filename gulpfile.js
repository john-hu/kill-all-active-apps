var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('default', function() {
  return gulp.src(['main.js', 'manifest.json', 'LICENSE', '**/icons/*'])
    .pipe(zip('extension.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('obsolete', function() {
  return gulp.src(['main.js', 'manifest.webapp', 'LICENSE', '**/icons/*'])
    .pipe(zip('application.zip'))
    .pipe(gulp.dest('./'));
});

