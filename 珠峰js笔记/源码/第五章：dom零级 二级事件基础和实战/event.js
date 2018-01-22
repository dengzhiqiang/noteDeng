/*事件库*/
function bind(ele, type, fn) {
    if ("addEventListener" in document) {
        ele.addEventListener(type, fn, false);
        return;
    }


    // 给函数化妆 ，这里不能使用全局变量，因为全局变量的话，最后移除的总是最后的函数
    var tempFun = function () {
        fn.call(ele);
    };
    tempFun.flag = fn;
    if (Object.prototype.toString.call(ele['bind' + type]) !== "[object Array]") {
        ele['bind' + type] = [];
    }

    alert(ele['bind' + type].length);

    // 防止IE重复绑定函数：IE中，可以给一个行为，绑定同一个函数多次，而其他浏览器不行
    for (var i = 0, len = ele['bind' + type].length; i < len; i++) {
        if (ele['bind' + type][i].flag === fn) {
            return;
        }
    }


    //  bind(box,click,fn1)
    //  bind(box,click,fn2)
    //  bind(box,mouseover,fn1)
    //  bind(box,mouseover,fn2)

    // ele['bindclick'] = [
    //  tempFun.flag和tempFun,
    // ];
    ele['bind' + type].push(tempFun);


    ele.attachEvent('on' + type, tempFun);
}
function unbind(ele, type, fn) {
    if ("removeEventListener" in document) {
        ele.removeEventListener(type, fn, false);
        return;
    }
    for (var i = 0, len = ele['bind' + type].length; i < len; i++) {
        if (fn === ele['bind' + type][i].flag) {
            ele.detachEvent('on' + type, fn);
            // 找到后，将自己存储在容器中的对应元素删除
            ele['bind' + type].splice(i, 1);
            break;
        }
    }

}

























































