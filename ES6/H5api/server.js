/*
 * @Author: your name
 * @Date: 2020-07-01 09:58:06
 * @LastEditTime: 2020-07-01 10:05:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\H5 api\server.js
 */ 
let express = require("express");
let app = new express();
app.use(express.static("./page"));
app.listen(12307); // 端口号尽量大于8000