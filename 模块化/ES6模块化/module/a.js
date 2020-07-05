/*
 * @Author: your name
 * @Date: 2020-07-02 21:00:53
 * @LastEditTime: 2020-07-02 21:17:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\ES6模块化\module\a.js
 */ 
// 基本导出
export let a = 1; // 导出值为1 类似于 commonJs里的 exports.a = 1;
export function test(){
    
}
export class Person{
    
}
let age = 10;
let sex = 1;
export {age,sex}; // 将age变量的名称作为导出的名称 age变量的值作为导出的值

// export a ; 不能这样 不是声明语句 
// {
//     a : 1,
//     test : function,
//     class : Person,
//     age : 10,
//     sex : 1
// }

