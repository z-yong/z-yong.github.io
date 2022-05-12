const wrapper = document.getElementsByClassName('wrapper')[0];

// 1:wall
// 2:coin
// 3:bg
// 4:pacman
// 5:ghost
const photo = [
    [1,1,1,1,1,5,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,1,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,2,1,1,1,2,1],
    [1,2,1,2,2,2,4,2,2,2,1,2,1],
    [1,2,2,2,1,1,3,1,1,2,2,2,1],
    [1,2,1,2,2,2,2,2,2,2,1,2,1],
    [1,2,1,1,1,2,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,1,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,6,1,1,1,1,1,1]
];
// 定义pacman的坐标
const pac = {
    x: 3,
    y: 6
}

// 存储鬼的top值
const ghostTop = {
    speed: 1
}
function createDom(){
    let html = '';
    photo.forEach(function(eles,index){
        eles.forEach(function(ele,j){
            switch(ele){
                case 1:
                    html += '<div class="wall"></div>';
                    break;
                case 2:
                    html += '<div class="coin"></div>';
                    break;
                case 3:
                    html += '<div class="bg"></div>';
                    break;
                case 4:
                    html += '<div class="pacman"></div>';
                    break;
                case 5:
                    html += '<div class="ghost1"></div>';
                    break;
                case 6:
                    html += '<div class="ghost2"></div>';
                    break;
            }
        })
        html += '<br>'
    })
    wrapper.style.width = photo[1].length * 50 + 'px'
    wrapper.innerHTML = html;
    const ghost1 = document.getElementsByClassName('ghost1')[0];
    const ghost2 = document.getElementsByClassName("ghost2")[0];
    ghost1.style.top = ghostTop.top1 + 'px';
    ghost2.style.top = ghostTop.top2 +'px';
    if(ghostTop.timer){
        clearInterval(ghostTop.timer);
        init();
    }
}
createDom();
document.addEventListener('keydown',function(e){  
    const pacman = document.getElementsByClassName('pacman')[0]; 
    // 如果按右键并且右边不是wall的话
    if(e.code === 'ArrowRight'){
        if(photo[pac.x][pac.y+1] !== 1){
            move('right');
        }
        // 每次重新渲染 所以每一次都要重新获取dom
        const pacman = document.getElementsByClassName('pacman')[0];
        pacman.style.transform = 'rotate(0deg)';
    }else if(e.code == 'ArrowDown'){
        if(photo[pac.x+1][pac.y] !== 1){
            move('down');
        }
        const pacman = document.getElementsByClassName('pacman')[0];
        pacman.style.transform = 'rotate(90deg)';
    }else if(e.code == 'ArrowLeft'){
        if(photo[pac.x][pac.y-1] !== 1){
            move('left');
        }
        const pacman = document.getElementsByClassName('pacman')[0];
        pacman.style.transform = 'rotate(180deg)';
    }else if(e.code == 'ArrowUp'){
        if(photo[pac.x-1][pac.y] !== 1){
            move('up');
        }
        const pacman = document.getElementsByClassName('pacman')[0];
        pacman.style.transform = 'rotate(270deg)';
    }
})
function move(direction){
    photo[pac.x][pac.y] = 3;
    if(direction === 'right'){
        pac.y ++;
    }else if(direction == 'down'){
        pac.x ++
    }else if(direction == 'left'){
        pac.y --
    }else if(direction == 'up'){
        pac.x --
    }
    photo[pac.x][pac.y] = 4;
    createDom();
}

function ghostMove(ghost1,ghost2){
    ghostTop.top1 += ghostTop.speed;
    ghostTop.top2 -= ghostTop.speed;
    if(ghostTop.top1 >= (photo.length-1) * 50){
        ghostTop.top1 = (photo.length-1) * 50;
        ghostTop.speed = -1
    }else  if(ghostTop.top1 <= 0){
        ghostTop.top1 = 0;
        ghostTop.speed = 1
    }
    if(ghostTop.top2 <= 0){
        ghostTop.top2 = 0;
        ghostTop.speed = -1
    }else if(ghostTop.top2 >= (photo.length-1) * 50){
        ghostTop.top2 = (photo.length-1) * 50;
        ghostTop.speed = 1
    }
    ghost1.style.top = ghostTop.top1 + 'px';
    ghost2.style.top = ghostTop.top2 + 'px';
}
window.addEventListener('load',init)
function init(){
    const ghost1 = document.getElementsByClassName('ghost1')[0];
    const ghost2 = document.getElementsByClassName("ghost2")[0];
    ghostTop.top1 = ghost1.offsetTop,
    ghostTop.top2 = ghost2.offsetTop,
    ghostTop.timer = setInterval(function(){
        ghostMove(ghost1,ghost2);
        console.log(11)
    },10)
}