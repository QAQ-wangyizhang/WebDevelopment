var ul = document.querySelector('#wrap ul');
var lis = document.querySelectorAll('#wrap ul li');
var last = null; // 上一个选中的li
var coloseBtns = document.querySelectorAll('#wrap .close');

setTimeout(function () {
    ul.className = '';
}, 200);

lis.forEach(function (ele, index) {
    ele.onclick = function () {
        ul.setAttribute('id','activeWrap');
        last && (last.className = ''); // 把上一个变成空
        this.className = 'active';
        last = this; // 把当前点击的元素赋值给last
        console.log(1);
    }
    coloseBtns[index].onclick = function(e){
        ul.removeAttribute('id');
        lis[index].className = '';
        e.cancelBubble = true
        // 取消冒泡事件
    }
});