var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f']; //box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#6161616']; //body背景色

var style = document.createElement('style');
var str = "";
var boxs = document.querySelectorAll('.box');
var rot = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)']
var content = document.getElementById('content');
for (var i = 0; i < boxBg.length; i++) {
    // str += '.box:nth-child(1) div{'+
    //        'background: boxBg[i] , url(images/i.png),no-repeat,center;'+
    //        '}'

    str += `.box:nth-child(${i+1}) div{
        background:${boxBg[i]}  url(img/${i+1}.png) no-repeat center;
    }`
}

style.innerHTML = str;
document.head.appendChild(style);

boxs.forEach(function (box) {
    box.onmouseenter = function (e) {
        // console.log(getDir(e,this));
        var dir = getDir(e, this);
        this.style.transform = 'translateZ(150px)' + rot[dir];
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))];
    };
    box.onmouseleave = function (e) {
        this.style.transform = '';
    };
})

function getDir(e, box) {
    var l = box.getBoundingClientRect().left;
    var t = box.getBoundingClientRect().top;

    var w = box.offsetWidth;
    var h = box.offsetHeight;
    var x = e.clientX - l - w / 2;
    var y = e.clientY - t - h / 2;
    var deg = Math.atan2(y, x) / (Math.PI / 180);
    var d = (Math.round((deg + 180) / 90) + 3) % 4;
    return d;
}

document.onmousemove = function (e) {
    // console.log(e.clientX,window.innerHeight)
    /* 
                 4
                 3
                 2
                 1
    4  3  2  1   0   1  2  3  4
                -1
                -2
                -3
                -4
    */
    var x = -(0.5 - e.clientX / window.innerWidth) * 15; // 0 - 1
    // console.log(x);
    var y = -(e.clientY / window.innerHeight - 0.5) * 15;
    // console.log(x,y);
    content.style.transform = 'perspective(1000px) rotateX(' + y +'deg) rotateY('+ x +'deg)';
}


