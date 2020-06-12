var pageEngine = {
    // $W : $(selector),
    // colorsArray: ['#c8d6e5', '#ff6b6b', '#48dbfb'],
    init: function (selector, colorsArray) {
        this.$W = $(selector);
        this.colorsArray = colorsArray;
        this.slideFlag = false;
        return this;
    },
    addSection: function (className) {
        this.slideFlag = false;
        this.$Page = $('<div class = "section"></div>').addClass(className);
        this.$Page.appendTo(this.$W);
        return this;
    },
    addSlide: function (className) {
        this.slideFlag = true;
        this.$Slide = $('<div class = "slide"></div>').addClass(className);
        this.$Slide.appendTo(this.$Page);
        return this;
    },
    addComponent: function (config) {
        var oCp = CompontFactory(config);
        switch (config.type) {
            case 'base':
                oCp = CompontFactory(config);
                break;
            case 'super':
                oCp = CompontSuperFactory(config);
                break;
            default:
                oCp = CompontFactory(config);
        }
        this.slideFlag ? this.$Slide.append(oCp) : this.$Page.append(oCp);
        return this;
    },
    bindEvent :function(){
        this.$W.find('.section').on({
            _leave :function(){
                $(this).find('.component').trigger('cpLeave');
            },
            _load :function(){
                $(this).find('.component').trigger('cpLoad');
            }
        })
        return this;
    },
    load: function () {
        var self = this;
        this.$W.myFullPage({
            colorsArray: this.colorsArray,
            onLeave : function(index){
                self.$W.find('.section').eq(index).trigger('_leave');
            },
            afterLoad :function(index){
                self.$W.find('.section').eq(index).trigger('_load');
            }
        })
    }

}