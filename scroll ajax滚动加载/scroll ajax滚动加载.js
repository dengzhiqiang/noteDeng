var ftnoautopos = true;
(function ($) {
    var flag = true;
    var loading = null;
    var elemParent = null;
    var content = null;
    var ft = null;
    var startNum = 0;
    var firstLen = 20;
    var dataLen = 50;
    var isFirst = true;
    var index = 0;

    //StringBuffer功能，用于拼接字符串
    var stringBuffer = function () {
        this._strings = new Array();
    }
    stringBuffer.prototype.append = function (str) {
        this._strings.push(str);
    }
    stringBuffer.prototype.toString = function () {
        return this._strings.join("");
    }
    stringBuffer.prototype.clear = function () {
        this._strings = [];
    }

    var waterFall = function (html, subSelector) {
        content.append(html);
        var picbox = content.find(subSelector);
        var len = picbox.length;
        picbox.css("opacity", 0);
        try {
            content.masonry('appended', picbox, true);
            var showElem = function (i) {
                setTimeout
                (
                    function () {
                        if (i < len) {
                            picbox.eq(i).animate({"opacity": 1}, 800);
                            showElem(++i);
                            ft.show();
                        }
                        else {
                            loading.stop(true).fadeTo(600, 0, function () {
                                loading.hide();
                            });
                        }
                    }, 60
                );
            }
            flag = true;
            showElem(0);
        } catch (e) {
        }
    };

    var scrollAjax = function () {
        if (flag) {
            flag = false;
            var params = null;

            if (isFirst) {
                params =
                    {
                        startNum: startNum,
                        dataLen: firstLen,
                        type: "ajax",
                        randoms: Math.random()
                    };
            }
            else {
                params =
                    {
                        startNum: startNum,
                        dataLen: dataLen,
                        type: "ajax",
                        randoms: Math.random()
                    };
            }

            var url = "";
            if (location.search.match(/mod\=\w*/)) {
                if (location.search.match(/viewpicture/)) {
                    url = location.pathname.replace(/^\//, "") + "?mod=viewpicture";
                }
                else {
                    url = location.pathname.replace(/^\//, "") + "?mod=picture";
                }
            }
            else if (location.pathname.replace(/^\//, "") == "feres.php") {
                try {
                    url = location.pathname.replace(/^\//, "") + "?&do=picture&listtype=" + listtype;
                }
                catch (e) {
                    url = location.pathname.replace(/^\//, "") + "?&do=picture";
                }
            }
            else {
                url = location.pathname.replace(/^\//, "") + "?&do=picture";
            }


            $.ajax({
                type: "POST",
                cache: false,
                url: url,
                dataType: "JSON",
                data: $.param(params),
                beforeSend: function () {
                    loading.stop(true).fadeTo(600, .7);
                },
                success: function (data) {
                    if (!data[0].ecode) {
                        var html = new stringBuffer();
                        for (var i = 0, j = data.length, now; i < j; i++) {
                            now = data[i];
                            html.append('<div class="picbox index' + index + '"><a href="' + now.url + '" target="_blank" class="imglink cm_mb" style="height:' + now.height + 'px;"><img alt="' + unescape(now.title) + '" src="' + now.pic + '"/></a><div class="titlelink"><a href="' + now.url + '" target="_blank" title="' + unescape(now.title) + '">' + unescape(now.title) + '</a></div><p>' + unescape(now.summary) + '</p></div>');
                        }

                        waterFall(html.toString(), ".index" + (index++), true);
                        html.clear();
                        if (isFirst) {
                            isFirst = false;
                            startNum += firstLen;
                        }
                        else {
                            startNum += dataLen;
                        }
                    }
                    else {
                        showDialog("没有新内容可继续加载了哦~", "right");
                        flag = false;
                        loading.stop(true).fadeTo(600, 0, function () {
                            loading.hide();
                        });
                    }
                },
                error: function () {
                    flag = true;
                }
            });
        }
    };

    var init = function () {
        var wind = $(window);
        var doc = $(document);
        loading = $("#loading");
        content = $("#content");
        ft = $("#ft");
        ft.hide();

        $(window).scroll
        (
            function () {
                if (doc.scrollTop() + wind.height() >= (doc.height() - 500)) {
                    scrollAjax();
                }
            }
        );

        content.imagesLoaded
        (
            function () {
                content.masonry
                ({
                    singleMode: true,
                    gutterWidth: 20,
                    isFitWidth: false,
                    isResizableL: true,
                    isRTL: false,
                    itemSelector: ".picbox",
                    columnWidth: 228
                });
            }
        );
        scrollAjax();
    };

    $(function () {
        init();
    });
})(jq);
