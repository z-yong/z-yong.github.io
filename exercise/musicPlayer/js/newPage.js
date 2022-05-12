function NewPage() {
  this.dragMusic = new DragMusic(); //这里启动了play.init函数和DragMusic.init函数
  this.getM = new GetMusic();
  this.wrapper = $(".wrapper");
  this.songName = $(".songNameBox");
  this.vloumePro = $(".volumePro");
  this.mute = $('.mute');
  this.album = $(".album");
  this.albumBox = $(".albumBox");
  this.audioBox = $(".audioBox");
  this.index = store.index;
  this.souce = souce;
  this.btnShow = $('#btnShow');
  this.btnHide = $("#btnHide");
  this.init();
}
NewPage.prototype.init = function () {
  // this.btnShow.on('click',this.show.bind(this));
  // this.btnHide.on('click',this.hide.bind(this));
  this.btnShow.click(this.show.bind(this));
  this.btnHide.click(this.hide.bind(this))
}
//展开第二页
NewPage.prototype.show = function () {
  // this.wrapper.css('display','none');
  // this.creat(); //生成小星星 创建dom方式
  // canvas画图方式
  this.starrySky = new StarrySky()
  this.stor = this.wrapper.detach();

  this.songName.fadeOut().fadeIn();
  // 此步骤防止用户在第一页面音量进度条显示时就直接进入第二页面
  this.vloumePro.fadeOut();
  $('body').css('background', '#000');
  this.mute.css('color', '#fff');
  //  this.mute[0].style.color = '#fff'
  this.albumBox.animate({
    top: 0
  }, 600).append(this.audioBox);
  this.album.css({
    'background-image': "url(" + this.souce[store.index].songBg + ')'
  });
  // 对进度条长度重新赋值
  this.dragMusic.lenPro = $('.bg').width();
  this.dragMusic.radioWidth = $('.radioBox>span').width();
}
// 关闭第二页
NewPage.prototype.hide = function () {
  // 停止生成dom 并删除(创建dom方式)
  // $('.snow').remove();
  // canvas画图方式
  this.starrySky.closeStarrySky()
  arrTimer.forEach(function (ele, index) {
    clearInterval(ele)
  })

  // this.wrapper.css("display",'block');
  // 重新添加
  this.stor.insertAfter($(".songNameBox"));
  // 全局的点击事件会影响某个元素的点击事件 所以这里将它remove掉
  // document.removeEventListener('click',hidd,false);
  this.mute.css('color', '#fff');
  this.mute[0].style.color = '#000'
  this.albumBox.animate({
    top: 1005
  }, 500);
  var str = this.audioBox.detach();
  this.stor.append(str);
  $('body').css({
    backgroundImage: 'url(' + this.souce[store.index].songBg + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  });
  this.dragMusic.lenPro = $('.bg').width();
  this.dragMusic.radioWidth = $('.radioBox>span').width();
}

// 生成小星星
NewPage.prototype.creat = function () {
  for (var i = 0; i < 100; i++) {
    new Snow();
  }
}

// 小星星构造函数
function Snow() {
  var o = 0.7 + Math.random() * 3;
  var r = Math.random() * 256;
  var g = Math.random() * 256;
  var b = Math.random() * 256;
  var size = 3 + Math.floor(Math.random() * 3);
  // this.left = Math.random()*$(window).width();
  // this.top = Math.random()*$(window).height();
  this.s = document.createElement('div');
  $(this.s).css({
    position: 'absolute',
    width: size,
    height: size,
    // left: this.left,
    // top: this.top,
    opacity: o,
    'border-radius': '50%',
    'z-index': 100,
    background: 'rgb(' + r + ',' + g + ',' + b + ')'
  }).addClass('snow')
  document.body.append(this.s)
  this.x = 0;
  this.speedX = 2;
  this.startX = Math.floor(Math.random() * (document.documentElement.clientWidth - 20));
  this.y = Math.floor(Math.random() * document.documentElement.clientHeight);
  this.speedY = 1;
  this.leftRan = Math.floor(Math.random() * 10) + 10;
  this.time = 10 + Math.floor(Math.random() * 30);
  this.fall();
}

var arrTimer = []; //创建一个数组 用来装生成小星星的计时器标识 以便清除计时器
var i = 0;
// 小星星下落
Snow.prototype.fall = function () {
  arrTimer[i++] = setInterval(function () {
    this.x = this.speedX + this.x;
    this.y = this.speedY + this.y;
    if (this.x > this.leftRan) this.speedX = -1;
    if (this.x < -this.leftRan) this.speedX = 1;
    if (this.y > document.documentElement.clientHeight - 20) {
      this.y = 0;
    }
    this.s.style.left = this.x + this.startX + 'px';
    this.s.style.top = this.y + 'px';
  }.bind(this), this.time)
}