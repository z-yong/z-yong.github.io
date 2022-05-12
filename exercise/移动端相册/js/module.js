function Modu($img,$li,$list,$icon){
    this.$img = $img;
    this.$li = $li;
    this.$list = $list;
    this.$icon = $icon;
    this.len = $li.length;
    this.index = 0; //记录left移动倍数
    this.viewWidth = $(window).width();
    this.viewHeight = $(window).height();
    this.ratio = this.viewHeight/this.viewWidth;
    this.initWidth = (this.viewWidth - 16 ) / 4;
    this.init();
}

Modu.prototype.init = function(){
    this.$list.css({
        width: '100%',
        left: 0
    })
    this.$li.css({
        width: this.initWidth,
        height: this.initWidth
    });
    this.$img.css({
        width: '100%',
        height: '100%'
    })
}

// 点击图片放大
Modu.prototype.showPhoto = function(){
    this.$icon.show();
    this.$list.css({
        position: 'absolute',
        width: this.len * this.viewWidth,
    })
    this.$li.css({
        width: this.viewWidth,
        height: this.viewHeight
    })
    this.cent();
}
// 点击图片定位其left值
Modu.prototype.change = function (index){
    this.$list.css({
        left: -index * mod.viewWidth
    })
}
// 滑动
Modu.prototype.slide = function(index){
    this.$list.animate({
        left: -index * mod.viewWidth
    })
}
// 判断如何居中
Modu.prototype.cent = function(){
    // 判断当前图片高宽比
    // 如果比设备的高宽比大的话 就让此图片垂直居中 否则水平居中
    var ratio2 = 0;
    var _this = this;
    this.$img.each(function(index,ele){
        ratio2 = $(ele).height()/$(ele).width();
        if(ratio2 > _this.ratio){
            $(this).css({
                width: 'auto',
                height: '100%'
            })
            console.log(ratio2)
        }else {
            $(this).css({
                width: '100%',
                height: 'auto'
            })
        }
    })
    
    
}