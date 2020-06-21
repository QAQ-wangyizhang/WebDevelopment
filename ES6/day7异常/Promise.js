// 他不是消除回调他是用来使回调可控

// const pro = new Promise((resolve, reject) => {
//     // unsettled 阶段
//     console.log(`邓哥向女神1发出了表白短信`);
//     setTimeout(() => {
//         if(Math.random() < 0.1){
//             resolve(true);
//         }else{
//             resolve(false);
//         }
//     },3000)
// })
// console.log(pro)

// function biaobai(god,callback){
//     console.log(`邓哥向女神【${god}】发出了表白短信`);
//     setTimeout(() => {
//         if(Math.random() < 0.1){
//             callback(true);
//         }else{
//             callback(false);
//         }
//     },1000)
// }

function toData(obj) {
    if (obj == null) {
        return obj
    }
    let arr = [];
    for (let i in obj) {
        let str = i + "=" + obj[i];
        arr.push(str);
    }
    return arr.join("&");
}

function ajax(obj) {
    return new Promise((resolve, reject) => {
        obj.type = obj.type || "get";
        obj.async = obj.async || true;
        obj.data = obj.data || null;
        let xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        if (obj.type === "post") {
            xhr.open(obj.type, obj.url, obj.async);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            let data = toData(obj.data);
            xhr.send(data);
        } else {
            let url = obj.url + "?" + toData(obj.data);
            xhr.open(obj.type, url, obj.async);
            xhr.send();
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(xhr.status);
                }
            }
        }
    })
}
// const pro = ajax({
//     url: "./data/students.json?name=李华",
// });
// pro.then(data => {
//     // console.log(data);
//     // throw Error('错误');
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].name == "李华") {
//             return data[i].classId; //班级id
//         }
//     }
// }).then(cid => {
//     console.log(cid);
//     return ajax({
//         url: "./data/classes.json?cid=" + cid
//     }).then(cls => {
//         for (let i = 0; i < cls.length; i++) {
//             if (cls[i].id === cid) {
//                 return cls[i].teacherId;
//             }
//         }
//     })
// }).then(tid => {
//     console.log(tid);
//     return ajax({
//         url: "./data/teachers.json"
//     }).then(ts => {
//         console.log(ts);
//         for (let i = 0; i < ts.length; i++) {
//             if (ts[i].id == tid) {
//                 return ts[i].name;
//             }
//         }
//     })
// }).then(tn => {
//     console.log(`老师的姓名: ${tn}`);
//     // console.log(tn);
// })
// console.log(pro2);


// const pro1 = new Promise((resolve,reject) =>{
//     // resolve(1);
//     throw 1;
// })

// const pro2 = pro1.then(result => result * 2,err => {
//     return err * 3;
// });
// const pro3 =  pro1.catch(err => {
//     return err * 2;
// })
// pro2.then((data) => {
//     console.log(data * 2);
// },err =>{
//     console.log(err * 3);
// })

// const pro1 = new Promise((resolve,reject) =>{
//     resolve(1);
//     // throw 1;
// })


// const pro2 = new Promise((resolve,reject) =>{
//     setTimeout(() =>{
//         resolve(2);
//     },3000)
//     // throw 1;
// })

// pro1.then(result => {
//     console.log("结果出来了 得到的是一个Promise")
//     return pro2;
//     // 这里pro2 和 pro3 状态要保持一致
// }).then(result =>{
//     console.log(result);
// })



// const pro = new Promise((resolve,reject) =>{
//     ajax({
//         url: "./data/students.json?name=李华",
//         success : function(data){
//             resolve(data);
//         },
//         error(err){
//             reject(err);
//         }
//     })
// })
// unsettle阶段函数是同步执行的 先执行函数再按照位置执行下一个
// 作业队列全是异步的 所以 会放到event queue
// const pro  = new Promise((resolve,reject)=>{
//     // reject('1234')
//     throw new Error("123") // 未捕获的错误会直接推向rejected状态
//     // resolve(1);无效
//     // 状态不可逆  后面代码全部无效  
// })

// pro.catch(data=>{
//     console.log(data);
// })



// const pro = new Promise((resolve, reject) => {
//     console.log("unsettle阶段") 
//     setTimeout(() =>{
//         resolve(123);
//     },3000)
//     // 到达resolved 状态才去执行then
// })
// pro.then(data => {
//     // 只管后续处理
//     // pro状态是resolved
//     // settled状态
//     console.log(data);
// })

// const pro = new Promise((resolve, reject) => {
//     // unsettled 阶段
//     // console.log(`邓哥向女神1发出了表白短信`);
//     setTimeout(() => {
//         if(Math.random() < 0.1){
//             resolve(123);
//         }else{
//             reject(new Error('456'));
//         }
//     },3000)
// })


// pro.then(data =>{
//     console.log(data);
// }, err =>{
//     console.log(err);
// })


function biaobai(god) {
    return new Promise((resolve, reject) => {
        console.log(`邓哥向女神${god}发出了表白短信`);
        setTimeout(() => {
            if (Math.random() < 0.1) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000)
    })
}
biaobai("1").then(data => {
    if (data) {
        console.log("女神1同意了")
        return;
    } else {
        console.log("女神1不同意")
        return biaobai("2");
    }
    // console.log(data);
}).then(resp => {
    if (resp == undefined) {
        return;
    } else if (resp) {
        console.log("女神2同意了")
        return;
    } else {
        console.log("女神2不同意")
        return biaobai('3');
    }
}).then(resp => {
    if (resp == undefined) {
        return;
    } else if (resp) {
        console.log("女神3同意了")
        return;
    } else {
        console.log("女神都不同意")
    }
})