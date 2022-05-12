// 多行打点 利用文本长度
const span = document.getElementsByClassName("text");
getDot();
function getDot(){
    for(let i = 0; i < span.length; i++){
        dot(span[i],45)
    }
}
function dot(elem,num){
   const text = elem.innerHTML;
   const len = text.length;
   if(len > num){
       elem.innerHTML = text.slice(0,num) + "..."
   }
}

// 导航菜单
const menu = document.getElementsByClassName('subMenu')[0];
const list = document.getElementsByClassName('menu')[0];
let flag = false;
menu.addEventListener("click",function(){
    flag = !flag;
    showMenu(flag)
})
function showMenu(or){
    if(or){
        list.style.display = 'block'
    }else{
        list.style.display = 'none'
    }
}

// 咖啡展示
const active = document.getElementsByClassName("cof-list");
const oLi = document.getElementsByClassName("list-li");

clickShow();

function clickShow(){
    for(let i = 0; i < oLi.length; i++){
       oLi[i].addEventListener('click',function(){
           show(this,i)
       })
    }
}
function show(dom,index){
    const span = dom.getElementsByTagName('span')[0];
    for(let i = 0; i < oLi.length; i++){
        const s = oLi[i].getElementsByTagName('span')[0];
        s.classList.remove('active');
        active[i].classList.remove("active-coffee")
    }
    span.classList.add('active');
    active[index].classList.add('active-coffee');
}

// 动画添加 （跟随当前滚动条位置）
const right = document.getElementsByClassName("toRight");
const toMove = document.getElementsByClassName('move');

getAnima([
    {
        dom: right,
        move: 'toRightAnima'
    },
    {
        dom: toMove,
        move: 'toMoveAnima'
    }
])

window.addEventListener('scroll',function(){
    getAnima([
        {
            dom: right,
            move: 'toRightAnima'
        },
        {
            dom: toMove,
            move: 'toMoveAnima'
        }
    ])
})
function getAnima(list){
    const winHeight = window.screen.height;
    let domTop;
    list.forEach(function(ele,index){
        const len = ele.dom.length;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(len){
            for(let i = 0; i < len; i++ ){
                domTop = ele.dom[i].offsetTop
                if((winHeight + scrollTop) > domTop + 100){
                    ele.dom[i].classList.add(ele.move);
                    
                }
            }
        }else{ //如果不是数组的话 
            domTop = ele.dom.getBoundingClientRect().top;
            if((winHeight + scrollTop) >= domTop){
                ele.dom.classList.add(ele.move);
            }
        }
    })
}