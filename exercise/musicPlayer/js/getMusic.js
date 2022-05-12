function GetMusic() {
  this.audio = document.getElementsByTagName("audio")[0];
  this.img = document.getElementsByClassName('img')[0];
  this.album = document.getElementsByClassName('album')[0];
  this.souce = souce;
}
GetMusic.prototype.getSong = function (timer, timerLyr) {
  var souce = this.souce[store.index];
  this.lenLyr = Object.getOwnPropertyNames(souce.lyr).length;
  this.audio.src = './souce/' + souce.songName; //原生
  this.img.src = souce.songImg; //原生
  var str = decodeURI(this.audio.src);
  $('.songName').text(this.getSongName(str));
  if ($('.albumBox').position().top != 0) {
    document.body.style.transition = 'background 3s linear';
    document.body.style.backgroundImage = "url(" + souce.songBg + ")";
  };
  this.album.style.backgroundImage = "url(" + souce.songBg + ")"; //原生
  this.album.style.transition = 'background 3s linear';
  if (!this.audio.paused) {
    clearInterval(timer);
    clearInterval(timerLyr);
    console.log(timer)
  }
  $('.imgBox').insertBefore($('.lyrOne'));
  // getLyr(index);
  // audioPlay();
}
GetMusic.prototype.getSongName = function (str) {
  var reg = /.*\/(.*)\..*/;
  return str.match(reg)[1];
}