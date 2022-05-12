function Lyr() {
  this.colorLyr = document.getElementsByClassName('colorLyr')[0];
  this.getM = new GetMusic();
  this.souce = souce;
  this.songList = document.getElementsByClassName('name');
}
// 获取歌单
Lyr.prototype.getSongName = function () {
  var _this = this;
  this.souce.forEach(function (ele, index) {
    _this.songList[index].getElementsByTagName("span")[0].innerHTML = ele.songName
  })
}

// 获取歌词
Lyr.prototype.getLyr = function (index) {
  var regSong = /\/.*-(.*)\./;
  var regPerson = /.*\/(.*)-/;
  var str = '<li>' + decodeURI(this.getM.audio.src).match(regSong)[1] + '</li>\
                <li><span>歌手:</span>' + decodeURI(this.getM.audio.src).match(regPerson)[1] + '</li>'
  $('.lyr .lyrName').html(str);
  $(".lyrList div").html('');
  // $(".lyrList div").append(" <li></li><li></li><li></li>")
  for (var prop in souce[store.index].lyr) {
    $('.lyr .lyrList div').append('<li>' + souce[store.index].lyr[prop] + '</li>')
  }
}
Lyr.prototype.lyrChange = function () {
  this.lyr = souce[store.index].lyr;
  if ($(".lyr .lyrList div").position().top == 0) {
    this.colorLyr.style.clip = 'rect(0,0,0,0)';
  }
  var num = 0;
  for (var prop in this.lyr) {
    var time = prop - num - 3;
    if (time < 2) {
      time = 2
    } else if (time > 10) {
      time = 5
    }
    if (parseInt(this.getM.audio.currentTime) == prop && prop == 0) {
      // $('.colorLyr').text(this.lyr[prop]); 
      $(".lyrOne").text(this.lyr[prop]);
    }
    // 当前音乐播放时间等于歌词对应时间 并且歌词上一句时间与下一句不等
    // 并且歌词时间不是0也就是不是第一句时 再滚动
    if (parseInt(this.getM.audio.currentTime) == prop && prop != num && prop != 0) {
      // topNum ++
      $(".lyr .lyrList div").animate({
        top: '-=40'
      })
      this.colorLyr.style.clip = 'rect(0,0px,40px,0)';
      $('.colorLyr').text(this.lyr[prop]);
      $(".lyrOne").text(this.lyr[prop]);
      $('.lyr').append($('.colorLyr'));
      this.colorLyr.style.clip = 'rect(0,' + this.colorLyr.offsetWidth + 'px,40px,0)';
      this.colorLyr.style.transition = 'clip ' + time + 's linear 0.3s';
    }
    num = prop;
  }
}
// 歌词滚动高度
Lyr.prototype.getTop = function (timerLyr) {
  clearInterval(timerLyr)
  // 颜色字体先归零
  this.colorLyr.style.transition = 'none'
  this.colorLyr.style.clip = 'rect(0,0,0,0)';
  // 歌词滚动top也归零
  $(".lyr .lyrList div").css({
    top: 0
  });
  var topNum = 0; //歌词滚动倍数
  var tt = 0; //记录上一句歌词时间
  for (var prop in souce[store.index].lyr) {
    topNum++
    // 当前播放时间在歌词的上一句对应的时间与这一句对应的时间之间时
    if (parseInt(this.getM.audio.currentTime) <= prop && parseInt(this.getM.audio.currentTime) >= tt) {
      $(".lyr .lyrList div").css({
        top: -(topNum - 4) * 40
      })
      $('.colorLyr').text(souce[store.index][tt]);
      $(".lyrOne").text(souce[store.index][tt]);
    }
    tt = prop; //记录上一句歌词时间
  }
}