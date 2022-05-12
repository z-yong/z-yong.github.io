
const mod = new Modu($('img'),$('li'),$('.list'),$('.iconfont'));

mod.$list.on('tap','li',function(){
    mod.showPhoto();
    mod.index = $(this).index();
    mod.change(mod.index);
    mod.$list.on('swipeLeft swipeRight',function(e){
        if(e.type == 'swipeLeft'){
            mod.index ++;
            // 边界
            mod.index = mod.index >= (mod.len - 1) ? (mod.len - 1) : mod.index; 
        }else if(e.type == 'swipeRight'){
            mod.index --;
            mod.index = mod.index <= 0 ? 0 : mod.index;
        }
        mod.cent()
        mod.slide(mod.index);
    })
})
mod.$icon.on('tap',function(){
    mod.init();
    $(this).hide();
    mod.$list.off('swipeLeft swipeRight')
})



