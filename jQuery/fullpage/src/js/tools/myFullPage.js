// 实例方法
$.fn.extend({
    myFullPage: function (config) {

        // 初始化变量
        var colorArray = config.colorsArray;
        var $Wrapper = $(this);
        var $Section = $Wrapper.find('.section');
        var commonStyle = {
            width: '100%',
            height: '100%',
        }
        var clientWidth = $(window).outerWidth();
        var clientHeight = $(window).outerHeight();
        // 索引 0 = 第一个
        var curIndex = 0;
        var curIndexL = 0;
        var lock = true;
        // 促使化样式
        $('html')
            .add('body')
            .css({
                position: 'relative',
                overflow: 'hidden',
                margin: 0
            })
            .add($Wrapper)
            .add($Section)
            .css(commonStyle);
        $Wrapper.css({
                position: 'absolute',
                left: 0,
                top: 0
            }).find('.section')
            .each(function (index, ele) {
                $(ele).css({
                        backgroundColor: colorArray[index],
                        position: 'relative'
                    }).find('.slide')
                    .css({
                        float: 'left',
                        width: clientWidth,
                        height: clientHeight
                    }).wrapAll('<div class = "sliderWrapper"></div>')
            })
        $Section.find('.sliderWrapper')
            .each(function (index, ele) {
                $(ele).css({
                    position: 'absolute',
                    left : 0,
                    width: $(ele).find('.slide').length * clientWidth,
                    height: clientHeight,
                })
            });

        // js 控制移动
        // active
        // 先给第一 section active
        // 给每一个 section 下面的第一个slide innerActive
        // 类名初始化
        $Section.eq(0)
            .addClass('active')
            .end('.sliderWrapper')
            .each(function (index, ele) {
                $(ele).find('slide')
                    .eq(0).addClass('innerActive')
            })

        // 控制移动
        $(document).on('keydown', function (e) {
            // e.which
            // left 37 , top 38 right 39 , bottom 40
            if (e.which == 38 || e.which == 40) {
                // 垂直移动
                var newTop = $Wrapper.offset().top;
                var direction = '';
                if (lock) {
                    lock = false;
                    if (e.which == 38 && curIndex != 0) {
                        direction = 'top';
                        // top 
                        config.onLeave(curIndex,direction);
                        curIndex--;
                        newTop += clientHeight;
                        
                    } else if (e.which == 40 && curIndex != $Section.length - 1) {
                        direction = 'bottom';
                        config.onLeave(curIndex,direction);
                        curIndex++;
                        newTop -= clientHeight;
                        
                    }
                    $Wrapper.animate({
                        top: newTop
                    }, 350, 'swing', function () {
                        lock = true;
                        $Section.eq(curIndex).addClass('active');
                        if(direction == 'top'){
                            $Section.eq(curIndex + 1).removeClass('active');
                        }else if(direction == 'bottom'){
                            $Section.eq(curIndex - 1).removeClass('active');
                        }
                        config.afterLoad(curIndex,direction);
                    })
                }
            }
            if (e.which == 37 || e.which == 39) {
                // 水平移动
                var $SW = $('.active').find('.sliderWrapper');
                var newLeft = $SW.offset().left;
                var directionL = '';
                if(lock){
                    lock = false;
                    if(e.which == 37 && curIndexL != 0){
                        // 左移动
                        directionL = 'left';
                        config.onLeave(curIndexL,directionL);
                        curIndexL --;
                        newLeft += clientWidth;
                        
                    }else if(e.which == 39 && curIndexL != $SW.find('.slide').length - 1){
                        directionL = 'right'
                        config.onLeave(curIndexL,directionL);
                        curIndexL ++;
                        newLeft -= clientWidth;
                        
                    }
                    $SW.animate({
                        left : newLeft
                    },350,'swing',function(){
                        lock = true;
                        $SW.children().eq(curIndexL).addClass('innerActive');
                        if(directionL == 'left'){
                            $SW.children().eq(curIndexL + 1).removeClass('innerActive')
                        }else{
                            $SW.children().eq(curIndexL - 1).removeClass('innerActive')
                        }
                        config.afterLoad(curIndexL,directionL);
                    })
                }
            }
        })

    }
})