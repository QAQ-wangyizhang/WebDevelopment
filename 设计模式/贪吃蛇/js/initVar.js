// 小方块数量
// 这里定义全局变量
const tr = 30, // 行
    td = 30, // 列
    setTimeDelay = 200, // 定义小蛇运动定时器的延时参数
    positionX = 100, // 地图left值
    positionY = 30, // 地图top值
    squareWidth = 20; // 每个小方块的边长

// class Square{
//     constructor(x,y,w,h,dom){
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.dom = dom || document.createElement("div");
//     }
// }
// 所有小方块的构造函数
function Square(x, y, w, h, dom) {
    this.x = x; // 距离left距离
    this.y = y; // 距离top 距离
    this.w = w; // 宽
    this.h = h; // 高
    this.viewContent = dom || document.createElement("div"); // 创建的dom元素 默认为div
}
// 更新单列模式下 x,y 的坐标 可以用于 食物 和 蛇头 坐标的更新
Square.prototype.update = function(x,y){
    this.x = x;
    this.y = y;
}
// 移动方块模式的类型
const collideType = {
    move : "move",
    eat : "eat",
    die : "die"
}
// 初始化所有构造函数
const Ground = tool.single(Square); // 游戏场景
const Floor = tool.extend(Square); // 地板
const Wall = tool.extend(Square); // 围墙
const SnakeHead = tool.single(Square); // 蛇头
const SnakeBody = tool.extend(Square); // 蛇身
const Snake = tool.single(); // 蛇 抽象构造函数 代表了蛇的整体
const Game = tool.single(); // 抽象 代表游戏
const Food = tool.single(Square); // 食物的单例对象
const Bane = tool.single(Square); // 毒药的单例对象