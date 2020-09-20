// 工厂模式

// 行是y 列是x
// 1.创建管理者
function SquareFactory() {}
// 2. 保证创建方块的构造函数（流水线，子工厂）
SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = "absolute"; //定位
    square.viewContent.style.width = square.w + "px";
    square.viewContent.style.height = square.h + "px";
    square.viewContent.style.left = square.x * squareWidth + positionX + "px";
    square.viewContent.style.top = square.y * squareWidth + positionY + "px";
    square.viewContent.style.backgroundColor = color; // 小方块背景颜色
    square.info = action; // 小方块身上的信息
}
// 生产地板的工厂
SquareFactory.prototype.Floor = function (x, y, color) {
    // 创建实例
    const floor = new Floor(x, y, squareWidth, squareWidth);
    // 初始化实例身上的所有属性
    this.init(floor, color, collideType.move);
    // 返回实例
    return floor;
}
// 生产墙面的工厂
SquareFactory.prototype.Wall = function (x, y, color) {
    const wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, collideType.die)
    return wall;
}
// 蛇头的工厂
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    const snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    snakeHead.update(x, y); // 更新单例对象的信息
    this.init(snakeHead, color, collideType.die)
    return snakeHead;
}
// 蛇身体的工厂
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    const snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, collideType.die)
    return snakeBody;
}
// 食物的工厂
SquareFactory.prototype.Food = function (x, y, color) {
    const food = new Food(x, y, squareWidth, squareWidth);
    food.update(x, y); // 因为食物也是单例对象 所以也要更新 坐标
    this.init(food, color, collideType.eat)
    return food;
}
SquareFactory.prototype.Bane = function(x,y,color){
    const bane = new Bane(x,y,squareWidth,squareWidth);
    bane.update(x,y);
    this.init(bane,color,collideType.die)
    return bane;
}

// 3. 提供对外的接口
SquareFactory.create = function (type, x, y, color) {
    // 判断自己的工厂的流水线上有没有 type 的生产线
    if (!SquareFactory.prototype.hasOwnProperty(type)) {
        throw "no this type"
    }
    // 子工厂 继承父工厂 的方法
    SquareFactory.prototype[type].prototype = new SquareFactory();
    // 通过子工厂的构造函数返回实例对象
    return new SquareFactory.prototype[type](x, y, color)
}