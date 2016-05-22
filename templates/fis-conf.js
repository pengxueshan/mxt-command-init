fis.set("maft", {
    useSprite: false, // 是否在开发阶段使用雪碧图合并
    useOptimize: false, // 是否压缩css
    useHash: false, // 是否给文件名加上hash值
});

// project.files 项目源码
// project.ignore 需要排除的文件
fis.set('project.files', ['./src/**', './src/**/**'])
.set('project.ignore', ['node_modules/**', '.idea/**', '.gitignore', '**/_*.scss', '.docs/**', 'editorconfig', 'dist/**', 'publish/**', '.dist/**', '.git/**', '.svn/**', 'gruntfile.js', 'gulpfile.js', 'fis-conf.js']);

// 让资源支持相对路径
fis.hook('relative');

var maftConf = fis.get("maft");

// 为所有资源配置通用属性
fis.match('*', {
    relative: true,
    useHash: false,
    _isResourceMap: false
});

// 页面模板不用编译缓存
fis.match(/.*\.(html|htm|php)$/, {
    useCache: false,
});

// 样式文件使用的属性
fis.match(/.*\.(css|less|scss)$/i, {
    useSprite: maftConf.useSprite,
    useHash: maftConf.useHash,
    spriteRelease: '/img/$1.png',
    optimizer: maftConf.useOptimize && fis.plugin('clean-css')
});

// 编译less文件
fis.match(/.*\.less$/i, {
    rExt: '.css',
    parser: fis.plugin('less')
});

// 编译scss文件
fis.match(/.*\.scss$/i, {
   rExt: '.css',
   parser: fis.plugin('node-sass')
});

// 字体文件处理
fis.match("./src/font/**", {
    useHash: maftConf.useHash
});

// 图片文件处理
fis.match("./src/img/**", {
    useHash: maftConf.useHash
}).match('./src/img/**.png', {
    optimizer: fis.plugin('png-compressor')
});

// js文件处理
fis.match('./src/js/**', {
    useHash: maftConf.useHash
});

// 不需要发布的文件
fis.match(/.*\_.*\.(css|less|scss)$/i, {
    release: false
}).match('./src/slice/**', {
    release: false
});

// 所有文件产出到的目录
fis.match('**', {
    deploy: fis.plugin('local-deliver', {
        to: './dist', // 目标路径
        relative: 'src' // 相对的路径，在dist目录下不包含src
    })
});

// 打包阶段执行的任务
fis.match("::package", {
    spriter: fis.plugin('csssprites', {
        htmlUseSprite: true,
        layout: 'matrix',
        margin: '5',
        scale: 0.5,
        //px2rem: 16,  // 是否使用rem单位
        styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig
    })
});

// 生产环境压缩js和css
fis.media('prod')
    .match('**.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });
