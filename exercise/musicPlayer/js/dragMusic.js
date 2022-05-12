function DragMusic(){
    this.getM = new GetMusic();
    this.lyr = new Lyr();
    this.start = new Start();
    this.radioBox = $(".radioBox");
    this.radioWidth = $('.radioBox>span').width();
    this.lenPro = $('.bg').width();
    this.active = $('.active');
    this.proAudio = $(".proAudio")
    this.init();
    this.start.init();
}

DragMusic.prototype.init = function(){
    // this.radioBox.mousedown(this.proChange.bind(this));
    this.radioBox[0].addEventListener('mousedown',this.proChange.bind(this),false);
    this.proAudio[0].addEventListener('click',this.clickPro.bind(this),false);
}
// 鼠标按下
DragMusic.prototype.proChange = function(){

    // document.addEventListener('mousemove',this.move.bind(this),false);
    // document.addEventListener('mouseup',this.rem.bind(this),false);
    document.onmousemove = this.move.bind(this);
    document.onmouseup = this.rem.bind(this)
}
// 移动音乐条
DragMusic.prototype.move = function(e){
    this.getM.audio.pause();
    clearInterval(this.start.timer);
    clearInterval(this.start.timerLyr);
// 这里需要加上4 因为小圆点本身有8px 如果要保证鼠标在圆点中心 就要再加上4像素
    var len = e.clientX - $('.proAudio').offset().left + this.radioWidth/2;
    if(len <= this.radioWidth){
        len = this.radioWidth;
    }
    if(len >= this.lenPro){
        len = this.lenPro;
    }
    this.active.width(len)
    // 这里进度条的长度需要减去8
    // 当前时间 = 总时长*进度条长度/总长度
    $('audio')[0].currentTime = $('audio')[0].duration * (len-this.radioWidth) / (this.lenPro-this.radioWidth);
    this.start.startTime.text(change(this.getM.audio.currentTime));
    // console.log($('audio')[0].currentTime)

}
DragMusic.prototype.rem = function(e){
    // document.removeEventListener('mousemove',this.move.bind(this),false);
    // // 这里也需要将鼠标抬起的事件删除 否则会一直执行audioPlay方法 音乐就不会停止
    // document.removeEventListener('mouseup',this.rem.bind(this),false);
    document.onmousemove = null;
    document.onmouseup = null;
    // this.radioBox[0].removeEventListener('mousedown',this.proChange.bind(this),false)
    this.lyr.getTop(this.start.timerLyr);
    this.start.audioPlay();
}
// 点击音量条
DragMusic.prototype.clickPro = function(e){
    clearInterval(this.start.timer);
    clearInterval(this.start.timerLyr);
    var proLen = e.clientX - this.proAudio.offset().left + this.radioWidth/2;
    this.active.width(proLen)
    $('audio')[0].currentTime = this.start.allTime * (proLen-this.radioWidth) / (this.lenPro-this.radioWidth);
    this.start.startTime.text(change(this.getM.audio.currentTime));
    // lyrColor.style.clip = 'rect(0,0px,40px,0)';
    // clearInterval(timerLyr)
    this.lyr.getTop(); 
    this.start.audioPlay();
}
