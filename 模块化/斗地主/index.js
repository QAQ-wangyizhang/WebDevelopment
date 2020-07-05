/*
 * @Author: your name
 * @Date: 2020-07-02 15:59:17
 * @LastEditTime: 2020-07-02 16:16:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\斗地主\index.js
 */ 
let Poker = require("./poker");
let util = require("./util");
let pokers = [];

for(let i=1; i <=13 ; i++){
    for(let j = 1 ; j <=4 ; j++){
        pokers.push(new Poker(j,i));
    }
}
pokers.push(new Poker(null,14),new Poker(null,15))
// 打乱扑克牌
// console.log(pokers);
util.sortRandom(pokers);
for(const item of pokers){
    // console.log(item.toString());
}

let play1 = pokers.slice(0,17);
let play2 = pokers.slice(17,34);
let play3 = pokers.slice(34,51);
let desk = pokers.slice(51);
console.log(util.print(play1));
console.log(util.print(play2));
console.log(util.print(play3));
console.log(util.print(desk));
