
// y 是 td列  x 是行 tr
// 地图的函数 创建原始地图 构造初始的方块集合
// 暴露出去 一个所有方块坐标的二维数组
//          三个方法 init 初始化地图的方法 remove(x,y) 删除 x,y点坐标的方法 append(square) 添加一个小方块的方法
const ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);
ground.init = function () {
    this.viewContent.style.position = "absolute";
    this.viewContent.style.width = this.w + "px";
    this.viewContent.style.height = this.h + "px";
    this.viewContent.style.left = this.x + "px";
    this.viewContent.style.top = this.y + "px";
    this.viewContent.style.backgroundColor = "yellow";
    document.body.appendChild(this.viewContent);
    // 保存小方块的二维数组
    this.squareArr = [
        [],
        []
    ];
    // 制造方块
    for (let y = 0; y < tr; y++) {
        this.squareArr[y] = new Array(tr);
        for (let x = 0; x < td; x++) {
            if (y == 0 || y == tr - 1 || x == 0 || x == td - 1) {
                var newSquare = SquareFactory.create('Wall', x, y, 'black');
            } else {
                var newSquare = SquareFactory.create('Floor', x, y, 'grey');
            }
            // 这个数组里x y 和 实际上的坐标相反
            this.squareArr[y][x] = newSquare
            document.body.appendChild(newSquare.viewContent)
        }
    }
}
// 游戏场景里删除方块
ground.remove = function (x,y) {
    const delSquare = this.squareArr[y][x].viewContent;
    // 删除数组里的
    this.squareArr[y][x] = null;
    // 删除dom的
    document.body.removeChild(delSquare);
}
// 游戏场景里添加一个方块
ground.append = function(square){
    // 添加到页面
    document.body.appendChild(square.viewContent);
    // 添加到数组
    this.squareArr[square.y][square.x] = square;
}

