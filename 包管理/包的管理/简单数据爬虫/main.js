/*
 * @Author: your name
 * @Date: 2020-07-04 15:09:53
 * @LastEditTime: 2020-07-04 15:57:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\包管理\包的管理\简单数据爬虫\main.js
 */ 
// https://movie.douban.com/chart

let getMovies = require("./getMovies");
let fs = require("fs");
getMovies().then(data => {
    let json = JSON.stringify(data);
    fs.writeFile("movie.json",json,()=>{
        console.log("成功")
    });
})

