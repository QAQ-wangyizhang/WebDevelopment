// 游戏条件函数 包含胜利 失败 绑定时间 得分 定时器

const game = new Game();
// 定时器
game.timer = null;
// 得分
game.score = 0;

game.init = function () {
    // 地图初始化
    ground.init();
    // 蛇初始化
    snake.init();
    // 毒药的生成
    this.bane = createBane();
    // 食物生成
    createFood(this.bane);
    // 绑定事件
    this.bandEvent();
}
game.bandEvent = function () {
    const btn = document.querySelector("#btn");
    btn.onclick = function () {
        game.start()
    };
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38:
                if (snake.direction !== directionList.bottom) {
                    snake.direction = directionList.top;
                }
                break;
            case 40:
                if (snake.direction !== directionList.top) {
                    snake.direction = directionList.bottom;
                }
                // 下
                break;
            case 37:
                if (snake.direction !== directionList.right) {
                    snake.direction = directionList.left;
                }
                // 左
                break;
            case 39:
                if (snake.direction !== directionList.left) {
                    snake.direction = directionList.right;
                }
                // 右
                break;
        }
    }
}
// 游戏开始
game.start = function () {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
        snake.getNextSquare();
    }, setTimeDelay);
}
// 游戏结束
game.over = function () {
    clearInterval(this.timer)
    alert("您的得分" + this.score)
    const reset = window.confirm("是否要重新开始");
    if (reset) {
        location.reload();
    }
}