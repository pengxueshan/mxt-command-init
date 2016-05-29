var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now()/1000);
var async = require('async');
var consolidate = require('gulp-consolidate');
var config = require('../config').iconfont;
 
gulp.task('iconfont', function(done){
  var iconStream = gulp.src([config.src])
    .pipe(iconfont({
      prependUnicode: true, // recommended option 
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available 
      timestamp: runTimestamp, // recommended to get consistent builds when watching files 
      fontName: config.fontName, // required 
    }));
 
  async.parallel([
    function handleGlyphs (cb) {
      iconStream.on('glyphs', function(glyphs, options) {
        gulp.src(config.cssTemplate)
          .pipe(consolidate('lodash', {
            glyphs: glyphs,
            fontName: config.fontName,
            fontPath: config.fontPathInCss,
            className: config.className
          }))
          .pipe(gulp.dest(config.cssDest))
          .on('finish', cb);
      });
    },
    function handleFonts (cb) {
      iconStream
        .pipe(gulp.dest(config.fontDest))
        .on('finish', cb);
    }
  ], done);
});
