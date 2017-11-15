;(function (win, doc, undefined) {
    /**
     * 需求：移动端弹出层组件
     * (1) 包括标题栏，内容栏，关闭按钮，
     *     设置标题栏的方式，详见设置标题
     */


    /**
     * 判断类型函数
     * @type {{types: [string,string,string,string,string,string,string]}}
     */
    var is = {
        types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String"]
    };
    for (var i = 0, type; type = is.types[i]; i++) {
        is[type.toLowerCase()] = (function (type) {
            return function (obj) {
                return Object.prototype.toString.call(obj) === "[object " + type + "]";
            };
        })(type);
    }
    /**
     * 默认配置
     * @type {{type: 0 | 1 | 2}} 设置弹层的类型 默认：0 （0表示信息框，1表示页面层，2表示加载层）
     */
    var config = {
        type: 0,
    };
    var ready = {
        /**
         * 合并配置
         * @param obj
         * @returns {{}}
         */
        extend: function (obj) {
            if (!is.object(obj)) throw TypeError('配置类型非法，请输入对象类型!');
            for (var i in obj) {
                config[i] = obj[i];
            }
            return config;
        }
    };
    // 绑定点击事件,在冒泡阶段调用事件处理函数
    ready.touch = function (elem, fn) {
        elem.addEventListener('click', function (e) {
            fn.call(this, e);
        }, false);
    }

    /**
     * 定义构造函数$
     */
    var webLayer = function (options) {
        // 将配置组合到config
        this.config = ready.extend(options);

        this.view();
    };

    // 弹出层的索引index
    var index = 0;
    var classs = ['webLayer-m'];
    /**
     * webLayer视图方法
     */
    webLayer.prototype.view = function () {
        // 创建弹出层
        var webLayerBox = document.createElement('div');
        // 给当前弹出层对象设置id
        this.id = webLayerBox.id = classs[0] + index;
        webLayerBox.classList.add(classs[0]);
        webLayerBox.classList.add(classs[0] + index);


        // 设置标题
        var title = setTitle(this.config);
        webLayerBox.appendChild(title);

        // 设置按钮
        var button = setButton(this.config);
        webLayerBox.appendChild(button);

        document.body.appendChild(webLayerBox);


    };

    /**
     * 设置标题
     * @param config
     * @returns object 标题对象
     */
    function setTitle(config) {

        // (1) 只有一个字符串的时候 title:'标题'
        // (2) 多个形式的时候
        // var title = {
        //     name: '标题',
        //     style: {
        //         'borderColor': '#fff',
        //         'fontSize': '12px',
        //     }
        // };

        // (1) 如果没有传入标题，不显示标题，但是显示关闭按钮
        if (!config.title) return false;

        // (2)如果有标题，显示标题和关闭按钮
        // (2.1)如果标题是仅仅是一个字符串，则不设置样式，采用默认的样式
        // (2.2)如果标题是是一个对象，根据name值设置标题名称，样式根据style对象设置


        // 判断传入的标题是否为对象类型的
        var titleBool = is.object(config.title);

        // 是对象，并且存在style属性
        var titleStyleBool = titleBool && is.object(config.title.style);

        // 创建标题h3的条件：必须有title，当如果title里面是数组的时候要判断是否有name  -- 这条暂时不做，因为我要在标题中设置关闭按钮

        var h3 = document.createElement('h3');
        if (titleBool) {
            if (titleStyleBool) {
                for (var k in config.title.style) {
                    h3.style[k] = config.title.style[k];
                }
            }
            h3.innerHTML = config.title.name ? config.title.name : '';
        } else {
            h3.innerHTML = config.title ? config.title : '';
        }
        return h3;
    }

    /**
     * 设置按钮
     * @param config
     */
    function setButton(config) {
        // btn: ['确定']
        // btn: ['确定', '取消']
        // btn: ['确定', '取消','更多']
        // btn: '确定'

        var div = document.createElement('div');
        div.classList.add(classs[0] + '-btn');

        // 如果是字符串的方式传入的btn，则作为一个按钮
        if (is.string(config.btn)) {
            var span = document.createElement('span');
            span.innerHTML = config.btn;
            div.appendChild(span);
        }

        // 如果是数组方式传入的btn，则有可能是多个按钮
        if (is.array(config.btn) && config.btn.length > 0) {
            for (var k in config.btn) {
                var span = document.createElement('span');
                span.innerHTML = config.btn[k];
                span.classList.add('btn-' + k);
                div.appendChild(span);
            }
        }

        return div;
    }


    // 全局使用webLayer
    win.webLayer = {
        open: function (options) {
            var o = new webLayer(options || {});
            return o.index;
        }
    };
})(window, document);