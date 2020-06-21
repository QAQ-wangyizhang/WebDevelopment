/*
 * @Author: your name
 * @Date: 2020-06-29 16:08:28
 * @LastEditTime: 2020-06-29 17:09:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\day9迭代器\index.js
 */


//  迭代器
// const obj = {
//     next() {
//         return {
//             value: "下一个数据的值",
//             done: "boolean 是否迭代完成？"
//         }
//     }
// }

const arr = [1, 2, 3, 4, 5];
const arr1 = [2, 5, 6, 7, 8];
// for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
// }

const iterator = {
    i: 0, // 当前数组下标
    next() {
        return {
            value: arr[this.i++],
            done: this.i > arr.length,
        }
    }
}


let it1 = creatIterator(arr1);

// 不断取数据
let data = it1.next();
while (true) {
    if (data.done) {
        // console.log(1)
        break;
    }
    console.log(data.value);
    data = it1.next();
}

function creatIterator(arr) {
    return {
        i: 0, // 当前数组下标
        next() {
            return {
                value: arr[this.i++],
                done: this.i > arr.length,
            }
        }
    }
}

function getArr(n){
    if(n < 1){
        return false;
    }
    if(n == 1 || n == 2){
        return 1;
    }
    return getArr(n-1) + getArr(n-2);
}

function cretatFeiboIterator(length){
    let n = 1;
    let len = length || 5;
    return {
        next(){
            return {
                value : getArr(n++),
                done : n > len,
            }
        }
    }
}

let fiebo = cretatFeiboIterator();

let dataFei = fiebo.next();
while(true){
    if(dataFei.done){
        break;
    }
    console.log(dataFei.value);
    dataFei = fiebo.next();
}


