function DragVolume(){
    this.flag = true;
    this.flag2 = true;
    this.audio = $('audio')[0];
    this.volume = $('.volume');
    this.mute = $('.mute');
    this.volumePro = $('.volumePro');
    this.albumBox = $('.albumBox');
    this.volActive = $('.volActive');
    this.tubiao = $('.tubiao');
    this.activeVol = $('.activeVol');
    this.volActive = $(".volActive");
    this.volRadioBox = $('.volRadioBox');
    this.pct = $('.pct')
    this.init();

}

DragVolume.prototype.init = function(){
    this.volume[0].addEventListener('mouseenter',this.show.bind(this),false);
    this.volumePro[0].addEventListener('mouseleave',this.hidd.bind(this),false);
    this.volActive.click(this.clickVol.bind(this));
    this.volume.click(this.muted.bind(this));
    this.volRadioBox.mousedown(this.volDown.bind(this));
}
// 控制音量
DragVolume.prototype.volDown = function(){
    // document.addEventListener('mousemove',this.moveVol.bind(this),false);
    // document.addEventListener('mouseup',this.remo.bind(this),false)
    document.onmousemove = this.moveVol.bind(this);
    document.onmouseup =  this.remo.bind(this);
}
DragVolume.prototype.show = function(){
    // document.addEventListener('click',this.hidd.bind(this),false);
    this.mute.css('color','#ff6700');
    this.mute.css('font-weight','500'); 
    this.volumePro.fadeIn().css('display','flex');
}
DragVolume.prototype.hidd = function(){
    if(this.flag){
        this.volumePro.fadeOut();
        if(this.albumBox.position().top != 0){
            this.mute.css('color','#000');
        }else{
            this.mute.css('color','#fff');
        }
        this.mute.css('font-weight','normal');
    }
    this.flag = true;
}
// 移动音量条
DragVolume.prototype.moveVol = function(e){
    this.pct.css('opacity',1);
    var h = 110 - (e.clientY - this.volActive[0].getBoundingClientRect().top);
    if(h <= 10){
        h = 10;
        this.mute.html('&#xe622;');
        this.tubiao.html('&#xe622;');
        this.audio.muted = 'muted';
    }else{
        this.mute.html('&#xe630;');
        this.tubiao.html('&#xe630;');
        this.audio.muted = false;
    }
    if(h >= 110){
        h = 110;
    }
    this.activeVol.height (h);
    this.audio.volume = (h-10) / 100;
    this.pct.html(parseInt(100 * this.audio.volume));
    this.pct.css({
        right: -40,
        width: 25
    })
    if(this.pct.text() == 100){
        this.pct.text('100(已是最大)');
        this.pct.css({
            right: -100,
            width: 90
        })
    }
}
DragVolume.prototype.remo = function(){
    // document.removeEventListener('mousemove',this.moveVol.bind(this),false);
    // document.removeEventListener('mouseup',this.remo.bind(this),false);
    document.onmousemove = null;
    document.onmouseup = null;
    // 淡出
    this.pct.css({
        'opacity': 0,
        'transition': 'opacity 1s linear'
    })
}
// 静音与否、
DragVolume.prototype.muted = function(){
    if(this.flag2){
        this.mute.html('&#xe622;');
        this.audio.muted = 'muted';
    }else{
        this.mute.html('&#xe630;');
        this.audio.muted = false;
    }
    this.flag2 = !this.flag2;
}
// 点击音量条
DragVolume.prototype.clickVol = function(e){
    var h = 110 - (e.clientY - this.volActive[0].getBoundingClientRect().top);
    if(h <= 10){
        h = 10;
        this.mute.html('&#xe622;');
        this.tubiao.html('&#xe622;');
        this.audio.muted = 'muted';
    }else{
        this.mute.html('&#xe630;');
        this.tubiao.html('&#xe630;');
        this.audio.muted = false;
    }
    console.log(h)
    if(h >= 110){
        h = 110;
    }
    
    this.activeVol.height(h)
    this.audio.volume = (h-10) / 100;
}