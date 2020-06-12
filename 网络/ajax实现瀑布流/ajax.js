// ajax : async javascript and xml (json)
// 同源策略 域名 协议 端口号都相同才可以进行数据间的交互
/**
 * 
 * @param {*} method 请求方式
 * @param {*} url 请求地址
 * @param {*} data 请求数据
 * @param {*} cb 成功回调函数
 * @param {*} isAsync 是否异步
 */
function ajax(method, url, data, cb, isAsync) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 监听是否有响应
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                cb(JSON.parse(xhr.responseText));
            }
        }
    }

    if (method == 'GET') {
        xhr.open(method, url + '?' + data, isAsync);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-url-urlencoded');
        xhr.send(data);
    }
}