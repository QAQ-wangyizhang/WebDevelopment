const scoreDom = document.getElementsByClassName('score')[0];

class Pipe extends Rectangle {
    constructor(pipeHeight, pipeTop, speed, dom) {
        super(52, pipeHeight, gameWidth, pipeTop, speed, 0, dom);
    }

    onMove() {
        if (this.left <= -this.width) {
            this.dom.remove();
        }
    }
}
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

class PipePare {
    constructor(speed) {
        this.spaceHeight = 200;
        this.minHeight = 80;
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        const upHeight = getRandomNumber(this.minHeight, this.maxHeight)
       

        const upDom = document.createElement('div');
        upDom.className = "pipe up";
        this.pipeUp = new Pipe(upHeight, 0, speed, upDom);
        const downHeight = landTop - this.spaceHeight - upHeight;
        const downTop = landTop - downHeight;

        const downDom = document.createElement('div');
        downDom.className = "pipe down";
        this.pipeDown = new Pipe(downHeight, downTop, speed, downDom);
        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }


    get useLess(){
        return this.pipeUp.left < -this.pipeUp.width;
    }

    move(duration){
        this.pipeUp.move(duration);
        this.pipeDown.move(duration);
    }
}

class PipeProduction{
    constructor(speed){
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
        this.speed = speed;
        this.score = 0;
    }

    startProduct(){
        if(this.timer){
            return false;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            for(let i = 0; i < this.pairs.length; i++){
                let pair = this.pairs[i];
                if(pair.pipeUp.left < 180 - 52){
                    this.score ++;
                }
                scoreDom.innerText = ` ${this.score} `;
                if(pair.useLess){
                    this.pairs.splice(i,1);
                }
            }
        }, this.tick);
    }

    stopProduct(){
        clearInterval(this.timer);
        this.timer = null;
    }
} 

let producter = new PipeProduction(-100);

// let pair = new PipePare(-100);