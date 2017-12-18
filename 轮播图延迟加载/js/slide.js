;(function (win, doc, undefined) {
    // undefined 防止修改全局的undefined

    var swiper = {
        init: function () {
            // 初始化
            this.copyElement();
            this.setWrapper();
        },
        copyElement: function () {
            // 复制第一个标签和最后一个标签
            var lists = document.getElementsByClassName('list'),
                inner = document.getElementsByClassName('inner')[0],

                cloneFirst = lists[0].cloneNode(true),
                cloneLast = lists[lists.length - 1].cloneNode(true);

            inner.insertBefore(cloneLast, lists[0]);
            inner.appendChild(cloneFirst);
            console.log(lists.length);
        },
        setWrapper: function () {
            var wrapper = document.getElementsByClassName('wrapper')[0],
                wrapperWidth = wrapper.clientWidth,
                inner = document.getElementsByClassName('inner')[0],
                lists = wrapper.getElementsByClassName('list'),
                length = lists.length;

            for (var i = 0; i < length; i++) {
                lists[i].style.width = wrapperWidth + 'px';
            }
            inner.style.width = wrapperWidth * length + 'px';
        },
        lazyImg: function () {
            
        }
    };

    swiper.init();


})(window, document);