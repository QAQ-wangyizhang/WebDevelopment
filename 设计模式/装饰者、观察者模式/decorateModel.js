// 工厂方法模式
PlaneFactory.prototype = new Event();
function PlaneFactory() {
    this.decorat_list = [];
}

// 装饰者模式
// 装饰者方法集合
PlaneFactory.prototype.decorators = {
    eatOneLife: function (obj) {
        obj.blood *= 2;
    },
    eatTwoLife: function (obj) {
        obj.blood *= 3;
    }
}
// 装饰者方法
PlaneFactory.prototype.decorator = function (decorator) {
    this.decorat_list.push(decorator);
}
// 更新装饰后的属性
PlaneFactory.prototype.update = function () {
    for (let i = 0; i < this.decorat_list.length; i++) {
        this.decorators[this.decorat_list[i]] && this.decorators[this.decorat_list[i]](this);
    }
}

PlaneFactory.prototype.empty = function () {
    this.decorat_list = [];
}

PlaneFactory.prototype.remove = function (type) {
    this.decorat_list = this.decorat_list.filter(item => {
        return !(type == item)
    })
}




PlaneFactory.prototype.touch = function () {
    this.blood -= 50;
    if (this.blood == 0) {
        this.die();
    }
}
PlaneFactory.prototype.die = function () {
    console.log("boom")
}
// 创建小飞机
PlaneFactory.prototype.SmallPlane = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.blood = 100;
}

// 创建大飞机
PlaneFactory.prototype.BigPlane = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 200;
    this.blood = 200;
}
// 创建对象的公共方法
PlaneFactory.create = function (type) {
    if (PlaneFactory.prototype[type] == undefined) {
        throw "no this type";
    }

    PlaneFactory.prototype[type].prototype = new PlaneFactory();
    let arg = [].slice.call(arguments, 1);
    // [10,20]
    let newPlane = new PlaneFactory.prototype[type](...arg);
    return newPlane;
}




let big = PlaneFactory.create("BigPlane", 20, 20);
let big1 = PlaneFactory.create("BigPlane", 20, 20)
big.decorator("eatOneLife");
big.decorator("eatTwoLife");
big.remove("eatTwoLife");    
big.on("over",function(){
    big.die();
})


