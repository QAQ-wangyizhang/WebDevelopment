const gameOverDom = document.getElementsByClassName('gameover')[0];


gameOverDom.onclick = () =>{
    window.location.reload();
}

class Game {
    constructor(speed) {
        this.sky = new Sky();
        this.land = new Land(speed);
        this.bird = new Bird();
        this.producter = new PipeProduction(speed);
        this.timer = null;
        this.tick = 16;
        this.time = 1000;
        this.gameOver = false;
        this.score = 0;
    }

    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.producter.startProduct();
        this.bird.flyStart();
       
        this.timer = setInterval(() => {
            this.bird.move(this.tick / this.time);
            this.sky.move(this.tick / this.time);
            this.land.move(this.tick / this.time)
            this.producter.pairs.forEach(ele => {
                ele.move(this.tick / this.time);
            });
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
                gameOverDom.style.display = "block";
            }

        }, this.tick);
    }


    stop() {
        clearInterval(this.timer);
        this.bird.flyStop();
        this.producter.stopProduct();
        this.timer = 0;
    }

    isHit(rect1, rect2) {
        // 两个矩形的中心点的距离 是否小于矩形之和的一半
        let centerX1 = parseFloat(rect1.left)  + rect1.width / 2;
        let centerX2 = parseFloat(rect2.left)  + rect2.width / 2;
        let centerY1 =  rect1.top + rect1.height / 2;
        let centerY2 =  rect2.top + rect2.height / 2;
        let disX = Math.abs(centerX1 - centerX2);
        let disY = Math.abs(centerY1 - centerY2);
        if (disX < (rect1.width + rect2.width) / 2 && disY < (rect1.height + rect2.height) / 2){
            return true;
        }else{
            return false;
        }
    }

    isGameOver() {
        if (this.bird.top >= 470 || this.bird.top <= 0) {
            return true;
        }
        for (let i = 0; i < this.producter.pairs.length; i++) {
            const pipe = this.producter.pairs[i];
            // console.log(pipe);
            if (this.isHit(this.bird, pipe.pipeUp) || this.isHit(this.bird, pipe.pipeDown)) {
                return true;
            }
        }
        return false;
    }

   

   

    regEvent() {
        window.onkeydown = (e) => {
            if (e.key == "Enter") {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            } else if (e.key == " ") {
                this.bird.jump();
            }
        }
        window.onclick = () =>{
            this.bird.jump();
        }
    }
}

var g = new Game(-100);
g.regEvent();