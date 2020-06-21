const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);


class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.timer = null;
        this.flyStatus = 1;
        this.render();
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.flyStatus}`;
    }

    flyStart() {
        if(this.timer){
            return null;
        }
        this.timer = setInterval(() => {
            this.flyStatus++;
            if (this.flyStatus === 4) {
                this.flyStatus = 1;
            }
        }, 100);
    }

    flyStop() {
        clearInterval(this.timer);
        this.timer = null;
    }


    move(duration) {
        super.move(duration);
        this.speedY += this.g * duration;
    }
    onMove() {
        if (this.top >= 470) {
            this.top = 470;
        } else if (this.top <= 0) {
            this.top = 0;
        }
    }
    jump() {
        this.speedY = -550;
        this.render();
    }
}

