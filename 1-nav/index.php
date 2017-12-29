<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>首页</title>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <style>
        ul {
            margin: 0;
            padding: 0;
        }

        .sidebar {
            width: 220px;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            background: #39435C;
        }

        .sidebar a {
            padding: 12px 5px 12px 15px;
            display: block;
            color: #eee;
        }

        .sidebar a.active {
            padding: 12px 5px 12px 15px;
            display: block;

            color: #f6f6f6;
            background: #425164;
        }

        a {
            color: #3c8dbc;
        }

        .container-main {
            padding-left: 230px;
            background: #f2f2f2;
        }

    </style>
</head>
<body>

<div class="container-fluid">
    <!--左侧导航区域-->

    <?php require('./templates/sidebar.html'); ?>

    <!--// 左侧导航区域-->
    <div class="container-main">
        <div class="row">
            <div class="col-sm-3 col-md-2">
                <h3><a href="https://onsen.io/">onsen</a></h3>
                <p>The most beautiful and efficient way to develop HTML5 hybrid and mobile web app</p>
            </div>
            <div class="col-sm-3 col-md-2">
                <h3><a href="http://m.sui.taobao.org/">SUI Mobile</a></h3>
                <p>SUI Mobile 是一套基于 Framework7 开发的UI库。它非常轻量、精美，只需要引入我们的CDN文件就可以使用，并且能兼容到 iOS 6.0+ 和 Android
                    4.0+，非常适合开发跨平台Web App</p>
            </div>
            <div class="col-sm-3 col-md-2">
                <h3><a href="http://framework7.taobao.org/">framework7</a></h3>
                <p>特色的HTML框架可以创建精美的iOS应用</p>
            </div>

            <div class="col-sm-3 col-md-2">
                <h3><a href="http://jqweui.com/">jqweui</a></h3>
                <p>微信公众号开发的瑞士军刀</p>
            </div>

            <div class="col-sm-3 col-md-2">
                <h3><a href="https://weui.io/">weui</a></h3>
                <p>WeUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。</p>
            </div>

            <div class="col-sm-3 col-md-2">
                <h3><a href="http://dev.dcloud.net.cn/mui/">mui</a></h3>
                <p>最接近原生APP体验的高性能前端框架</p>
            </div>


        </div>
    </div>
</div>


<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>

</script>
</body>
</html>