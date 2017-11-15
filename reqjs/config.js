/*({
    baseUrl: './js',
    paths: {
        math: './clac/math',// 如果是相对 ，是根据baseUrl来的
        teacher: ['./school/teacherGood', './school/teacherBad'],// 当第一个加载失败的时候模糊加载，第二个资源
        shimBook: './shim/shimBook',
        shimPen: './shim/shimPen',
        defineModule: './defineModule',
        defineModuleFunction: './defineModuleFunction',
        defineModuleMore: './defineModuleMore', // 要想加载同一个文件中的多个模块，需要这样操作
        defineModuleMore2: './defineModuleMore',// 要想加载同一个文件中的多个模块，需要这样操作
        text: './lib/text',
    },
    name: 'app',
    out: 'buld' + Math.random() + '.js',
})*/

// 如果是上面的，包含数组的方式，会报错误
//paths fallback not supported in optimizer. Please provide a build config path override for teacher
// 优化器不支持回退，改成单个的字符串就好了
({
    baseUrl: './js',
    paths: {
        math: './clac/math',// 如果是相对 ，是根据baseUrl来的
        teacher: './school/teacherGood',// 当第一个加载失败的时候模糊加载，第二个资源
        shimBook: './shim/shimBook',
        shimPen: './shim/shimPen',
        defineModule: './defineModule',
        defineModuleFunction: './defineModuleFunction',
        defineModuleMore: './defineModuleMore', // 要想加载同一个文件中的多个模块，需要这样操作
        defineModuleMore2: './defineModuleMore',// 要想加载同一个文件中的多个模块，需要这样操作
        text: './lib/text',
    },
    name: 'app',
    out: 'buld' + Math.random() + '.js',
})
