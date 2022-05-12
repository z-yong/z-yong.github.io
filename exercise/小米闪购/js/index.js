var backUl=document.getElementById("back-ul");
var backLi=backUl.getElementsByTagName("li");

var comm=document.getElementById("commodity-ul");
var commodity=comm.getElementsByTagName("ul");

for(var i=0;i<backLi.length;i++){
    backLi[i].onclick = red;
}

function red(){
    for(var i=0;i<backLi.length;i++){
        if(backLi[i]==this){
            backLi[i].className="time1";
            commodity[i].className="show";
        }else{
            backLi[i].className="";
            commodity[i].className="";
        }
    }
}

var backDiv=document.getElementById("back-div");

window.addEventListener("scroll",fixed);

// window.onscroll=fixed;
function fixed(){
    var x=document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset;//获取滚动条距离顶部的值
    if(x>=264){
        backDiv.className="hint hint2"
    }else{
        backDiv.className="hint";
    }
}

var aa = document.getElementsByClassName("aa")[0],
    pp = document.getElementsByClassName("pro")[0],
    ceshi = document.getElementsByClassName("ceshi")[0];

    // 鼠标离开或者移入用这两个比较稳定
aa.addEventListener("mouseenter",show);
ceshi.addEventListener("mouseleave",hide);

function show(){
    pp.id = "pp";
}
function hide(){
    pp.id = "";
}


// 倒计时
var tt = document.getElementById("time");
var sp = document.getElementsByClassName("sp")[0];
var timer = setInterval(showTime,1);
function showTime(){
    var time =new Date("2019/10/24 23:00:00");
    var leaveTime = time - new Date();
    var hours =  Math.floor(leaveTime/(1000*60*60)%24);
    var minutes = Math.floor(leaveTime/(1000*60)%60);
    var seconds = Math.floor(leaveTime/1000%60);
    var q = Math.floor(leaveTime%1000);
    if(hours<10){
        hours = "0"+ hours;
    }
    if(minutes<10){
        minutes = "0"+ minutes;
    }
    if(seconds<10){
        seconds = "0"+ seconds;
    }
    // var t = new Date();
    // var q = t.getMilliseconds();
    if(q<10){
        q = "00" + q;
    }else if(q<100){
        q = "0" + q;
    }
    if(hours==0&&minutes==0&&seconds==0){
        clearInterval(timer);
        sp.innerHTML = "活动已经开始："
    }
    tt.innerHTML = "距开始"+hours+":"+minutes+":"+seconds+"："+q;
    
}


// 倒计时也可以这样写：
var total = 36000; //第一个tab的秒数
var time = total;
// formatTime(); //初始化时间
// 1s执行一次
// var timer = setInterval(function(){
//     time--;
//     formatTime();
//     if(time == 0){
//         clearInterval(timer); //清除计时器
//         time = 0;
//         formatTime();
//     }
// },1000);
// 计算倒计时
function formatTime(){
    var hour = Math.floor(time / 3600); //向下取整，取小时
    var min = Math.floor((time - hour * 3600) / 60) //向下取整，取分钟
    var sec = time - hour * 3600 - min * 60;
    if(hour < 10){
        hour = "0" + hour;
    }
    if(min < 10){ //分钟的个位数
        min = "0" + min;
    }
    if(sec < 10){ //秒钟的个位数
        sec = "0" + sec;
    }
    tt.innerText = "距开始" + hour + ":" + min + ":" + sec;
}