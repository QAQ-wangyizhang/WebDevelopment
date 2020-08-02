/*
 * @Author: your name
 * @Date: 2020-07-06 15:30:59
 * @LastEditTime: 2020-07-06 18:42:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\推箱子小游戏\module\game.js
 */

import {
    renderBox,
    row,
    col,
} from "./ui.js";
import * as map from "./map.js";

export function moveBox(direction) {
    let player = getPlayer();
    let next = getNextPosition(direction, player.row, player.col);
        // 下一个位置是空的
    if (next.value === 0) {
        exchangePosition(player, next)
        // 下一个位置是墙
    } else if (next.value === 2) {
        return false;
        // 下一个位置是箱子
    } else if (next.value === 3) {
        // 推箱子的下一个位置
        let nextBox = getNextPosition(direction, next.row, next.col);
        // 箱子的下一个位置是空
        if (nextBox.value === 0) {
            exchangePosition(next, nextBox);
            exchangePosition(player, next);
        } else {
            return false;
        }

    }
}
// 判断是否赢了游戏
export function isWin() {
    for (let i = 0; i < map.correct.length; i++) {
        if (map.content[map.correct[i].row][map.correct[i].col] !== 3) {
            return false;
        }
    }
    return true;
}




// 交换两个点的位置
function exchangePosition(point1, point2) {
    [map.content[point1.row][point1.col], map.content[point2.row][point2.col]] = [map.content[point2.row][point2.col], map.content[point1.row][point1.col]]
}
// 得到玩家的实时位置
function getPlayer() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (map.content[i][j] === 1) {
                return {
                    row: i,
                    col: j
                }
            }
        }
    }
}
// console.log(getPlayer()) 
// 得到下一个点的坐标
function getNextPosition(direction, row, col) {
    if (direction == "left") {
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        }

    } else if (direction == "down") {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    } else if (direction == "up") {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    } else if (direction == "right") {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    }
}