// 函数的方式定义模块 如果是多个没有名字的模块，只有第一个有效！
define(function () {
    function defineModuleFunction() {
        console.log('用函数的模式定义模块！');
    }
    defineModuleFunction();
});