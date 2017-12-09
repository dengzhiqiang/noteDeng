var gulp = require('gulp');
var less = require('gulp-less');

// 为什么gulp要安装两遍？
// gulp实现文件更改自动刷新


gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css/'));
});

