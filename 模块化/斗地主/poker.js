/*
 * @Author: your name
 * @Date: 2020-07-02 15:49:39
 * @LastEditTime: 2020-07-02 15:57:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\斗地主\poker.js
 */
class Poker {
    constructor(color, number) {
        this.color = color;
        this.number = number;
    }
    toString() {
        let str = "";
        if (this.color === 1) {
            str = "♣"
        } else if (this.color === 2) {
            str = "♥";
        } else if (this.color === 3) {
            str = "♦";
        } else {
            str = "♠"
        }
        // 牌面
        if (this.number >= 2 && this.number <= 10) {
            str += this.number;
        } else if (this.number === 1) {
            str += "A";
        } else if (this.number === 11) {
            str += "J";
        } else if (this.number === 12) {
            str += "Q";
        } else if (this.number === 13) {
            str += "K";
        } else if (this.number === 14) {
            str = "joker";
        } else if (this.number === 15) {
            str = "JOKER";
        }
        return str;
    }
}

module.exports = Poker;