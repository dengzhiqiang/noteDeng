// 在同一个文件中定义多个模块
define('defineModuleMore', function () {
    return {
        name:'more1'
    };
});



define('defineModuleMore2', function () {
    return function () {
        console.log('more2');
    }
});