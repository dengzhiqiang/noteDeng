// if ( typeof define === "function" && define.amd ) {
//     define( "jquery", [], function() {
//         return jQuery;
//     } );
// }

// 在jquery的9778行有上面的那段代码
// 如果是define.amd 也就是requirejs异步模块化的代码
// 则会定义一个叫做jquery的模块，这个模块没有任何的依赖
// 注意这里的jquery是小写的模块

// require.config({
//     baseUrl: './',
//     paths: {
//         jquery: './app/lib/jquery.min'  // 注意这里的jquery应该是小写
//     }
// });