function Banner() {
    this.list = document.getElementsByClassName('list')[0];
    this.timer = null;
    this.wrapper = document.getElementsByClassName('wrapper')[0];
    this.distance = this.wrapper.offsetWidth;
    this.prev = document.getElementsByClassName('prev')[0];
    this.next = document.getElementsByClassName('next')[0];
    this.num = 0;
    this.curIndex = 0;
    this.dotList = document.getElementsByClassName('dot');
    this.text = document.getElementsByTagName('span')[0];
    this.timout = null;
}

Banner.prototype.spanBtn = function(){
    var self = this;
    for(let i = 0; i < 5; i ++){
        this.dotList[i].onclick = function (){
            clearInterval(self.timer);
            self.continueMove();
            self.curIndex = i;
            self.dotMove();
            self.textChange();
            self.list.style.left =  -self.curIndex * self.distance + 'px';
            
        }
    }
}

Banner.prototype.mouseEnter = function (){
    var self = this;
    this.wrapper.onmouseenter = function(){
        clearInterval(self.timer);
        self.continueMove();
    }
}

Banner.prototype.continueMove = function (){
    clearInterval(this.timout);
    this.timout =  setTimeout(() => {
        this.startMove();
    }, 3500);
}

Banner.prototype.dotMove = function () {
    for (var i = 0; i < this.dotList.length; i++) {
        if (i == this.curIndex) {
            this.dotList[this.curIndex].classList.add('active');
        } else {
            this.dotList[i].classList.remove('active');
        }

    }
}

Banner.prototype.textChange = function () {
    if (this.curIndex == 5) {
        this.text.innerText = '1 / 5';
    } else {
        this.text.innerText = this.curIndex + 1 + ' ' + '/ 5';
    }

}

Banner.prototype.nextButton = function () {
    var self = this;
    this.next.onclick = function () {
        self.curIndex ++;
        clearInterval(self.timer);
        self.continueMove();
        if(self.curIndex >= 5){
            self.curIndex = 0;
        }
        self.dotMove();
        self.textChange();

        self.list.style.left =  - self.curIndex * self.distance + 'px';
    }
}

Banner.prototype.prevButton = function () {
    var self = this;
    this.prev.onclick = function () {
        self.curIndex --;
        clearInterval(self.timer);
        self.continueMove();
        if(self.curIndex < 0){
            self.curIndex = 4;
        }
        self.dotMove();
        self.textChange();

        self.list.style.left =  - self.curIndex * self.distance + 'px';
    }
}



Banner.prototype.startMove = function () {

    this.timer = setInterval(() => {
        this.list.style.transition = '0.5s';
        ++this.curIndex;

        this.dotMove();
        this.textChange();
        if (this.curIndex == 5) {
            this.curIndex = 0;
            this.list.style.transition = 'none';
            this.dotList[0].classList.add('active');
            this.list.style.left = '0px';
         
        }else{
            this.list.style.left = -this.curIndex * this.distance + 'px';
        }
        
      
        

    },1500);

}

Banner.prototype.init = function () {
    this.startMove();
    this.nextButton();
    this.prevButton();
    this.spanBtn();  
    this.mouseEnter();
}

var banner = new Banner();
banner.init();
