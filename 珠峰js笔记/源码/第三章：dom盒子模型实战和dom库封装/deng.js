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


    window.$ = window.deng = deng;
})(window, document);