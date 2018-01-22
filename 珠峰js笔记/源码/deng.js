(function (window, document, undefined) {

    var deng = {};


    /**
     * 类型检测
     * @type {}
     */
    deng.type = {

        /**
         * 判断数据类型
         * @param obj 要传入的指
         * @returns {string} 返回小写的字符串 Boolean Number String Function Array Date RegExp Object Error Symbol ...
         * 基本数据类型有5种：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、
         * 其他数据类型对象（Object）数组 Array 等等
         */
        type: function (obj) {
            var list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol'];
            var temp = [];
            for (var i = 0, len = list.length; i < len; i++) {
                temp['[object ' + list[i] + ']'] = list[i].toLowerCase();
            }

            // 如果是 undefined null
            if (obj == null) {
                return obj + '';
            }
            // 这样判断主要是因为window对象，输出[object Window]
            // dom对象输出的是"Object.prototype.toString.call(document.body); [object HTMLBodyElement]"
            return typeof obj === 'object' || typeof obj === 'function'
                ? temp[Object.prototype.toString.call(obj)] || 'object'
                : typeof obj; //  typeof 基本数据类型，使用这个

        },

        isArray: Array.isArray || function (obj) {
            /*判断是否为数组*/
            return $.type.type(obj) === 'array';
        },
        isArrayLike: function (obj) {

            // Support: iOS 8.2 (not reproducible in simulator)
            // 支持：iOS 8.2（模拟器中不可复制）
            // `in` check used to prevent JIT error (gh-2145)
            //  用于防止JIT错误的检查
            // hasOwn isn't used here due to false negatives
            // 有自己不是由于这里使用假阴性
            // regarding Nodelist length in IE
            // 节点列表的长度
            var length = !!obj && "length" in obj && obj.length,
                type = deng.type.type(obj);

            // function test(a,b,c){}    test.length = 3
            // 函数的length属性代表的形参的个数

            // window.length 表示窗口中iframe框架的数量
            // window.frames.length也表示iframe框架的数量
            if (type === "function" || deng.type.isWindow(obj)) {
                return false;
            }

            return type === "array" || length === 0 ||
                typeof length === "number" && length > 0 && ( length - 1 ) in obj;
        },
        isFunction: function (obj) {
            /*是否为函数*/
            return $.type.type(obj) === 'function';
        },
        isWindow: function (obj) {
            /*是否为window对象*/
            /*window有window这个属性*/
            /*iframe 没有window这个属性*/
            return obj != null && obj.window === window;
        }

    };
    /**
     * 调试器
     * 不支持console.log的浏览器，直接输出到也上面
     * @type
     */
    deng.debug = {
        /**
         * 测试结果
         * @param obj
         */
        write: function (obj) {
            if (window.console) {
                console.log(obj);
            } else {
                var div = document.createElement('div');
                div.style.backgroundColor = 'darkgreen';
                div.innerHTML = obj;
                document.body.appendChild(div);
            }

        }
    };

    deng.property = {
        /**
         * 只存在于原型中的属性
         * @param obj 对象
         * @param name 属性名
         */
        hasPrototypeProperty: function (obj, name) {
            return !obj.hasOwnProperty(name) && (name in obj);
        }
    };

    /**
     * 遍历数组和对象
     * @param obj
     */
    deng.each = function (obj, callback) {
        var i;
        // 如果是数组或者类数组
        if (deng.type.isArrayLike(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                // callback中的this就是obj[i]
                // 如果callback函数返回的是false 则终止循环,只有返回的是false的时候才是终止循环
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
    };

    /**
     * dom相关的操作
     * @type {{}}
     */
    deng.dom = {
        /**
         * window的宽度和高度
         * 获取视口的宽度
         */
        win: function () {
            var width, height;
            width = window.innerWidth; // 包含了滚动条 一般用于求视口的宽度
            height = window.innerHeight;
            if (typeof width !== 'number') {
                width = document.documentElement.clientWidth || document.body.clientWidth; // 未包含滚动条
                height = document.documentElement.clientHeight || document.body.clientHeight;
            }
            return {
                width: width,
                height: height
            }
        },
        offset: function (elem, options) {
            //    获取匹配元素在当前视口的相对偏移。相对于页面的左上角，而不是视口的左上角
            //    返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。
            if (arguments.length == 2) {

                return;
            }
            // 设置盒子默认的元素的宽度和高度
            var box = {top: 0, left: 0},
                html = document.documentElement;
            // getBoundingClientRect所有浏览器都支持
            if (typeof elem.getBoundingClientRect !== 'undefined') {
                // 获取的元素是相对于视口的左上角
                box = elem.getBoundingClientRect();
            }

            return {
                top: box.top + (window.pageYOffset || html.scrollTop) + (html.clientTop || 0),
                left: box.left + (window.pageXOffset || html.scrollLeft) + (html.clientLeft || 0)
            }
        },
        

    };


    window.$ = window.deng = deng;
})(window, document);