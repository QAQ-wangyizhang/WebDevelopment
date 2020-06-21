/*
 * @Author: your name
 * @Date: 2020-06-29 17:13:44
 * @LastEditTime: 2020-06-29 17:40:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\day9迭代器\for-of.js
 */


// 可迭代对象
// var obj = {
//     [Symbol.iterator]() {
//         return {
//             next() {
//                 return {
//                     value: 1,
//                     done: false
//                 }
//             }
//         }
//     }
// }

const arr = [1, 2, 3, 4, 5, 6, 7];
// const iterator = arr[Symbol.iterator]();
// let data = iterator.next();
// while(true){
//     if(data.done){
//         break;
//     }
//     console.log(data.value);
//     data = iterator.next();
// }

const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    [Symbol.iterator]() {
        const keys = Object.keys(this);
        let i = 0;
        console.log(keys)
        return {
            next: () => {
                const propName = keys[i++];
                const propValue = this[propName];
                return {
                    value: {
                        name: propName,
                        value: propValue,
                    },
                    done: i > keys.length,
                }
            }
        }
    }
}


// for (const item of obj) {
//     console.log(item);
// }
// 可迭代对象可以展开到数组里  先得到迭代器对象然后一个个放进数组
const arr1 = [...obj];
console.log(arr1);

function test(a, b, c, d) {
    console.log(a, b, c, d);
}
test(...obj);