/*
 * @Author: your name
 * @Date: 2020-07-02 20:57:46
 * @LastEditTime: 2020-07-02 21:25:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\ES6模块化\module\index.js
 */ 
// 基本导入

// 预加载
// as重命名 导出的东西不能重新赋值 
// 全部导入一个模块全部 形成一个对象且必须重命名 * 
// 模块导入有缓存 只会导入一次 只运行模块 import "./b.js"
import "./c.js";
import * as a from "./a.js";
import {b as b1} from "./b.js";
// 默认导入  经常要用的东西
// 如果使用* 会将所有基本导出 和 默认导出聚合成为一个对象导出 默认导出放在一个default的属性里
import * as data from './b.js';
console.log(data.default);
console.log(a.sex,a.age,b1);
// let a = 0;
console.log("入口文件")