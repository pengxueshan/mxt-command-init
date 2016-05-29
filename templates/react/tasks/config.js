var src = './src';
var dest = './dist';
var fs = require('fs');
var path = require('path');
var pwd = process.cwd();
var packageJson = require(path.join(pwd, 'package.json'));
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    webpack: {
        entry: {
            Main: src + '/js/index.jsx'
        },
        output: {
            path: dest + '/js',
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: [/jquery/, /underscore/, /highcharts/, /socket.io-client/, /jspath/, /lib\/Chart.js/],
                    loader: 'babel-loader?presets[]=react,presets[]=es2015'
                },
                {
                    test: /\.scss$/,
                    loader: 'style!css!postcss!sass'
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-loader'
                }
            ]
        },
        postcss: function () {
            return [precss, autoprefixer({ browsers: ['last 2 versions'] })];
        },
        resolve: {
            root: pwd,
            alias: {
                react$: 'react/lib/ReactWithAddons'
            },
            extensions: ['', '.js', '.jsx']
        },
    },
    style: {
        src: src + '/css/**/*.{sass,scss,css}',
        dest: dest + '/css',
    },
    copy: {
        src: [src + '/**/*', '!' + src + '/css/**/*', '!' + src + '/js/**/*', '!' + src + '/icon/**'],
        dest: dest
    },
    iconfont: {
        src: src + '/icon/*.svg',
        fontName: 'myfont',
        fontDest: dest + '/font',
        cssDest: dest + '/css',
        className: 'icon',
        cssTemplate: src + '/icon/templates/myfont.css',
        fontPathInCss: '../font'
    },
    watch: {
        js: [src + '/js/**/*'],
        style: [src + '/css/**/*'],
        iconfont: [src + '/icon/**/*'],
        copy: [src + '/**/*', '!' + src + '/css/**/*', '!' + src + '/js/**/*']
    }
};
