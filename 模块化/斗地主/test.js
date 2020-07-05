/*
 * @Author: your name
 * @Date: 2020-07-02 15:47:55
 * @LastEditTime: 2020-07-02 15:59:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\斗地主\test.js
 */ 
let util = require("./util");
let Poker = require("./poker");
let p = new Poker(4,11);
console.log(p.toString());
// let arr = [1,2,3,4,5,6,7,8];
// util.sortRandom(arr);
// console.log(arr)