function Mod(file,events){
    this.file = file;
    this.len = file.size;
    this.reader = new FileReader();
    this.loaded = 0;
    this.readAt = 0;
    this.speed = 1024*1024;
    this.readPro(this.file, this.loaded, this.speed);
    this.readFile();
    this.upLoad();
    this.events = events;
}
Mod.prototype = {
    // 按每兆读取文件
    readPro :  function (file,start,end){
            if(file.slice){
                this.readAt = file.slice(start,start + end)
            }else{
                this.readAt = file;
            }
            this.reader.readAsText(this.readAt);
        },

// 当前进度条 : 总进度条 = 当前读取文件大小 : 文件总大小 = 当前百分比 : 100
    readFile : function (){
            var _this = this;
            this.reader.onprogress = function (e){
                // 获取当前上传的文件大小
                _this.loaded += e.loaded
                // 这里不处理的话 pro也不会大于1  这是为啥?
                var pro = _this.loaded/_this.len
                console.log(pro)
                // var pro = mod.loaded/mod.len > 1 ? 1 : mod.loaded/mod.len;
                _this.events.progress(pro);
            }
        },
// 文件上传中....
    upLoad : function (){
        var _this = this
            this.reader.onload = function(){
                // readFile();
                if(_this.loaded < _this.len){
                    _this.readPro(_this.file, _this.loaded, _this.speed);
                    _this.events.lodeEven(_this.loaded);
                }else{
                    _this.events.finnsh();
                }
            }    
        }
}
