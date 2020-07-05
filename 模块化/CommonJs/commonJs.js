/*
 * @Author: your name
 * @Date: 2020-07-02 15:13:12
 * @LastEditTime: 2020-07-02 15:40:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\commonJs.js
 */ 

// (function(module){
//     module.exports = {};
//     let exports = module.exports;
//     exports.getNumber = getNumber;
//     return module.exports;
// })()
// module.exports 和 exports 一样 指向同一个地址 只是内部实现返回的是module.exports
// 模块化
let count = 0; // 需要隐藏的内部实现
// 暴露给外面的接口
function getNumber(){
    return ++count;
}

// 导出 暴露
console.log("commonjs.js执行了")
module.exports = {
    a : 123,
    b : 234
}
// console.log(getNumber());
// console.log(getNumber());
// console.log(getNumber());
// console.log(getNumber());