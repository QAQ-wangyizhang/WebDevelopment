/*
 * @Author: your name
 * @Date: 2020-07-02 15:23:43
 * @LastEditTime: 2020-07-02 15:43:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\index.js
 */ 
// 导入exports对象
// 只有用到了模块才能执行
// nodejs 中导入模块时 使用相对路径 并且必须以./ 或 ../开头 去掉会有别的含义
// 如何实现导入导出 执行模块时放到一个立即执行函数执行 不会污染全局变量 （目前认为）
// 导出 初始化一个空对象
let util =  require("./commonJs"); // 这里执行js文件
// console.log(util);
let util1 = require("./a");
console.log(util1);
console.log("index执行了")
module.exports = util.a;
// let count = 1;
