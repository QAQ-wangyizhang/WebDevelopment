/*
 * @Author: your name
 * @Date: 2020-07-02 15:46:51
 * @LastEditTime: 2020-07-02 16:18:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\模块化\斗地主\util.js
 */
module.exports = {
    sortRandom(arr) {
        arr.sort((a, b) => {
            return Math.random() - 0.5
        })
    },
    print(play) {
        let strPlay = `牌: `;
        for (const item of play) {
            strPlay += ` ${item.toString()} `;
        }
        return strPlay;
    }
}