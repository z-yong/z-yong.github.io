$('#left').on('click',leftMove);
$('#right').on("click",rightMove)

var leftVa = 0;
var index = 0;
var flag = true;

// 向左
function leftMove(){
    // stop要写在最前面
    $('.main').stop(false,true);
    if($('.main').position().left == -3120){
        $('#main').css('left','-520px')
    } 
    index -- ; 
    if(index < 0){
        index = 4
    }
    color();
    $('.main').animate({
        'left': '-=520'
    })   
}
// 向右
function rightMove(){
    if(flag){
        flag = false;
        if($('.main').position().left == 0){
            $('#main').css('left','-2600px')
        }
        index ++ 
        if(index > 4 ){
            index = 0
        }
        color();
        $('.main').animate({
            'left': '+=520'
        },function(){
            flag = true
        })
    }
}
// 小圆点样式
function color(){
    $('.color').removeClass('color')
    $($('li')[index]).addClass('color')
}
// 
// 索引切换
$('li').on('click',function(){
    // $(this).stop(false,true)
    index = $(this).index();
    color();
    console.log(index)
    $('.main').animate({
        // 因为一开始位置在-520上面 所以这里要减去520像素
        'left': index * (-520) - 520
    })
})


// 自动
var timer;
move();
$('.box').on('mouseleave',move)
$('.box').on("mouseenter",function(){
    clearInterval(timer)
})
function move(){
    timer = setInterval(rightMove,2000);
}