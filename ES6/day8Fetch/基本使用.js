/*
 * @Author: your name
 * @Date: 2020-06-28 15:17:21
 * @LastEditTime: 2020-06-28 15:58:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\day8Fetch\基本使用.js
 */
// http://101.132.72.36:5100/api/local


async function getProvinces() {
    const url = "http://101.132.72.36:5100/api/local";
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "applicateion/json",
            a : 1,
            b : 2
        },
        // body : `"{a : 1}"`
    }
    try {
        const respObj = await fetch(url, config)
        const header = await respObj.headers;
        const data = await getJSON(respObj);
        console.log(data,header);
    } catch (err) {
        console.log(err);
    }
}

async function getJSON(resp){
    return await resp.json();
}

document.querySelector("#btn").onclick = function () {
    getProvinces();
};