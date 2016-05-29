var gulp = require('gulp');
var sass = require('gulp-sass');
// var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var config = require('../config').style;

gulp.task('style', function() {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(config.dest));
});
