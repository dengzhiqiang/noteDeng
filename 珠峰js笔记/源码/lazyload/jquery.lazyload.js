/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */

(function ($, window, document, undefined) {

    var $window = $(window);

    $.fn.lazyload = function (options) {
        // 调用这个方法的元素 $('img.lazy').lazyload()
        var elements = this;
        var $container;
        var settings = {
            // 设置临界点
            // 默认情况下图片会出现在屏幕时加载. 如果你想提前加载图片, 可以设置threshold 选项, 设置 threshold 为 200 令图片在距离屏幕 200 像素时提前加载.
            // 临界值，这个值是针对container容器的，即距离container容器视口的临界值
            threshold: 0,

            //当图像不连续时
            // 滚动页面的时候, Lazy Load 会循环为加载的图片. 在循环中检测图片是否在可视区域内. 默认情况下在找到第一张不在可见区域的图片时停止循环. 图片被认为是流式分布的, 图片在页面中的次序和 HTML 代码中次序相同. 但是在一些布局中, 这样的假设是不成立的. 不过你可以通过 failurelimit 选项来控制加载行为.
            //将 failurelimit 设为 10 ，令插件找到 10 个不在可见区域的图片时才停止搜索. 如果你有一个猥琐的布局, 请把这个参数设高一点.
            failure_limit: 0,

            // 设置事件来触发加载
            // 你可以使用jQuery事件，例如click和mouseover。也可以使用自定义事件，如sporty、foobar默认情况下是要等到用户向下滚动并且图像出现在视口中时。只有当用户点击它们才加载图片：
            // 事件，container容器默认绑定这个事件，在这个事件被触发时，会不断的判断img元素是否满足触发appear的条件，
//             因此当浏览器不停的滚动下来时，如果满足条件，则显示图片；
// 另外还有一点，如果这个事件不是scroll事件，则选中的img元素都会绑定这个事件，绑定的这个事件中同样会触发内部appear事件；
            event: "scroll",

            //使用特效
            // 默认情况下，插件等待图像完全加载并调用show()。你可以使用任何你想要的效果。下面的代码使用fadeIn （淡入效果）
            // 显示方法，默认为show，也可以设置为fadeIn，API中隐藏了一个配置属性effectspeed，动画运行的时间
            effect: "show",
            container: window,

            // img元素的一个data属性，用于存放图片的真实地址
            data_attribute: "original",

            // 加载隐藏的图片
            // 可能在你的页面上埋藏可很多隐藏的图片. 比如插件用在对列表的筛选, 你可以不断地修改列表中各条目的显示状态. 为了提升性能, Lazy Load 默认忽略了隐藏图片. 如果你想要加载隐藏图片, 请将 skip_invisible 设为 false
            skip_invisible: false,

            //主要原理是,当 event 被设置为 scroll 以外的事件时, 实际上都会绑定了一个内置的 "appear" 事件.顾名思义, 这个事件就是用来显示图片的. (其实 scroll 也是调用这个事件)   【appear 出现的意思】
            // 在img触发appear事件时执行的回调
            appear: null,

            // 在img触发load事件时执行的回调
            load: null,

            // 图片占位符，img元素默认src属性为1*1像素的透明图片
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            // 如果找到的是第 failure_limit 个img元素，且不在container视口上方，左方及视口内（可以允许在视口下方，右方），则中断循环
            // elements是图片元素列表
            // 我们可以指定skip_invisible参数表示对于不可见的元素全部跳过，也就是对隐藏的元素不判断他是否在可视区域之内?
            elements.each(function () {
                var $this = $(this);

                // settings.skip_invisible如果为true 不加载隐藏的图片
                // 如果图片隐藏，且忽略隐藏，则中断循环
                //DOMContentLoaded触发后调用，resize时候调用，如果是scroll那么每滚动一次都会在container
//上面调用一次update方法(默认就是scroll,如果用户没有指定自己的事件就是scroll事件)!
                //如果用户指定了skip_invisible，那么对于invisible的元素直接返回!
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                    // 不满足在上方，左方；也不满足在下方，右方； 则触发appear事件
                    // img满足在container视口中，则显示
                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    // 如果找到的是第（failure_limit + 1）个img元素，且不在container视口上方，左方及视口内（可以允许在视口下方，右方），
                    // 则中断循环
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if (options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
        settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        // 为container绑定scroll事件
        if (0 === settings.event.indexOf("scroll")) {
            $container.on(settings.event, function () {
                return update();
            });
        }

        this.each(function () {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            // 设置占位符
            //如果该DOM元素的src属性为undefined或者src是false，那么如果该元素是img
            //那么该元素的src设置为placeholder，也就是img默认的src是placeholder，但是只有
            //在用户没有为img指定src的时候src才是placeholder!
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            // one绑定appear，触发后则移除该事件
            // 只有元素真正出现在视口的时候才会去加载图片，这样做的原因是为了防止其它我们不需要的图片在我们没有滚动的到的时候也被加载了，这就是懒加载的真正含义。只有我们需要的时候才会去加载
            $self.one("appear", function () {
                // 存在回调则触发
                if (!this.loaded) {
                    //appear默认是null，第一次绑定的时候不会执行这个if语句!
                    // appear在图片第一次出现在视口中回调
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    //创建一个img对象,检测该对象的load事件。之所以用一个新的img是因为我们只要用该img加载data-original中保存的
                    //图片真正的地址，即把src替换为data-orinal的值，只要该新img已经完成了，那么该元素已经添加了一个只会调用
                    //一次的事件了，名称为appear!
                    // 我们要知道我们是首先给元素添加load事件的，同时bind方法返回的对象就是调用对象，也就是我们创建的img对象。绑定了load事件以后我们才设置了该imagedioxide的src属性，这样做就是为了把图片下载到本地，也就是图片预加载功能。当我们触发自定义appear事件的时候不用等待从服务器获取图片，而是从本地直接获取到了!有一点要格外注意：新图片元素不一定要从添加到文档才开始下载,只要设置了src属性就开始下载!
                    //     JS原生实现了图片预加载：

                    $("<img />").one("load", function () {
                            //获取默认的data-orignal的值!
                            var original = $self.attr("data-" + settings.data_attribute);
                            //把调用对象首先隐藏，然后默默加载
                            $self.hide();

                            //如果元素是img，那么把该元素的src设置为original值，所以data-original才是真正的
                            //图片的URL，而src只是占位符!
                            //如果是其它的元素非img，那么就设置background-image
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }

                            //this['mouseover'](400)表示这个事件的调用时间
                            //如下配置effectspeed控制动画的时间
                            //effectspeed:1000,
                            // effect:"fadeIn"
                            $self[settings.effect](settings.effect_speed);

                            //这时候调用成功了,DOM元素的loaded设置为true!
                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            // 更新elements，过滤掉已经加载的img元素，避免下次在update中轮循
                            //grep注重于筛选，第三个参数是false，表示筛选loaded是false的调用对象的集合!
                            // 从这里我们可以知道，每次只要有元素出现在视口中，也就是触发了appear事件，就会更新调用对象，只有那些还没有出现在视口中的元素才会留在该集合中。参照jQuery.grep源码就会知道，第三个参数是false，只有那些返回true的DOM元素才会在集合里面，也就是element.loaded是false(没有加载过)才会留下来。这是为了防止出现在视口中了下次还会执行不必要的代码逻辑。
                            var temp = $.grep(elements, function (element) {
                                return !element.loaded;
                            });

                            //把没有加载完成的DOM合并为jQuery集合!
                            elements = $(temp);

                            // 存在回调则触发
                            //load默认是null，表示调用该函数，上下文是DOM，第一个参数是还有多少个元素没有加载完成，第二个参数是最终settings对象
                            // load会在图片加载完成，也就是onload事件中被调用
                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                    //bind方法返回值是调用对象，也就是创建的img对象，我们给该img设置了src属性为data-original的值!
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            // 绑定不是scroll的事件，用于触发appear事件
            if (0 !== settings.event.indexOf("scroll")) {
                $self.on(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        // 如果窗口大小发生变化了，那么我们需要检查是否有元素出现在视口中间
        $window.on("resize", function () {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.on("pageshow", function (event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        // 只要触发了DOMContentLoaded就会检查是否有元素出现在视口中
        $(document).ready(function () {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.    jQuery命名空间中的便利方法。       */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

//     首先选中的img元素都绑定了一个appear事件(处理img显示真实的图片地址)，方便以后满足条件时触发该事件；
// 在配置对象中有一个container属性配置，默认为window，如果img元素在该container容器视口中，则触发appear事件；
// 为了判断img元素是否在container容器视口范围中，造了如下四个轮子：
// 在视口下方
//    用于判断元素在垂直方向上是否已经在可视区域内了，返回false表示垂直方向已经出现在可视区域内了
    $.belowthefold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }
        //如果返回true，表示元素距离文档的距离大于(窗口滚动距离+窗口高度),也就是表示元素还没有出现在视口中!
        //如果返回false表示元素已经在视口中了!
        return fold <= $(element).offset().top - settings.threshold;
    };

    // 在视口右方
    $.rightoffold = function (element, settings) {
        // rightoffold用于判断元素在水平方向上面时候已经出现在可视区域内了，如果是false那么表示元素已经在可视区域内了
        var fold;
//如果我们的container是window，那么我们获取该元素的innerHeight(可视区域的高度，但是不包括顶部工具栏，适用于IE9+),
        //但是IE8等浏览器用$window.height()获取窗口的高度。然后加上scrollTop属性表示窗口的高度和滚动的距离的高度!
        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        //offset表示元素距离左边的距离，如果距离大于窗口的滚动距离+窗口的宽度那么表示
        //元素还不再可视区域内，返回false表示元素出现在了可视区域内了!
        return fold <= $(element).offset().left - settings.threshold;
    };

    // 上面两种情况表示元素应该触发appear事件了，但是如果是下面任何一种情况我们就不需要任何操作
    // 第一种情况：元素已经在垂直方向上面滚动隐藏了
    // 在视口上方
    $.abovethetop = function (element, settings) {
        var fold;
//如果是window对象那么获取在垂直方向上面滚动的距离
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }
        //如果滚动的距离太多，那么元素已经被隐藏在滚动的那一段距离中去了，如果滚动的距离大于元素的距离
        //表示元素在垂直方向上面已经被隐藏了,这时候表示元素已经出现过一次了，这时候我们什么也不需要做!
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    // 在视口左方
    $.leftofbegin = function (element, settings) {
        var fold;
        // 第二种情况：元素在水平方向上被隐藏了，也就是滚动隐藏了
        //如果是window对象那么我们获取已经在水平方向上滚动的距离
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }
        //如果元素滚动的距离已经大于元素距离文档左边的距离，那么表示元素在水平方向上已经被隐藏了
        // 既然是隐藏了，那么我们又不需要做任何处理了!
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function (element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   方便的自定义选择器*/
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold": function (a) {
            return $.belowthefold(a, {threshold: 0});
        },
        "above-the-top": function (a) {
            return !$.belowthefold(a, {threshold: 0});
        },
        "right-of-screen": function (a) {
            return $.rightoffold(a, {threshold: 0});
        },
        "left-of-screen": function (a) {
            return !$.rightoffold(a, {threshold: 0});
        },
        "in-viewport": function (a) {
            return $.inviewport(a, {threshold: 0});
        },
        /* Maintain BC for couple of versions. */
        "above-the-fold": function (a) {
            return !$.belowthefold(a, {threshold: 0});
        },
        "right-of-fold": function (a) {
            return $.rightoffold(a, {threshold: 0});
        },
        "left-of-fold": function (a) {
            return !$.rightoffold(a, {threshold: 0});
        }
    });

})(jQuery, window, document);
