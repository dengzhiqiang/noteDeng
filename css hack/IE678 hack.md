#### 一、常见hack
    1. _          IE6
    2. *          IE6/7
    3. !important IE7/Firefox
    4. *+         IE7
    5. \9         IE6/7/8
    6. \0         IE8
    7. 条件hack
         <!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]--> IE7以下版本
         <!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]--> IE7
         <!--[if IE 8]> <html class="no-js lt-ie9"><![endif]--> IE8
         <!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]--> IE8以上


#### 二、IE8以及以下版本浏览器
>   对于IE8及其以下版本的浏览器，就是使用本文标题所提到的”\9″ hack。如下代码：
    
    .ie6_7_8{
        color:blue; /*所有浏览器*/
        color:red\9; /*IE8以及以下版本浏览器*/
    }
    
>   说明：使用如上所示，在分号之前属性时候添加”\9″就可以了，为什么添加”\9″可以区分目前的IE浏览器和其他浏览器我是不知道的，这里只能使用”\9″，像是”\8″或是”\ie”都是无效的，这个还是比较有趣的。

#### 三、IE7以及以下版本浏览器
>   这个知道的人应该很多，也是很基本的，就是使用"*"号了，如下示例代码：
    
    .ie6_7_8{
        color:blue; /*所有浏览器*/
        color:red\9; /*IE8以及以下版本浏览器*/
        *color:green; /*IE7及其以下版本浏览器*/
    }
    
#### 四、IE6浏览器
>   就本文而言，使用下划线"_"区分IE6浏览器是最好的选择，如下代码：
    
    .ie6_7_8{
        color:blue; /*所有浏览器*/
        color:red\9; /*IE8以及以下版本浏览器*/
        *color:green; /*IE7及其以下版本浏览器*/
        _color:purple; /*IE6浏览器*/
    }