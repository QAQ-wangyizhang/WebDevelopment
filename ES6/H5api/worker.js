/*
 * @Author: your name
 * @Date: 2020-07-01 16:19:31
 * @LastEditTime: 2020-07-01 16:23:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\H5api\worker.js
 */ 
this.onmessage = function(e){
    // console.log(e);
    this.postMessage(e.data.num);
}