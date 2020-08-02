// function defaultTask(cb) {
//     // place code for your default task here
//     console.log("14");
//     cb();
//   }

const {
  series,
  parallel
} = require("gulp");

// exports.default = defaultTask
// 公开任务 私有任务

// const {series,parallel} = require("gulp");
// // console.log(gulp);

// function fn1(cb){
//   console.log("fn1被调用了");
//   cb();
// }
// function fn2(cb){
//   console.log("fn2被调用了");
//   cb();
// }
// exports.build = fn1;
// exports.default = series(fn2,fn1);

// 组合任务
// function js(cb) {
//   console.log("js被执行了");
//   cb();
// }

// function html(cb) {
//   console.log("html被执行了");
//   cb();
// }

// function css(cb) {
//   console.log("css被执行了");
//   cb();
// }
// exports.default = series(js,html,css) // 同步 一个一个执行
// exports.default = parallel(js,html,css) // 异步执行 同时执行
// exports.default = parallel(js,series(html,css)) // 混合使用


// 处理文件
const {
  src,
  dest
} = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
exports.default = function () {
  return src("src/js/*.js")
    .pipe(dest("dist/js"))
    .pipe(uglify())
    .pipe(rename({
      extname : ".min.js"
    })) // 产生压缩文件
    .pipe(dest("dist/js"));
}

// 文件监控 watch
const {
  watch
} = require("gulp");
watch("src/css/*", {
  delay:2000
}, function (cb) {
  console.log("文件被修改了");
  cb();
})