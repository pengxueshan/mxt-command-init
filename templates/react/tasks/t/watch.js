var gulp = require('gulp');
var config = require('../config.js').watch;

gulp.task('watch', function() {
  gulp.watch(config.js, ['webpack']);
  gulp.watch(config.style, ['style']);
  gulp.watch(config.copy, ['copy']);
  gulp.watch(config.iconfont, ['iconfont']);
});
