/*
 * @Author: your name
 * @Date: 2020-06-26 22:30:52
 * @LastEditTime: 2020-06-27 15:39:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\day7异常\示例1.js
 */
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

async function ajax(obj) {
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


async function getTeacher() {
    const stus = await ajax({
        url: "./data/students.json"
    })
    // console.log(stus);
    let cid;
    for (let i = 0; i < stus.length; i++) {
        if (stus[i].name == "李华") {
            cid = stus[i].classId;
        }
    }
    // console.log(cid);
    const cls = await ajax({
        url: "./data/classes.json"
    })
    // console.log(cls);
    let tid;
    for (let i = 0; i < cls.length; i++) {
        if (cls[i].id == cid) {
            tid = cls[i].teacherId;
        }
    }
    console.log(tid)
    const tes = await ajax({
        url: "./data/teachers.json"
    })
    console.log(tes);
    let tName;
    for (let i = 0; i < tes.length; i++) {
        if (tes[i].id == tid) {
            tName = tes[i].name;
        }
    }
    console.log(tName);
    return tName;
}
getTeacher().then(data => {
    console.log(data);
});

function delay(tick) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, tick);
    })
}

async function biaobai(god) {
    console.log(`邓哥向女神${god}发出了表白短信`);
    await delay(500);
    if (Math.random() < 0.1) {
        return true;
    } else {
        return false;
    }
}

const gods = [1, 2, 3, 4, 5, 6];
async function biaobaiAll() {
    for (let i = 0; i < gods.length; i++) {
        const g = gods[i];
        // 当前循环等待的promise没有resolve 下一次循环不执行
        const result = await biaobai(g);
        if (result) {
            console.log(`女神${g}同意了，不用再表白了`);
            break;
        } else {
            console.log(`女神${g}拒绝了`)
        }
    }
}
biaobaiAll();
// 如果await 后面没有跟着promise对象 会自动调用 Promise.resolve()方法直接resolve