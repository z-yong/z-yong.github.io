 var boxIn = document.getElementsByClassName("boxIn")[0],
     active = document.getElementsByClassName("active")[0],
     span = document.getElementsByTagName("span")[0];

    //  取消整个文档的默认事件 因为文件拖放到浏览器页面上时会自动打开
document.documentElement.addEventListener("dragover",function(e){
    e.preventDefault();
    })
document.documentElement.addEventListener("drop",function(e){
    e.preventDefault();
    })
boxIn.addEventListener("dragover",function(e){
    e.preventDefault();
})
boxIn.addEventListener("drop",function(e){
    // e.preventDefault(); 
    file = e.dataTransfer.files[0];
    new Mod(file,events);
})
var events = {
    progress : function(pro){
        active.style.width = parseInt( pro*250 ) + 'px';
        span.innerHTML = pro*100 + '%';
    },
    lodeEven: function(loaded){
        console.log("文件上传了" + loaded);
    },
    finnsh : function(){
        console.log("上传成功!!!!!!!!");
    }
}

