// $('.wrapper').myFullPage({
//     colorsArray: ['#c8d6e5', '#ff6b6b', '#48dbfb'],
//     onLeave : function(index,direction){
//         // console.log(index,direction);
//         // 找到离开的页面
//         // $('.section').eq(index).find('.component').fadeOut();
//         $('.section').eq(index).trigger('_leave');
//     },
//     afterLoad : function(index,direction){
//         // console.log(index,direction);
//         // 找到进入的页面
//         // $('.section').eq(index).find('.component').fadeIn();
//         $('.section').eq(index).trigger('_load');
//     }
// })

// var imgsArray = ["/jQuery/fullpage/src/img/宝多六花.jpg","/jQuery/fullpage/src/img/02.jpg","/jQuery/fullpage/src/img/fly.jpg"];
// // function CompontFactory(){
// //     var $Div = $('<div class="component" style="display: none; text-align: center;font-size: 0px;"><img src = ""></div>');
// //     $Div.on('cpLeave',function(){
// //         $(this).fadeOut();
// //     })
// //     $Div.on('cpLoad',function(){
// //         $(this).fadeIn();
// //     })
// //     return $Div;
// // }

// $('.section').each(function (index, ele) {
//     $(ele).append(CompontFactory({
//         className: 'duyi',
//         width: 400,
//         height: 250,
//         text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
//         center: true,
//         css: {
//             position: 'absolute',
//             opacity: 0,
//             bottom: 0,
//             backgroundImage: imgsArray[0],
//             backgroundSize: '100% 100%',
//             padding: '10px 15px 10px 15px',
//             textAlign: 'justify',
//             fontSize: '18px',
//             fontWeight: '900',
//             lineHeight: '25px'
//         },
//         animateIn: {
//             opacity: 1,
//             bottom: 140,
//         },
//         animateOut: {
//             opacity: 0,
//             bottom: 0
//         },
//         delay: 200,
//         event: {
//             click: function () {
//                 alert($(this).text());
//             }
//         }
//     }));
// })

// // $('.component').eq(0).css({
// //     display : 'block'
// // }).end('.component').find('img').each(function(index,ele){
// //     $(ele).attr('src',imgsArray[index]);
// // });

// $('.section').on('_leave',function(){
//     // trigger(event) 触发事件
//     $(this).find('.component').trigger('cpLeave');
// })

// $('.section').on('_load',function(){
//     $(this).find('.component').trigger('cpLoad');
// })

// // 可扩展性
var colorsArray = ['#c8d6e5', '#ff6b6b', '#48dbfb'];

pageEngine.init('.wrapper',colorsArray)
    .addSection('oneSection')
    .addComponent({
        className: 'duyi',
        width: 400,
        height: 250,
        text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
        center: true,
        css: {
            position: 'absolute',
            opacity: 0,
            bottom: 0,
            backgroundSize: '100% 100%',
            padding: '10px 15px 10px 15px',
            textAlign: 'justify',
            fontSize: '18px',
            fontWeight: '900',
            lineHeight: '25px'
        },
        animateIn: {
            opacity: 1,
            bottom: 140,
        },
        animateOut: {
            opacity: 0,
            bottom: 0
        },
        delay: 200,
        event: {
            click: function () {
                alert($(this).text());
            }
        }
    })
    .addSection('twoSection')
    .addComponent({
        className: 'duyi',
        width: 400,
        height: 250,
        text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
        center: true,
        css: {
            position: 'absolute',
            opacity: 0,
            bottom: 0,
            backgroundSize: '100% 100%',
            padding: '10px 15px 10px 15px',
            textAlign: 'justify',
            fontSize: '18px',
            fontWeight: '900',
            lineHeight: '25px'
        },
        animateIn: {
            opacity: 1,
            bottom: 140,
        },
        animateOut: {
            opacity: 0,
            bottom: 0
        },
        delay: 200,
        event: {
            click: function () {
                alert($(this).text());
            }
        }
    })
    .addSection('threeSection')
    .addSlide('3-1-slider')
    .addSlide('3-2-slider')
    .addSlide('3-3-slider')
    .bindEvent()
        .load();