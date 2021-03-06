var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var config = require('../config').webpack;

gulp.task("webpack", function(callback) {
    if (global.optimize) {
        if (config.plugins === undefined) config.plugins = [];
        config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});
