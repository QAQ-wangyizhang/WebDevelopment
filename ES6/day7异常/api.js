// const p = new Promise((resolve,reject) => {
//     resolve(1);
//     // throw 1;
// })

// // 等效于 
// const pro = Promise.resolve(p);
// // const pro1 = Promise.reject(1);
// // 等效于 pro = p reject 没有这种情况 resolve 比较特殊
// console.log(pro == p);

// pro.then(resp => {
//     console.log('then1',resp * 1);
// })
// pro.then(resp => {
//     console.log('then2',resp * 2);
// })
// pro.catch(resp => {
//     console.log('catch1',resp * 1);
// })
// pro.catch(resp => {
//     console.log('catch2',resp * 2);
// })
// pro.finally(resp => {
//     console.log('finally1');
// })
// pro.finally(resp => {
//     console.log('finally2');
// })


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// const proms = [];
// for (let i = 0; i < 10; i++) {
//     proms.push(new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(i);
//         }, getRandom(1000,5000));
//     }))
// }
// // 等到所有的prmises全部变成resolve完成输出
// const pro =  Promise.all(proms);
// pro.then(data => {
//     console.log(data,"全部完成");
// })
// console.log(proms)

function biaobai(god) {
    return new Promise((resolve, reject) => {
        console.log(`邓哥向女神${god}发出了表白短信`);
        setTimeout(() => {
            if (Math.random() < 0.1) {
                console.log(god, "同意");
                resolve(true);
            } else {
                console.log(god, "拒绝");
                resolve(false);
            }
        }, getRandom(1000, 5000))
    })
}
let hasAgree = false;
const proms = [];
for (let i = 1; i < 21; i++) {
    proms.push(biaobai(i).then(data => {
        if (data) {
            if (hasAgree) {
                console.log("发错短信了");
            } else {
                hasAgree = true;
                console.log("成功了")
            }
        }
        return data;
    }))
}
const p = Promise.all(proms);
p.then(data => {
    console.log(data);
})

// const p = Promise.race(proms);
// p.then(data => {
//     console.log("拒绝其他女神");
// })