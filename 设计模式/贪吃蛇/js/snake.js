// 工具方法 简化删除创建蛇
function createSnake(square, construct, x, y, color) {
    square = SquareFactory.create(construct, x, y, color);
    ground.remove(square.x, square.y);
    ground.append(square)
    // 对外暴露蛇方块的实例
    return square;
}
// 存储上下左右的坐标 已经坐标如何变化
const directionList = {
    right: {
        x: 1,
        y: 0,
    },
    left: {
        x: -1,
        y: 0
    },
    top: {
        x: 0,
        y: -1,
    },
    bottom: {
        x: 0,
        y: 1
    }
}
// 蛇整体的实例对象
const snake = new Snake();
snake.head = null; // 蛇头
snake.tail = null; // 蛇尾
snake.init = function () {
    let snakeHead, // 蛇头
        snakeBody1, // 蛇身体
        snakeBody2; //  蛇身体
    this.head = createSnake(snakeHead, 'SnakeHead', 3, 1, 'red');
    this.body1 = createSnake(snakeBody1, 'SnakeBody', 2, 1, 'green');
    this.tail = createSnake(snakeBody2, 'SnakeBody', 1, 1, 'green');
    // 链表处理
    this.head.next = this.body1;
    this.head.last = null;

    this.body1.next = this.tail;
    this.body1.last = this.head;

    this.tail.next = null;
    this.tail.last = this.body1;


    // 默认初始化方向为向右
    this.direction = directionList.right;
}
// 得到下一个移动的小方块的坐标并且相应的采取某些行动
snake.getNextSquare = function () {
    // 蛇头位置 + 方向 在ground 的二维数组里 可以得到下一个方块的实例对象
    const nextSquare = ground.squareArr[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // 通过工厂模式生产的所有方块都带有信息 蛇的身体为 die 地板为 move  食物为 eat 传入下一个方块的实例对象
    this.collideMethond[nextSquare.info](nextSquare);
}
// 蛇遇见不同移动方式的处理函数
snake.collideMethond = {
    // 如何移动？？？
    // 这里分为三步  ps如果直接碰到墙或蛇自己 则直接调用over函数清楚定时器并且结束游戏
    // 第一步 删除原来的蛇头 添加一个新的身体 重置链表关系
    // 第二步 更新(创建)一个新蛇头 其坐标为下一个方块(nextSquare)的坐标 更新链表
    // 第三步 判断是否吃到食物  如果没有 正常删除蛇尾 将原来的身体部分变为新蛇尾 并且更新链表
    //        由于吃到食物 和 不吃食物 复用多所以传一个参数key来重复 低耦合
    //        吃到食物时，不删除蛇尾 什么都不做 只是添加一个新身体
    // 正常移动
    move(nextSquare, key) {
        // 添加新身体
        const newBody = SquareFactory.create("SnakeBody", snake.head.x, snake.head.y, 'green');

        // 更新链表
        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;

        // 更新坐标后再添加和删除
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 更新新的头部信息
        const newHead = SquareFactory.create("SnakeHead", nextSquare.x, nextSquare.y, 'red');
        newHead.next = newBody;
        newBody.last = null;
        newBody.last = newHead;
        ground.remove(nextSquare.x, nextSquare.y);
        ground.append(newHead)
        // 不传参默认为undefined 为 false
        if (!key) {
            // 没有吃到食物 所以会删除尾巴
            // 删除尾巴
            const newFloor = SquareFactory.create("Floor", snake.tail.x, snake.tail.y, 'grey');
            ground.remove(snake.tail.x, snake.tail.y)
            ground.append(newFloor)
            // 更新蛇尾 因为删除了蛇尾 所以呢 新蛇尾 就是 原来老蛇尾的上一个元素
            snake.tail = snake.tail.last;
            snake.tail.next = null;
        }
    },
    // 下一个方块吃到食物了
    eat(nextSquare) {
        // 吃到食物 就不删除蛇尾巴了 并且传一个参数 true
        this.move(nextSquare, true)
        // 再次更新食物的坐标
        createFood(game.bane);
        // 加分
        game.score++;
    },
    // 碰到自己身体 或者碰到墙了
    die() {
        // 结束游戏
        game.over()
    }
}