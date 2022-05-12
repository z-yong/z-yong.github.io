var start = document.getElementsByClassName("start")[0],
  up = document.getElementsByClassName("up")[0],
  down = document.getElementsByClassName('down')[0],
  startTime = document.getElementsByClassName("startTime")[0],
  endTime = document.getElementsByClassName("endTime")[0],
  volume = document.getElementsByClassName("volume")[0],
  active = document.getElementsByClassName("active")[0],
  radioBox = active.getElementsByClassName("radioBox")[0],
  audio = document.getElementsByTagName("audio")[0],
  proAudio = document.getElementsByClassName("proAudio")[0],
  imgBox = document.getElementsByClassName("imgBox")[0],
  volRadioBox = document.getElementsByClassName('volRadioBox')[0],
  activeVol = document.getElementsByClassName("activeVol")[0],
  volActive = document.getElementsByClassName('volActive')[0],
  pct = document.getElementsByClassName("pct")[0],
  volumePro = document.getElementsByClassName('volumePro')[0],
  songName = document.getElementsByClassName('songName')[0],
  img = document.getElementsByClassName('img')[0],
  rand = document.getElementById('rand'),
  mute = document.getElementsByClassName('mute')[0],
  tubiao = document.getElementsByClassName('tubiao')[0],
  w = document.getElementsByClassName('wrapper')[0],
  bg = document.getElementsByClassName("bg")[0],
  songList = document.getElementsByClassName('name'),
  svg = document.getElementsByClassName("svg"),
  album = document.getElementsByClassName('album')[0],
  lyrColor = document.getElementsByClassName("colorLyr")[0];

var timer, timerLyr;

// 进度条总长度
var lengthPro = $('.bg').width();
// 小圆点宽度
var radioWidth = $('.radioBox>span').width();
//  将歌名放在数组中
var index = 0;
var songNameArr = ['薛之谦 - 遗憾 (Live).mp3', '单小源 - 哈喽拜拜.mp3', '许嵩 - 单人旅途.mp3',
  '许嵩 - 幻听.mp3', '许嵩 - 庐州月.mp3', '黑子沛 - 老同学.mp3', '薛之谦 - 下雨了.mp3'
]
// 将歌名相对应的图片放在数组中
var indexImg = 0;
var imgArr = ["./img/laoxue.png", "./img/dan.jpg", "./img/xu1.jpg", "./img/xu2.jpg", "./img/xu3.jpg", "./img/hei.jpg", "./img/xue.jpg", ]
// 将背景相对应的图片放在数组中
var indexBg = 0;
var bgArr = ['./img/1.jpg', './img/4.jpg', './img/2.jpg', './img/3.jpg', './img/5.jpg', './img/6.jpg', './img/7.jpg', ]

// 当前歌词总条数
var lenLyr = Object.getOwnPropertyNames(lyr[index]).length;

start.addEventListener('mouseup', state);
// animation: rot 5s linear infinite;
// 音乐播放状态
function state() {
  if (audio.paused) {
    audioPlay();
  } else {
    audioPasue();
  }
}

// 音乐播放
function audioPlay() {
  getTop();
  getLyr(index);
  audio.play();
  // 这里要用HTML
  start.innerHTML = '&#xe631;'
  // imgBox.style.transition = "transform 5s linear"
  imgBox.style.animation = 'rot 7s linear infinite';
  timer = setInterval(timeChange, 800);
  timerLyr = setInterval(lyrChange, 1100)
  changeSongName(index);
  danceSongName(svg[index]);
}

// 音乐暂停
function audioPasue() {
  audio.pause();
  start.innerHTML = '&#xe666';
  // 这里不能写none 否则角度值会归零
  imgBox.style.animationPlayState = 'paused';
  clearInterval(timer)
  clearInterval(timerLyr)
  svg[index].innerHTML = '';
}

// 当前时间 当前进度条
// 进度条随着音乐播放增长
// 根据音乐当前时间：总时长 = 进度条长度 ： 总长度
// 进度条长度 = 当前时间*总长度/总时长
function timeChange() {
  // 当一首歌播放结束
  if (audio.ended) {
    if (ff) {
      index++;
      indexImg++;
      indexBg++;
      // 循环播放
      if (index == songNameArr.length) {
        index = 0;
        indexImg = 0;
        indexBg = 0;
      }
    } else {
      var num = numRan();
      index = num;
      indexImg = num;
      indexBg = num;
    }
    // 这两句不需要写也可以 因为当音乐播放时 当前时间自动为零 
    // 那么当前进度条长度自然也会是零
    // audio.currentTime = 0;
    // active.style.width = 8 + 'px';

    getSong();
  }
  startTime.innerHTML = change(audio.currentTime);
  // 因为小圆点有8px 所以这里要加上8
  var w = audio.currentTime * (lengthPro - radioWidth) / allTime + radioWidth;
  active.style.width = w + 'px';
}

//  获取歌名
function getSongName(str) {
  // var indexO = str.lastIndexOf('/');
  // var indexT = str.indexOf('.');
  // return str.slice(indexO+1,indexT);
  var reg = /.*\/(.*)\..*/;
  return str.match(reg)[1];
}

// 上一首 下一首
up.addEventListener('click', upSong, false);
down.addEventListener('click', downSong, false);

function upSong() {
  console.log(index);
  if (ff) {
    if (index) {
      index--;
      indexImg--;
      indexBg--;
    } else {
      index = songNameArr.length - 1;
      indexImg = imgArr.length - 1;
      indexBg = bgArr.length - 1;
    }
  } else {
    var num = numRan();
    index = num;
    indexImg = num;
    indexBg = num;
  }
  getSong();
}

function downSong() {
  if (ff) {
    if (index < (songNameArr.length - 1)) {
      index++;
      indexImg++;
      indexBg++;
    } else {
      index = 0;
      indexImg = 0;
      indexBg = 0;
    }
  } else {
    var num = numRan();
    index = num;
    indexImg = num;
    indexBg = num;
  }
  console.log(index);
  getSong();
}

// 匹配相对应的歌曲地址 图片以及歌名
function getSong() {
  //歌词长度
  lenLyr = Object.getOwnPropertyNames(lyr[index]).length;
  audio.src = './souce/' + songNameArr[index];
  img.src = imgArr[indexImg];
  var str = decodeURI(audio.src)
  songName.innerHTML = getSongName(str);
  if ($('.albumBox').position().top != 0) {
    document.body.style.transition = 'background 3s linear';
    document.body.style.backgroundImage = "url(" + bgArr[indexBg] + ")";
  }
  album.style.backgroundImage = "url(" + bgArr[indexBg] + ")";
  album.style.transition = 'background 3s linear';
  if (!audio.paused) {
    clearInterval(timer);
    clearInterval(timerLyr);
  }
  // 这里需要重新添加imgBox元素 keyframes才会重新动画
  $('.imgBox').insertBefore($('.lyrOne'))

  //    getAllTime(); 

  // getLyr(index);
  audioPlay();
}

//  总时长  
var allTime;
// 当浏览器能够开始播放媒体数据时.....
// audio.oncanplay  audio.ondurationchange(线上请求使用)
function getAllTime() {
  audio.oncanplay = function () {
    allTime = audio.duration;
    endTime.innerHTML = change(allTime);
    // 初始化音量
    audio.volume = 0.4;
  }
}
getAllTime();
// endTime.innerHTML = change(allTime);


// 把以秒为单位的时间转化成人能看懂的
function change(time) {
  var sec = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60) : parseInt(time % 60)
  var min = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
  return min + ':' + sec;
}

// 拖动小圆点
radioBox.addEventListener("mousedown", proChange, false);

function proChange() {
  document.addEventListener('mousemove', move, false)
  document.addEventListener('mouseup', rem, false);
}

function move(e) {
  // 这里需要让音乐暂停 防止用户拖动鼠标过快 产生嘈杂的声音
  audio.pause();
  // 这里需要清空计时器 防止移动时时间还在走
  clearInterval(timer);
  clearInterval(timerLyr);
  // console.log(e.clientX);
  // console.log(e.offsetX) 
  // var len = e.offsetX - 15; 冰姐可以告诉为什么使用这个方法不可以吗
  // var len = e.clientX - getElementPosition(proAudio).x;
  // 这里需要加上4 因为小圆点本身有8px 如果要保证鼠标在圆点中心 就要再加上4像素
  var len = e.clientX - (proAudio.getBoundingClientRect().left) + radioWidth / 2;
  if (len <= radioWidth) {
    len = radioWidth;
  }
  if (len >= lengthPro) {
    len = lengthPro;
  }
  active.style.width = len + 'px';
  // 这里进度条的长度需要减去8
  // 当前时间 = 总时长*进度条长度/总长度
  audio.currentTime = allTime * (len - radioWidth) / (lengthPro - radioWidth);
  startTime.innerHTML = change(audio.currentTime);
}

function rem() {
  document.removeEventListener('mousemove', move, false);
  // 这里也需要将鼠标抬起的事件删除 否则会一直执行audioPlay方法 音乐就不会停止
  document.removeEventListener('mouseup', rem, false);
  getTop();
  audioPlay();
}

// 点击音量显示
var flag = true
volume.addEventListener('mouseenter', show, false);
document.addEventListener('click', hidd, false);
// volBox.addEventListener('mouseleave',hidd,false)

function hidd() {
  if (flag) { //这里需要判断一下 当点击事件不是发生在音量条中时才需要将音量条隐藏
    // volumePro.className = 'volumePro';
    $('.volumePro').fadeOut();
    // 这里需要判断一下 如果进入歌词页面 颜色为白色
    if ($('.albumBox').position().top == 0) {
      mute.style.color = '#fff';
    } else {
      mute.style.color = '#000';
    }
    mute.style.fontWeight = 'normal';
  }
  flag = true;
}

function show() {
  // 之前有可能此全局事件被删除 所以这里添加上
  document.addEventListener('click', hidd, false);
  mute.style.color = '#ff6700';
  mute.style.fontWeight = 500;
  // volumePro.classList.add('show');
  $('.volumePro').fadeIn().css('display', 'flex');
}
// 当用户调音量的时候 将锁锁住 
volumePro.onclick = function () {
  flag = false;
}
// 静音与否
volume.addEventListener('click', muted, false);
var flag2 = true;

function muted() {
  if (flag2) {
    mute.innerHTML = '&#xe622;';
    audio.muted = 'muted';
  } else {
    mute.innerHTML = '&#xe630;';
    audio.muted = false;
  }
  flag2 = !flag2;
}
// 控制音量
volRadioBox.addEventListener('mousedown', volDown, false);

function volDown() {
  document.addEventListener('mousemove', moveVol, false);
  document.addEventListener('mouseup', remo, false)
}

// 滑动音量条
// 音量是0-1   进度条: 总长度 = 当前音量 : 1
// 当前音量 = 进度条/总长
// 白色框是1-100 比例是 当前百分比 : 100 = 当前音量 : 1
function moveVol(e) {
  // 显示白色框
  pct.style.opacity = 1;
  // pct.style.transition = 'opacity 1s linear'
  var h = 110 - (e.clientY - volActive.getBoundingClientRect().top);
  if (h <= 10) {
    h = 10;
    mute.innerHTML = '&#xe622;';
    tubiao.innerHTML = '&#xe622;';
    audio.muted = 'muted';
  } else {
    mute.innerHTML = '&#xe630;';
    tubiao.innerHTML = '&#xe630;';
    audio.muted = false;
  }
  if (h >= 110) {
    h = 110;
  }
  activeVol.style.height = h + 'px';
  audio.volume = (h - 10) / 100;
  // pct.innerHTML = parseInt(100 * audio.volume);
  $('.pct').html(parseInt(100 * audio.volume))
  pct.style.right = -40 + 'px'
  pct.style.width = 25 + 'px'
  if (pct.innerHTML == 100) {
    pct.innerHTML = '100(已是最大)'
    pct.style.right = -100 + 'px'
    pct.style.width = 90 + 'px'
  }
}

function remo() {
  document.removeEventListener('mousemove', moveVol, false);
  // document.removeEventListener('mouseup',remo,false);
  // 淡出
  pct.style.opacity = 0;
  pct.style.transition = 'opacity 1s linear'
}

// 点击音量条
$('.volActive').click(function (e) {
  var h = 110 - (e.clientY - volActive.getBoundingClientRect().top);
  if (h <= 10) {
    h = 10;
    mute.innerHTML = '&#xe622;';
    tubiao.innerHTML = '&#xe622;';
    audio.muted = 'muted';
  } else {
    mute.innerHTML = '&#xe630;';
    tubiao.innerHTML = '&#xe630;';
    audio.muted = false;
  }
  if (h >= 110) {
    h = 110;
  }
  activeVol.style.height = h + 'px';
  audio.volume = (h - 10) / 100;
})
// 随机播放
rand.addEventListener('click', randStart, false);

var ff = true;

function randStart() {
  if (ff) {
    rand.innerHTML = '&#xe629';
  } else {
    rand.innerHTML = '&#xe62b;';
  }
  ff = !ff;
}


// 因为数组自带的删除方法都是改变原数组的 所以这里需要重新定义一个
Array.prototype.del = function (n) {
  if (n < 0) {
    return this;
  }
  return this.slice(0, n).concat(this.slice(n + 1, this.length));
}
// 生成一个前一个与后一个不会重复的随机数
var arr = [0, 1, 2, 3, 4, 5, 6]; //012345
var arr2 = [];

function numRan() {
  var num, temp, i;
  if (arr2.length) {
    num = Math.floor(Math.random() * arr2.length);
    temp = arr2[num];
  } else {
    num = Math.floor(Math.random() * arr.length);
    temp = arr[num];
  }
  i = arr.indexOf(temp);
  arr2 = arr.del(i);
  console.log(arr2);
  // console.log(temp);
  return temp;
}

// 点击进度条
proAudio.onclick = function (e) {
  var proLen = e.clientX - proAudio.getBoundingClientRect().left + radioWidth / 2;
  active.style.width = proLen + 'px';
  audio.currentTime = allTime * (proLen - radioWidth) / (lengthPro - radioWidth);
  startTime.innerHTML = change(audio.currentTime);

  // lyrColor.style.clip = 'rect(0,0px,40px,0)';
  // clearInterval(timerLyr)
  getTop();
  audioPlay();
}

// 歌单
getSongNameList();

function getSongNameList() {
  for (var i = 0; i < songList.length; i++) {
    songList[i].getElementsByTagName("span")[0].innerHTML = songNameArr[i];
  }
}

// 随着音乐改变歌单曲目
function changeSongName(index) {
  for (var i = 0; i < songList.length; i++) {
    songList[i].className = 'name'
  }
  songList[index].className = 'name color';
}
// 点击歌单曲目播放音乐
songNamePlay();

function songNamePlay() {
  for (var i = 0; i < songList.length; i++) {
    (function (i) {
      songList[i].onclick = function () {
        index = indexBg = indexImg = i;
        getSong();
      }
    }(i))

  }
}
var dance = document.getElementsByClassName("dance")[0]
// 小svg跳动
function danceSongName(dance) {
  for (var i = 0; i < svg.length; i++) {
    svg[i].innerHTML = '';
  }
  dance.innerHTML = `<svg class='one' xmlns='http://www.w3.org/2000/svg' version='1.1' width = '20' height = '20'>
                            <rect x = '0' y = '0' width = '3' height = '12'>
                                <animate attributeName = 'height' to = 3 begin = '0.2s' dur = '0.8s' repeatCount= "indefinite"></animate>
                            </rect>
                            <rect x = '5' y = '0' width = '3' height = '12'>
                                <animate attributeName = 'height' to = 3 begin = '0.6s' dur = '0.8s' repeatCount= "indefinite"></animate>
                            </rect>
                            <rect x = '10' y = '0' width = '3' height = '12'>
                                <animate attributeName = 'height' to = 3 begin = '0s' dur = '0.8s' repeatCount= "indefinite"></animate>
                            </rect>
                            <rect x = '15' y = '0' width = '3' height = '12'>
                                <animate attributeName = 'height' to = 3 begin = '0.4s' dur = '0.8s' repeatCount= "indefinite"></animate>
                            </rect>
                        </svg>`
}
// 兼容移动端 
var oMeta = document.createElement("meta");
oMeta.setAttribute('name', 'viewport');
if (window.devicePixelRatio == 1) {
  // 此时将浏览器宽度扩大一倍
  oMeta.setAttribute('content', 'width = device-width,minimum-scale = 1,maximum-scale = 1,initial-scale = 1');
}
if (window.devicePixelRatio >= 2) {
  // 此时将浏览器宽度扩大一倍
  oMeta.setAttribute('content', 'width = device-width,minimum-scale = 0.5,maximum-scale = 0.5,initial-scale = 0.5');
}
if (window.devicePixelRatio >= 3) {
  // 此时将浏览器宽度扩大两倍 也就是乘以3
  oMeta.setAttribute('content', 'width = device-width,minimum-scale = 0.333333333,maximum-scale = 0.3333333333,initial-scale = 0.3333333');
}
document.getElementsByTagName('head')[0].appendChild(oMeta);



// 下面是用jquery写的

var str = '<div class = "bigBg"></div>';
var crateSnow;

// 歌词页面显示
$('#btnShow').on('click', function () {
  // 生成雪花
  createSnow = setInterval(snow, 300)
  // 进入歌词页面时 将其none掉 减少性能消耗
  $('.wrapper').css('display', 'none')
  // 此步骤防止用户在第一页面音量进度条显示时就直接进入第二页面
  $('.volumePro').fadeOut();
  // 音量图标的颜色需要随着进入和离开而改变
  //  全局事件会影响某一个dom元素的事件函数 所以这里先删掉
  document.body.style.background = '#888';
  document.removeEventListener('click', hidd, false);
  $('.mute').css('color', '#fff')
  // document.body.style.transition = 'background 3s linear';
  $(".albumBox").animate({
    top: 0
  }, 600).append($('.audioBox'))
  $('.album').css({
    'background-image': 'url(' + bgArr[index] + ')'
  })
  // 对进度条总长度重新赋值
  lengthPro = $('.bg').width();
  radioWidth = $('.radioBox>span').width();
  // getLyr(index); 
})

// 歌词页面关闭
$('#btnHide').on('click', function () {
  // $('.active').width(0);
  // 停止生成dom
  clearInterval(createSnow);
  // $(".beautiful").remove();//删除可以不采用此方法 利用回调函数 等到自身动画结束自动删除效果更好
  //离开歌词页面时让其他页面让其显示
  $('.wrapper').css('display', 'block')
  // 让音量颜色变回黑色 
  // 全局的点击事件会影响某个元素的点击事件 所以这里将它remove掉
  document.removeEventListener('click', hidd, false);
  $('.mute').css('color', '#000')
  $('.albumBox').animate({
    top: '1005'
  }, 500);
  var str = $('.audioBox').detach();
  $(".wrapper").append(str);
  document.body.style.backgroundImage = 'url(' + bgArr[index] + ')';
  document.body.style.transition = 'background 3s linear';

  lengthPro = $('.bg').width();
  radioWidth = $('.radioBox>span').width();
})

// 获取歌词向上移动的距离
function getTop() {
  // lyrColor.style.clip = 'rect(0,0px,40px,0)';
  // topNum = parseInt(audio.currentTime * (lenLyr - 3) / allTime) + 1;
  // topNum = $('.active').width()*($(".lyr .lyrList div").height() - 120)/lengthPro;
  // topNum = audio.currentTime * ($(".lyr .lyrList div").height() - 120) / allTime ;
  // if(topNum % 40 != 0){
  //     topNum = topNum + (40 - (topNum % 40));
  // }
  // topNum2 = parseInt($(".active").width() * (lenLyr-3) / lengthPro) + 1;
  clearInterval(timerLyr)
  // 颜色字体先归零
  lyrColor.style.transition = 'none'

  // 歌词滚动top也归零
  $(".lyr .lyrList div").css({
    top: 0
  });
  var topNum = 0; //歌词滚动倍数
  var tt = 0; //记录上一句歌词时间
  for (var prop in lyr[index]) {
    topNum++
    // 当前播放时间在歌词的上一句对应的时间与这一句对应的时间之间时
    if (parseInt(audio.currentTime) <= prop && parseInt(audio.currentTime) >= tt) {
      $(".lyr .lyrList div").css({
        top: -(topNum - 4) * 40
      })
      $('.colorLyr').text(lyr[index][tt]);
      $(".lyrOne").text(lyr[index][tt]);
      console.log("我进来了" + topNum + "   " + tt + "    " + prop)
    }
    tt = prop; //记录上一句歌词时间
  }
}


var regPerson = /.*\/(.*)-/;
var regSong = /-(.*)\./
// 获取相对应的歌词
function getLyr(num) {
  // $(".lyr .lyrList div").css({
  //     top: 0
  // });

  var str = '<li>' + decodeURI(audio.src).match(regSong)[1] + '</li>\
                <li><span>歌手:</span>' + decodeURI(audio.src).match(regPerson)[1] + '</li>'
  $('.lyr .lyrName').html(str);

  $(".lyrList div").html('')
  // $(".lyrList div").append(" <li></li><li></li><li></li>")
  for (var prop in lyr[num]) {
    $('.lyr .lyrList div').append('<li>' + lyr[num][prop] + '</li>')
  }
}

// 歌词滚动
function lyrChange() {
  if ($(".lyr .lyrList div").position().top == 0) {
    lyrColor.style.clip = 'rect(0,0,0,0)';
  }
  var num = 0;
  for (var prop in lyr[index]) {
    var time = prop - num - 3;
    if (time < 2) {
      time = 3
    } else if (time > 10) {
      time = 5
    }
    // 当前音乐播放时间等于歌词对应时间 并且歌词上一句时间与下一句不等
    // 并且歌词时间不是0也就是不是第一句时 再滚动
    if (parseInt(audio.currentTime) == prop && prop != num && prop != 0) {
      // topNum ++
      $(".lyr .lyrList div").animate({
        top: '-=40'
      })
      lyrColor.style.clip = 'rect(0,0px,40px,0)';
      $('.colorLyr').text(lyr[index][prop]);
      $(".lyrOne").text(lyr[index][prop]);
      $('.lyr').append($('.colorLyr'));
      lyrColor.style.clip = 'rect(0,' + lyrColor.offsetWidth + 'px,40px,0)';
      // $('.colorLyr').css('clip','rect(0,' + $(this).width() + 'px,40px,0)');
      lyrColor.style.transition = 'clip ' + time + 's linear 0.3s';
    }
    num = prop;
  }
}

// 雪花飘散
function snow() {
  var r = Math.random() * 255;
  var g = Math.random() * 255;
  var b = Math.random() * 255;
  var size = 14 + Math.random() * 40;
  // left和top位置需要减去自身宽度 否则有可能超出第一屏
  var leftStart = Math.random() * $(window).width() > ($(window).width() - 100) ? ($(window).width() - 80) : Math.random() * $(window).width();
  var leftTo = Math.random() * $(window).width() > ($(window).width() - 100) ? ($(window).width() - 80) : Math.random() * $(window).width();
  var opa = 0.7 + Math.random() * 0.3;
  var topTo = $(window).height() - 100;
  var num = Math.floor(Math.random() * 5);
  var str = ''
  if (num == 0) {
    str = '&#xe6b1;'
  } else if (num == 1) {
    str = '&#xe7ab;'
  } else if (num == 2) {
    str = '&#xe60d;'
  } else if (num == 3) {
    str = '&#xe60b;'
  } else if (num == 4) {
    str = '&#xe60e;'
  }
  // 不加clone也可以
  $('<div class = \'iconfont beautiful\'>' + str + '</div>').appendTo($("body"))
    .css({
      width: size,
      height: size,
      color: "rgb(" + r + "," + g + ',' + b + ")",
      'font-size': size,
      position: 'absolute',
      left: leftStart,
      top: 0,
      opacity: opa,
      'z-index': 100
    }).animate({
      left: leftTo,
      top: topTo,
      opacity: 0
    }, 7000, 'linear', function () {
      $(this).remove(); //利用回调函数删除自身效果更好
    })
}


// 键盘事件
$(document).keydown(function (e) {
  var value = e.which;
  var volH = $('.activeVol').height();
  var activeW = $('.active').width();
  if (value == 38 || value == 40) {
    // volShow(volPro);
    if (value == 38) {
      volH++;
    }
    if (value == 40) {
      volH--;
    }
    $('.activeVol').height(volH);
    if (volH <= 10) {
      $('.activeVol').height(10);
      mute.innerHTML = '&#xe622;';
      tubiao.innerHTML = '&#xe622;';
      audio.muted = 'muted';
      console.log('101010')
    } else {
      mute.innerHTML = '&#xe630;';
      tubiao.innerHTML = '&#xe630;';
      audio.muted = false;
      console.log("else")
    }
    if (volH >= 110) {
      $('.activeVol').height(110);
    }
    if (audio.volume > 0 && audio.volume < 1) {
      audio.volume = (volH - 10) / 100;
    }
    console.log(audio.volume)
  }
  if (value == 37 || value == 39) {
    clearInterval(timer);
    clearInterval(timerLyr);
    audio.pause();
    if (value == 37) activeW--;
    if (value == 39) activeW++;

    if (activeW <= radioWidth) {
      activeW = radioWidth;
    }
    if (activeW >= lengthPro) {
      activeW = lengthPro;
    }
    $('.active').width(activeW);
    audio.currentTime = allTime * (activeW - radioWidth) / (lengthPro - radioWidth);
    startTime.innerHTML = change(audio.currentTime);
  }
});
$(document).keyup(function (e) {
  var value = e.which;
  if (value == 37 || value == 39) {
    audioPlay();
  }
})