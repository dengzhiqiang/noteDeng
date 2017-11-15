// npm install -g requirejs
require.config({
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
    // 不支持AMD的处理方式
    shim: {
        'shimBook': {
            exports: 'shimBook'
        },

        'shimPen': {
            deps: [],// 依赖的模块
            exports: 'shimPen',
            init: function ($) {
                // 初始化函数，返回的对象代替exports作为模块对象
                return $;
            }
        },
        // bootstarp:['jquery'], 有依赖，但是不用新全局变量，这样处理可以先让jquery加载，保证不出错
    },// （1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。
    // map:{
    //     // 在不同的版本中加载不同的模块
    //     'app/api':{
    //         jquery:'jquery'
    //     },
    //     'app/api2':{
    //         jquery:'jquery2'
    //     }
    // }
    // waitSeconds:7,// 下载等待的时间 requireJs的加载是一种异步机制，它加载js的时候有个默认的超时机制，当加载一个js超过一定时间的时候，它就会在浏览器中抛出模块加载超时错误，接下来，就不会加载这个模
    // urlArgs:'_='+Math.random(),// 下载等待的时间
});

// map的加载模式
// require(['app/api'],function ($) {
//
// });
// require(['app/api2'],function ($) {
//
// });

// cate:"/js/product/Category" 该文件是非AMD规范的JS,在使用的过程中遵循如下几个步骤:
// (1) paths中配置文件加载的路径, JSON中的 Key值可以随意,尽量有意义，JSON中的Value是文件的加载路径,这个不必多说
// (2) shim 中定义一个JSON对象, Key 值(shimBook) 与paths中定义的名字一样
// (3) shim中的JSON对象有两个属性: deps,exports ;  deps 为数组,表示其依赖的库, exports 表示输出的对象名


/**
 * 加载模块的时候，必须写成一个数组，尽管只有一个模块
 */
require(['math', 'shimBook', 'shimPen'], function (math, shimBook, shimPen) {
    shimBook();
    shimPen();
    console.log(math.add(1, 2));
});

require(['teacher'], function (teacher) {
    console.log(teacher.say(1, 4));
});
//
require(['defineModule'], function (defineModule) {
    console.dir(defineModule);
});

require(['defineModuleFunction'], function (defineModuleFunction) {
    defineModuleFunction;
});


// require(['defineModuleMore'], function (defineModuleMore) {
//     console.log(defineModuleMore);
// });
// require(['defineModuleMore2'], function (defineModuleMore) {
//     console.log(defineModuleMore());
// });

// 跨域请求
// JsonP是一种使用JS调用某些服务的方法。这是一个公认的解决跨域调用服务的方案，它只需要通过HTTP GET一段包含script标签的脚本。
// 只需要把回调函数参数值设为使用"define" ，就能用 RequireJS来实现JSONP。这意味着，你可以用JSONP的方式来获取一个模块。
// 最好只在初始化应用设置的时候使用这种方法。因为如果JSONP 服务超时，那其他通过define() 定义的模块将不会执行，并且异常处理也不能很好的运行。
// jsonp服务，JSONP的callback参数为"callback"，因此"callback=define"告诉API将JSON响应包裹到一个"define()"中。
// require(['http://api.jirengu.com/weather.php?callback=define'], function (weather) {
//     console.log(weather);
// });
//
// require(['text!../text.html!strip'], function (data) {
//     // 获取的是body中内容
//     console.log(data);
// });
//
//
// requirejs.onError = function (err) {
//     console.log(err);
// };
