/*
 * @Author: your name
 * @Date: 2020-06-26 21:54:46
 * @LastEditTime: 2020-07-05 18:22:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edita
 * @FilePath: \每日的学习\ES6\day7异常\async&&await.js
 */

async function test() {
    // console.log(1);
    // throw 3;
    return 2;
    // return new Promise(resolve => {
    //     resolve(5);
    // })
}

async function test2(){
    // return new Promise((resolve,reject) => {
    //     test().then(data => {
    //         const result = data;
    //         console.log(result);
    //         resolve();
    //     })
    // })
    const result = await test();
    console.log(result);
}
test2();

const pro = test();
console.log(pro);
pro.catch(data => {
   console.log(data * 2) 
})

等效于

function test(){
    return new Promise((resolve,reject) =>{
        console.log(1);
        resolve(2);
    })
}

// await关键字必须出现在 async中


