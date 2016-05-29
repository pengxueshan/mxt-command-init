var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var exists = fs.existsSync;
var write = fs.writeFileSync;
var mkdir = fs.mkdirSync;

exports.name = 'init';
exports.usage = '<mobile|pc|react|conf>';
exports.desc = 'scaffold with specifed template mobile or pc or just update fis-conf.js file. default is pc';

exports.register = function (commander) {
    commander
        .action(function (template) {
            var args = [].slice.call(arguments);
            var tpl = ['pc', 'mobile', 'react'];

            var settings = {
                template: tpl.indexOf(args[0]) >= 0 ? args[0] : 'pc'
            };

            // 根据 fis-conf.js 确定 root 目录
            Promise.try(function () {
                if (!settings.root) {
                    var findup = require('findup');

                    return new Promise(function (resolve, reject) {
                        var fup = findup(process.cwd(), 'fis-conf.js');
                        var dir = null;

                        fup.on('found', function (found) {
                            dir = found;
                            fup.stop();
                        });

                        fup.on('error', reject);

                        fup.on('end', function () {
                            resolve(dir);
                        });
                    }).then(function (dir) {
                            settings.root = dir || process.cwd();
                        });
                }
            }).then(function () {// prompt
                fis.log.info('Current Dir: %s', settings.root);
            }).then(function () {
                fis.log.info("settings: ", settings);
                var projectDir = settings.root;

                copyFiles(projectDir, settings.template);

                if (settings.template === 'mobile' || settings.template === 'pc') {
                    var dirs = ['font', 'img', 'slice'];

                    dirs.forEach(function (dir) {
                        if (!exists(projectDir + '/src/' + dir))
                            mkdir(projectDir + '/src/' + dir);
                    });
                    fis.log.info('mkdir empty dirs: ', dirs, " [OK]");

                    fis.log.info('init ' + settings.template + ' project done!');
                }
            });

        });
};

function copyFiles(projectDir, template) {
    if ('pc' === template || 'mobile' === template) {
        var fisConf = fs.readFileSync(__dirname + '/templates/fis-conf.js', {encoding: 'utf8'});

        write(projectDir + "/fis-conf.js", fisConf, {encoding: 'utf8'});
        fis.log.info("generate fis-conf.js OK");
    }
    
    if ('react' === template) {
        fis.util.copy(__dirname + "/templates/react", projectDir, null, null, true);
    }

    if (template !== 'mobile' && template !== 'pc') {
        fis.log.info("just update fis-conf.js file!");
        return false;
    }

    if ('pc' === template) {
        fis.util.copy(__dirname + "/templates/pc", projectDir + '/src', null, null, true);
    } else if ('mobile' === template) {
        fis.util.copy(__dirname + "/templates/mobile", projectDir + '/src', null, null, true);
    }
    fis.log.info("copy html, css, js files OK!");
}
