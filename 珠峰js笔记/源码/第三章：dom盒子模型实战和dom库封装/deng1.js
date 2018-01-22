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
         * @returns {string} 返回小写的字符串 undefined null object string number string  error ...
         */
        type: function (obj) {
            // null undefined
            if (obj == null) {
                // 返回字符串
                return obj + '';
            }
            // [object String]
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        },

        isArray: function (obj) {
            /*判断是否为数组*/
            return $.type.type(obj) === 'array';
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
    /*调试器*/
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
    }


    window.$ = window.deng = deng;
})(window, document);