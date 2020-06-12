$('#send-btn').click(function () {
    var val = $('#send-text').val();
    if (val) {
        renderDom('mine', val);
        $('#send-text').val('');
        $.ajax({
            type:'get',
            url:'https://developer.duyiedu.com/edu/turing/chat',
            data:{
                text : val
            },
            dataType:'json',
            success:function(res){
                console.log(res);
                renderDom('robot',res.text);
            }
        })
    }
})

function renderDom(who, text) {
    $(` <div class="${who}">
    <div class="avator"></div>
    <div class="text">${text}</div>
</div>`).appendTo($('.contain'))

    $('.contain').scrollTop($('.contain')[0].scrollHeight - $('.contain').innerHeight());
}

$('#send-text').on('keyup',function(e){
    if(e.keyCode == 13 ){
        $('#send-btn').click();
    }
})