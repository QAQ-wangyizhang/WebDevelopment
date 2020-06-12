function init(){
    location.hash='student-list';
    bindEvent();
}
init();

function bindEvent(){ 
    // 下拉菜单
    var list = $('.drop-list');
    $('header .btn').click(function(){
        list.slideToggle();
    })
    $(window).resize(function(){
        if($(window).innerWidth() >= 768){
            list.css({display:'none'});
        }
    })
    // 地址栏哈希值变化在事件开始
    $(window).on('hashchange',function(){
        var hash = location.hash;
        // console.log(hash);
        $('.show-list').removeClass('show-list');
        $(hash).addClass('show-list');

        $('.list-item.active').removeClass('active');
        $('.' + hash.slice(1)).addClass('active');
    })

    $('.list-item').click(function(){
        $('.drop-list').slideUp();
        var id = $(this).attr('data-id');
        location.hash = id;
    })
}