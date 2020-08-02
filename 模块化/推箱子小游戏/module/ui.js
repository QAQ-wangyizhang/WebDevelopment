/*
 * @Author: your name
 * @Date: 2020-07-06 14:42:53
 * @LastEditTime: 2020-07-06 17:33:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\推箱子小游戏\module\ui.js
 */
import * as map from "./map.js";

export const row = map.content.length;
export const col = map.content[0].length;
export const LEN = 45;

const gameDom = document.getElementById("game");
gameDom.style.width = col * 45 + "px";
gameDom.style.height = row * 45 + "px";
// console.log(gameDom);
// 渲染页面
export function renderBox() {
    gameDom.innerHTML = null;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let c = map.content[i][j];
            isBox(c,i,j);
        }
    }
}
// 创造不同的箱子
function isBox(n,i,j) {
    if (isCorrect(i,j)){
        createBox("correct",i,j)
    }
    if (n === map.SPACE) {
        createBox("wu",i,j);
    } else if (n === map.PLAY) {
        createBox("player",i,j);
    } else if (n === map.WALL) {
        createBox("wall",i,j);
    } else if (n === map.BOX) {
        if(isCorrect(i,j)){
            createBox("overBox",i,j);
        }else{
            createBox("box",i,j);
        }
    }  
}
// 新建dom元素
function createBox(str,i,j) {
    const box = document.createElement("div");
    box.className = `item`;
    box.classList.add(str);
    box.style.left = j * LEN + "px";
    box.style.top = i * LEN + "px";
    // if()
    gameDom.appendChild(box);
}
// 判断箱子是否在正确的位置上
function isCorrect(row,col){
    for(let i = 0; i <map.correct.length; i ++){
        if(row === map.correct[i].row && col === map.correct[i].col){
            return true;
        }
    }
    return false;
}