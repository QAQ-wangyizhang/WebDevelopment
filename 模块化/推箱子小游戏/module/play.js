/*
 * @Author: your name
 * @Date: 2020-07-06 17:10:36
 * @LastEditTime: 2020-07-06 17:36:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\推箱子小游戏\module\play.js
 */

import {
    isWin,
    moveBox
} from "./game.js";
import {
    renderBox
} from "./ui.js";
// 预加载页面
renderBox();
// 
window.onkeydown = function (e) {
    if(isWin()){
        console.log("你赢了 游戏结束");
        // 赢了就重新加载整个页面
        window.location.reload();
    }
    switch (e.key) {
        case "ArrowUp":
            moveBox("up");
            break;
        case "ArrowDown":
            moveBox("down")
            break;
        case "ArrowLeft":
            moveBox("left");
            break;
        case "ArrowRight":
            moveBox("right");
            break;
    }
    // 刷新页面
    renderBox();
}