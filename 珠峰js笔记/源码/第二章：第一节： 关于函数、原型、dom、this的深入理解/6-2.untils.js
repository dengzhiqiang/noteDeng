var untils = {
    /**
     * 实现将类数组转化为数组
     */
    likeToArray: function (likeArray) {
        var ary = [];
        try {
            // 由于IE6-8不支持dom集合的类数组，用下面的转化方式，所以用catch来处理IE6-8
            ary = Array.prototype.slice.call(likeArray);
        } catch (e) {
            for (var i = 0, len = likeArray.length; i < len; i++) {
                ary[ary.length] = likeArray[i];
            }
        }
        return ary;
    },
    /**
     * 将json字符串转化为json对象
     * @param str
     * @returns {*}
     */
    jsonParse: function (str) {
        var val = null;
        try {
            val = JSON.parse(str);
        } catch (e) {
            // IE67低版本浏览器的兼容问题
            val = eval("(" + str + ")");
        }
        return val;
    }

};