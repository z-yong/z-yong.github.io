const pid = $.parseProductId();
if(!pid){
    alert('商品不存在');
    // window.history.back();
    location.href = 'index.html'
    
}else{
    $.apiGet('/productDetail?pid='+ pid).then(function(data){
        document.title = data.name;
        $('.pro-title').text(data.name);
        $('.pro-desc').text(data.desc);
        $('.pro-price').find('span>label').text(data.price);
        $('.choose1 .prop-name').text(data.prop1_name)
        $('.choose2 .prop-name').text(data.prop2_name)
        const len = data.options.length;
        let tp1 = $('.choose1 .choose-list li').remove();
        let tp2 = $('.choose2 .choose-list li').remove();
        let options1;
        let options2;
        // 记录当前用户预添加到购物车的产品
        let sku;
        if(len){
            data.options.forEach(function(ele,index){
                options1 = tp1.clone();
                options1.find('.list-name').text(ele.prop1_value);
                options1.find('.price').text(ele.price)
                const len2 = ele.list;
                if(len2){
                    ele.list.forEach(function(elem,i){
                        options2 = tp2.clone();
                        // 做一个标识 用于联动
                        options2.addClass('sku' + index)
                        options2.find('.list-name').text(elem.prop2_value);
                        $('.choose2 .choose-list').append(options2);
                        // 点击颜色
                        options2.on('click',function(){
                            $(this).addClass("active").siblings().removeClass('active');
                            setImg(elem.imgs);
                            sku = elem.sku_id;
                            console.log(sku)
                        })
                    }) 
                }
                $('.choose1 .choose-list').append(options1);
            })
            // 点击版本
            $('.choose1 .choose-list').on('click','li',function(){
                $(this).addClass("active").siblings().removeClass('active');
                const index = $(this).index();
                $('.choose2 li').hide()
                $('.choose2 li').filter('.sku'+ index).show()
                .first().click();
            })
            // 默认第一个版本的颜色显示
            $('.choose2 li').hide()
            $('.choose2 li').filter('.sku0').show();
            // 添加元素后在执行
            $('.choose1 .choose-list').find('li').first().addClass('active');
            $('.choose2 .choose-list').find('li').first().click();
        } 
        // 添加购物车
        $('#addCart').mousedown('click',function(){
            if(sku){
                const data = {sku_id:sku}
                $.apiPost('/user/addCart',data).then(function(data){
                    window.alert('添加成功');
                    location.reload()
                })
            }else{
                alert('请选择型号')
            }
        })
        })
    // 获取图片及图片数量
    function setImg(images) {
        // 用map或者forEach亦可
		// const imgs = images.map(img => $('<img>').attr('src', img));
        // const links = images.map(() => $('<a href="javascript:;">1</a>')); 
        let imgs;
         images.forEach(function(ele,index){
            imgs = $('<img>').attr('src',ele)
        })
        const links = images.map(function(){
            return $('<a href="javascript:;">1</a>');
        })
		$('.pro-view .view-list').empty().append(imgs);
        $('.pro-view .control-page').empty().append(links);
    };
    
    
}