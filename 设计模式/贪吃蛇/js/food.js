// 创建食物的位置 此位置要求出现在地板上 且不能出现在 蛇身上(循环链表来判断)
function createFood(bane = undefined) {
    let x, y, flag, key;
    flag = true;
    // 创建条件
    while (flag) {
        // 这里排除了 食物出现在墙壁上的情况
        x = Math.round(Math.random() * (tr - 2 - 1) + 1);
        y = Math.round(Math.random() * (td - 2 - 1) + 1);
        // 默认key 为 真
        key = true;

        if (bane && x == bane.x && y == bane.y) {
            key = false;
            break;
        }
        // 链表的循环方式
        for (let node = snake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                // 如果 出现在蛇身上则 跳出循环同时通过 key 控制死循环
                key = false;
                break;
            }
        }
        if (key) {
            // 跳出循环
            flag = false;
        }
    }
    // 生成食物
    const food = SquareFactory.create("Food", x, y, 'pink');
    // 移除原来的方块
    ground.remove(x, y);
    // 添加食物方块
    ground.append(food);
}