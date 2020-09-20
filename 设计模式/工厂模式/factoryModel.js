// 1. 原始模式
// let plane = {
//     width : 100,
//     height : 100,
//     blood : 100,
//     touch(){
//         this.blood -= 50;
//         if(this.blood == 0){
//             console.log("die")
//         }
//     }
// }


// 工厂方法模式

function PlaneFactory() {

}
PlaneFactory.prototype.touch = function () {
    this.blood -= 50;
    if (this.blood == 0) {
        this.die();
    }
}
PlaneFactory.prototype.die = function(){
    console.log("boom")
}
// 创建小飞机
PlaneFactory.prototype.SmallPlane = function (x,y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.blood = 100;
}

// 创建大飞机
PlaneFactory.prototype.BigPlane = function (x,y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 200;
    this.blood = 200;
}
// 创建对象的公共方法
PlaneFactory.create = function (type) {
    if(PlaneFactory.prototype[type] == undefined){
        throw "no this type";
    }

    PlaneFactory.prototype[type].prototype = new PlaneFactory();
    let arg = [].slice.call(arguments,1);
    // [10,20]
    let newPlane = new PlaneFactory.prototype[type](...arg);
    return newPlane;
}


let big = PlaneFactory.create("BigPlane",20,20)