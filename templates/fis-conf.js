fis.set('mxt', {
    useSprite: true, // 是否在开发阶段使用雪碧图合并
    useOptimize: false, // 是否压缩css
    useHash: false, // 是否给文件名加上hash值
});

// webfont 设置
fis.set('webfont',{
    src       : '/src/icon',//图标目录
    dest      : '/dist/font',  //产出字体目录
    fontname  : 'myfont', //产出字体名称
    destCss   : '/dist/css', // 产出的css目标文件夹
    destHtml  : '/dist/html', // 产出的html目标文件夹
    template  : '/src/icon/templates/template.css', // css模板文件
    htmlDemoTemplate: '/src/icon/templates/template.html' // html模板文件
});

// project.files 项目源码
// project.ignore 需要排除的文件
fis.set('project.files', ['/src/**', '/src/**/**'])
.set('project.ignore', ['node_modules/**', '.idea/**', '.gitignore', '.docs/**', 'editorconfig', 'dist/**', 'publish/**', '.dist/**', '.git/**', '.svn/**', 'gruntfile.js', 'gulpfile.js', 'fis-conf.js']);

// 让资源支持相对路径
fis.hook('relative');

var mxtConf = fis.get('mxt');

// 为所有资源配置通用属性
fis.match('*', {
    relative: true,
    useHash: false,
    _isResourceMap: false
});

// 页面模板不用编译缓存
fis.match('**.{html,htm,php}', {
    useCache: false,
});

// 样式文件使用的属性
fis.match('**.{css,less,scss}', {
    useSprite: mxtConf.useSprite,
    useHash: mxtConf.useHash,
    spriteRelease: '/src/sprite/$1.png',
    optimizer: mxtConf.useOptimize && fis.plugin('clean-css'),
    preprocessor: fis.plugin('autoprefixer', {
        browsers: ['> 0%']
    })
});

// 编译less文件
fis.match('**.less', {
    rExt: '.css',
    parser: fis.plugin('less')
});

// 编译scss文件
fis.match('**.scss', {
   rExt: '.css',
   parser: fis.plugin('node-sass')
});

// 字体文件处理
fis.match('/src/font/**', {
    useHash: mxtConf.useHash
});

// 图片文件处理
fis.match('/src/img/**', {
    useHash: mxtConf.useHash
}).match('/src/img/**.png', {
    optimizer: fis.plugin('png-compressor')
});

// js文件处理
fis.match('/src/js/**', {
    useHash: mxtConf.useHash
});

// 不需要发布的文件
fis.match('**_*.{css,less,scss}', {
    release: false
});

fis.match('/src/icon/**', {
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
fis.match('::package', {
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
fis.media('prod').match('**.js', {
    optimizer: fis.plugin('uglify-js')
}).match('**.css', {
    optimizer: fis.plugin('clean-css')
});
