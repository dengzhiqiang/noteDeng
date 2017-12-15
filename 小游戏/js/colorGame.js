/**
 * 1.刚开始是一个小色块
 * 2.每次点击色块都会生成一个小色块
 * 3.生成的小色块，点击也会生成更多的小色块
 * 4.并且当前点击的色块会变大0.5倍
 * 5.色块最大是屏幕的 1/3 的大小
 *
 *
 */


;(function (win, doc) {

    var body = document.body;
    var wrapper = document.querySelector('#wrapper');
    var clientWidth = getViewportSize().width - 40;
    var clientHeight = getViewportSize().height - 40;
    var colorClass = ['color-green1', 'color-yellow1', 'color-zise1'];

    /**
     * 获取视口的宽度和高度
     * @returns {{width: (Number|number), height: (Number|number)}}
     */
    function getViewportSize() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        };
    }

    var render = {
        renderBall: function () {
            /**
             * 进入页面生成第一个色球
             */

            var div = document.createElement('div');
            var left = Math.floor(Math.random() * clientWidth);
            var top = Math.floor(Math.random() * clientHeight);

            div.classList.add('color-box', colorClass[Math.floor(Math.random() * 3)]);


            div.style.top = top + 'px';
            div.style.left = left + 'px';


            wrapper.appendChild(div);


        }
    };

    render.renderBall();


    wrapper.addEventListener('touchstart', function (e) {
        // 初始速度
        var speed = 10;
        var leftMove = false;
        var topMove = false;

        var target = e.target;
        var tagName = target.tagName.toLowerCase();


        var targetWidth = parseInt(window.getComputedStyle(target, null).width);
        var targetHeight = parseInt(window.getComputedStyle(target, null).height);


        // 当前点击的球放大
        target.style.width = targetWidth + 30 + 'px';
        target.style.height = targetHeight + 30 + 'px';


        // 当前球运动
        var timer = setInterval(function () {
            if (speed <= 0) {
                clearInterval(timer)
            }

            if (Math.abs(parseInt(target.style.left)) > (clientWidth - targetWidth)) {
                target.style.left = clientWidth - targetWidth + 'px';
                speed -= 2;
            }

            if (Math.abs(parseInt(target.style.top)) > (clientHeight - targetHeight)) {
                target.style.top = clientHeight - targetHeight + 'px';
                speed -= 2;
            }


            target.style.left = parseInt(window.getComputedStyle(target, null).left) + speed + 'px';
            target.style.top = parseInt(window.getComputedStyle(target, null).top) + speed + 'px';

        }, 30);


        // 最多放25个球
        if (wrapper.getElementsByTagName('div').length <= 25) {
            if (tagName === 'div' && target.id !== 'wrapper') {
                render.renderBall();
            }
        }


    }, false);


})(window, document);


































