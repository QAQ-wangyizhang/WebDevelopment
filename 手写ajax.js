/*
 * @Author: your name
 * @Date: 2020-07-09 17:01:32
 * @LastEditTime: 2020-07-09 18:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\手写ajax.js
 */
/**
 * 
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 * @param {*} cb 
 * @param {*} isAsync 
 */
function ajax(method, url, data, cb, isAsync) {
    let xhr  = null;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                cb(JSON.parse(xhr.responseText))
            }
        }
    }
    if(method == "GET"){
        xhr.open(method,url+"?"+data,isAsync);
        xhr.send();
    }else if(method == "POST"){
        xhr.open(method,url+"?"+data,isAsync);
        xhr.send(data)
    }
}
ajax("GET", "../网络/ajax实现瀑布流/data.json", null, function (data) {
    console.log(data);
})