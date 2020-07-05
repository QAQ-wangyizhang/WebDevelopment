/*
 * @Author: your name
 * @Date: 2020-07-02 15:03:41
 * @LastEditTime: 2020-07-02 15:12:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\node.js
 */ 
console.log("hello world")
// window dom 对象用不了 document 也用不了
// console.log(window.name);
function Feibo(n){
    if(n == 1 || n == 2){
        return 1;
    }
    return Feibo(n-1) + Feibo(n-2);
}
setTimeout(() => {
    console.log("setTime")
}, 0);

for(let i = 1; i < 10; i++){
    console.log(Feibo(i));
}