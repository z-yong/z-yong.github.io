(function(){
    var start = new Start();
    var mute = $('.mute');
    var tubiao = $('.tubiao');
    var audio = $('audio')[0];
    var activeVol = $('.activeVol');
    var volH = activeVol.height();
    var active = $('.active');
    var activeW = active.width(); 
    $(document).keydown(function(e){
        var value = e.which;
        
        if(value == 38 || value == 40){
            // volShow(volPro);
            if(value == 38){
                volH ++; 
            } 
            if(value == 40){
                volH --;   
            } 
            activeVol.height( volH );
            if(volH <= 10){
                activeVol.height(10) ;
                mute.html('&#xe622;');
                tubiao.html('&#xe622;');
                audio.muted = 'muted';
                console.log('101010')
            }else{
                mute.html('&#xe630;');
                tubiao.html('&#xe630;');
                audio.muted = false;
                console.log("else")
            }
            if(volH >= 110){
                activeVol.height(110);
            }
            if(audio.volume > 0 && audio.volume < 1){
                audio.volume = (volH - 10) / 100;
            }
        }
        if(value == 37 || value == 39){
            clearInterval(start.timer);
            clearInterval(start.timerLyr);
            audio.pause();
            if(value == 37) activeW --;
            if(value == 39) activeW ++;
            
            if(activeW <= start.radioWidth){
                activeW = start.radioWidth;
            }
            if(activeW >= start.lenPro){
                activeW = start.lenPro;
            }
            $('.active').width(activeW);
            // 这里总时长需要重新获取
            audio.currentTime = audio.duration * (activeW - start.radioWidth) / (start.lenPro - start.radioWidth);
            start.startTime.html(change(audio.currentTime));
        }
    });
    $(document).keyup(function(e){
        var value = e.which;
        if(value == 37 || value == 39){
            start.audioPlay();
        }
    })
})();