// base 是基础方法 用来 继承 和实现单例对象的方法

const tool = {
    // 克隆
    inherit: function (target, origin) {
        var F = function () {};
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.construct = target;
    },
    // 继承 继承了 构造函数的参数
    extend: function (origin) {
        var target = function () {
            origin.apply(this, arguments)
        }
        this.inherit(target, origin);
        return target;
    },
    // 单例对象 表达为 无论new 多少个 他都只有一个实例对象 所有实例对象都相等
    // 
    single: function (origin) {
        var target = (function () {
            var instance;
            return function () {
                if (typeof instance === "object") {
                    return instance;
                }
                origin && origin.apply(this, arguments)
                instance = this;
            }
        })()
        // 当不传参 只作为 一个单例 函数
        origin &&  this.inherit(target, origin);
        return target;
    }
}

// function Father(name, age, sex) {
//     this.name = name;
//     this.age = age;
//     this.sex = sex;
// }
// Father.prototype.print = function () {
//     console.log("haha")
// }

// // function Son (){

// // }

// // tool.inherit(Son,Father);
// var Son = tool.single(Father);

// const son = new Son(10, 10, 10);
// const son1 = new Son(10, 10, 10);
// son.print();
// console.log(son == son1)
// console.log(son,son1)