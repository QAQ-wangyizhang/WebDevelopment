/* 


*/
const gameDom = document.querySelector('.game');
const gameStyles = getComputedStyle(gameDom);
const gameHeight = parseFloat(gameStyles.height);
const gameWidth = parseFloat(gameStyles.width);

class Rectangle{
    constructor(width,height,left,top,speedX,speedY,dom){
        this.width = width;
        this.height =height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
        this.render();
    }

    render(){
        this.dom.style.left = this.left + 'px'; 
        this.dom.style.top = this.top + 'px'; 
        this.dom.style.width = this.width + 'px'; 
        this.dom.style.height = this.height + 'px'; 
    }

    move(duration){
        const disX = duration * this.speedX;
        const disY = duration * this.speedY;
        this.left = disX + this.left;
        this.top = disY + this.top;
        if(this.onMove){
            this.onMove();
        }
        this.render();
    }
}