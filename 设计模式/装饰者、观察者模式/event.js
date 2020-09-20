// Event
// 1. Event on emmit remove once
// 2. 有助于了解 观察者模式
// 3. node


function Event() {
    // 存储不同事件类型对应的不同处理函数
    this.cach = {};
}

Event.prototype.on = function (type,handle) {
    if(!this.cach[type]){
        this.cach[type] = [handle];
    }else{
        this.cach[type].push(handle);
    }
}
Event.prototype.emmit = function () {
    let type = arguments[0];
    let arg = [].slice.call(arguments,1);
    for(let i =0;i < this.cach[type].length;i++){
        this.cach[type][i](...arg);
    }
}
Event.prototype.empty = function () {
    this.cach = {};
}
Event.prototype.remove = function (type, handle) {
    this.cach[type] = this.cach[type].filter(item => {
        return !(item == handle)
    })
}
Event.prototype.once = function (type,handle) {
 this.cach[type] &&  this.cach[type].length != 0 && this.cach[type][0](handle);
}

let oE = new Event();
let deal1 = function (time) {
    console.log("overtime1 " + time)
}
let deal2 = function(time){
    console.log("overtime2 " + time)
}
// oE.on("over", deal1)

// oE.on("over", deal2)

// oE.emmit("over","2020-9-20");

// oE.once("over","只触发一次")


// oE.remove("over",deal1);
// oE.remove("over",deal2)

// oE.emmit("over","2020-9-20");