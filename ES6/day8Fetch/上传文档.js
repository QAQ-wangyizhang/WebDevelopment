/*
 * @Author: your name
 * @Date: 2020-06-28 16:03:44
 * @LastEditTime: 2020-06-28 16:30:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\day8Fetch\上传文档.js
 */ 

//  请求方法 post 文件大
// 请求的表单格式 multipart/form-data 用ajax 就不用管这个
// 请求体中必须包含一个键值对 键的名称是服务器要求的名称 这里表单域名称 ： imagefile 值是文件数据
// 测试地址 http://101.132.72.36:5100/api/upload

const btn = document.getElementById("btn");
const text = document.getElementsByTagName("input")[1];
// s
async function upload(){
    const inp = document.getElementsByTagName("input")[0];
    const formData = new FormData();//构建请求体;
    formData.append("imagefile",inp.files[0]);
    // console.log(inp.files); // 获取选中的文件信息
    const url = "http://101.132.72.36:5100/api/upload";
    const resp = await fetch(url,{
        method:"POST",
        body : formData // 自动修改请求头
    });
    const result = await resp.json();
    return result;
}

btn.onclick = async function(){
   const result = await upload();
   console.log(result);
   document.getElementById("img").src = result.path;
}