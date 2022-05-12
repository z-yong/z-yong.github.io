function Start() {
  this.getM = new GetMusic();
  this.lyr = new Lyr();
  this.ff = true;
  this.rand = $('#rand');
  this.startTime = $('.startTime');
  this.endTime = $('.endTime');
  this.radioWidth = $('.radioBox>span').width();
  this.active = $('.active');
  this.start = $('.start');
  this.imgBox = document.getElementsByClassName('imgBox')[0];
  this.songList = document.getElementsByClassName('name');
  this.svg = document.getElementsByClassName("svg");
  this.svgTwo = $(".two");
  this.len = souce.length;
  this.up = $('.up');
  this.down = $('.down');
  // 执行事件
  // this.init(); 
}
// 事件绑定
Start.prototype.init = function () {
  this.rand.click(this.randStart.bind(this));
  this.start.mouseup(this.state.bind(this));
  this.up.click(this.upSong.bind(this));
  this.down.click(this.downSong.bind(this));
  // 初始化音乐时间
  this.getAllTime();
  this.songNamePlay();
}
Start.prototype.getAllTime = function () {
  var _this = this;
  this.getM.audio.ondurationchange = function () {
    // _this.getM.audio.oncanplay = function(){
    _this.allTime = _this.getM.audio.duration;
    _this.endTime.text(change(_this.allTime));
    _this.getM.audio.volume = 0.4;
  }.bind(_this);
  // }

}
// 控制音乐播放
Start.prototype.state = function () {
  if (this.getM.audio.paused) {
    this.audioPlay();
  } else {
    this.audioPasue();
  }
}
// 音乐播放
Start.prototype.audioPlay = function () {
  var _this = this;
  this.lyr.getTop(this.timerLyr);
  this.lyr.getLyr(store.index);
  this.svgTwo.animate({
    top: 0
  }, 3000);
  this.getM.audio.play();
  this.start.html('&#xe631;');
  this.imgBox.style.animation = 'rot 7s linear infinite';
  this.timer = setInterval(_this.timeChange.bind(_this), 800);
  this.timerLyr = setInterval(_this.lyr.lyrChange.bind(_this.lyr), 1100);
  this.changeSongName(store.index);
  this.danceSongName(this.svg[store.index]);
}

// 音乐暂停
Start.prototype.audioPasue = function () {
  this.getM.audio.pause();
  this.start.html('&#xe666;');
  // 这里不能写none 否则角度值会归零
  this.imgBox.style.animationPlayState = 'paused';
  clearInterval(this.timer)
  clearInterval(this.timerLyr)
  this.svg[store.index].innerHTML = '';
  this.svgTwo.animate({
    top: -50
  }, 1500);
}
Start.prototype.changeSongName = function () {
  for (var i = 0; i < this.songList.length; i++) {
    this.songList[i].className = 'name'
  }
  this.songList[store.index].className = 'name color';
}
Start.prototype.timeChange = function () {
  // 每次都要初始化音乐跳长度 因为不知是何页面
  this.lenPro = $('.bg').width();
  if (this.getM.audio.ended) {
    $(".lyrOne").text('')
    if (this.ff) {
      store.index++;
      if (store.index == this.len) {
        store.index = 0;
      }
    } else {
      store.index = numRan();
    }
    this.getM.getSong(this.timer, this.timerLyr);
    this.audioPlay();
  }

  this.startTime.text(change(this.getM.audio.currentTime));
  var w = this.getM.audio.currentTime * (this.lenPro - this.radioWidth) / this.allTime + this.radioWidth;
  this.active.width(w);
}
// 上一首
Start.prototype.upSong = function () {
  if (this.ff) {
    if (store.index) {
      store.index--;
    } else {
      store.index = this.len - 1;
    }
  } else {
    store.index = numRan();
  }
  this.getM.getSong(this.timer, this.timerLyr);
  this.audioPlay();
}
// 下一首
Start.prototype.downSong = function () {
  if (this.ff) {
    if (store.index < this.len - 1) {
      store.index++;
    } else {
      store.index = 0;
    }
  } else {
    store.index = numRan();
  }
  this.getM.getSong(this.timer, this.timerLyr);
  this.audioPlay();
}
// 随机
Start.prototype.randStart = function () {

  if (this.ff) {
    this.rand.html('&#xe629');
  } else {
    this.rand.html('&#xe62b;');
  }
  this.ff = !this.ff;
}
Start.prototype.endT = function () {
  // this.allTime = this.getM.audio.duration;
  this.endTime.text(change(this.allTime));
  // 初始化音量
  this.getM.audio.volume = 0.4;
}
// 小svg跳动
Start.prototype.danceSongName = function (dance) {
  for (var i = 0; i < this.svg.length; i++) {
    this.svg[i].innerHTML = '';
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
// 点击歌单曲目播放音乐
Start.prototype.songNamePlay = function () {
  var _this = this;
  var songListArr = [].slice.call(this.lyr.songList);
  songListArr.forEach(function (ele, index) {
    (function (i) {
      ele.onclick = function () {
        store.index = i;
        _this.getM.getSong(_this.timer, _this.timerLyr);
        _this.audioPlay();
      }
    }(index))
  })
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
  return temp;
}

function change(time) {
  var sec = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60) : parseInt(time % 60)
  var min = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
  return min + ':' + sec;
}