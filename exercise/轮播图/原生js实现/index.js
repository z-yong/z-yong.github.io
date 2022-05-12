
var oLeft = document.getElementById("left"),
    oRight = document.getElementById("right"),
    oMain = document.getElementById("main"),
    oLi = document.getElementsByTagName("li"),
    oBox = document.getElementById("box");
    var timer, timer2;
    var lock = true;//定义一把锁
function move(dis){
    var time = 400;
    var eachtime = 20;
    var eachdis = dis/(time/eachtime);
    var newLeft = oMain.offsetLeft + dis;
    // console.log(newLeft);
    function change(){
        lock = false;//当此函数被执行时 让其为假
        if(dis>0 && oMain.offsetLeft<newLeft || dis<0 && oMain.offsetLeft>newLeft){
            oMain.style.left = oMain.offsetLeft + eachdis +"px";
        }else {
            clearInterval(timer);
            lock = true;//当计时器被停止时 让其为真
            if(newLeft==(-3120)){
                newLeft = -520;
            }
            if(newLeft==0){
                newLeft = -2600;
            }
            oMain.style.left = newLeft +"px";
        }
        
    }
    //当其为真时 执行次函数（避免用户点击频率过高时出现bug
    if(lock==true){
        timer = setInterval(change,eachtime);
    }
}
oLeft.onclick = function (){
    move(520);
    if(index>0){
        index--;
    }else{
        index = 4;
    }
    alter();
}
oRight.onclick = function (){
    move(-520);
    if(index<4){
        index++;
    }else{
        index=0;
    }
    alter();
}

var index = 0;
function alter(){
    // 将小圆点所在的样式不显示
    document.getElementsByClassName("color")[0].className = "";
    oLi[index].className = "color";
}
for(var i = 0;i<oLi.length;i++){
    // 此处需要用立即执行函数 否则i值会一直为5
    // 此处用到了闭包，只要被点击一次 i的值就会累加（因为是同一个AO）
    (function (j){
        oLi[j].onclick = function (){
            var changes = (j-index) * -520;
            console.log(j)
            index = j;
            alter();
            move(changes);
        }
    }(i));
}

function carry(){
    timer2 = setInterval(oRight.onclick,3000);
}
function stop(){
    clearInterval(timer2);
}


oBox.addEventListener("mouseout",carry);
oBox.addEventListener("mouseover",stop);
carry();

