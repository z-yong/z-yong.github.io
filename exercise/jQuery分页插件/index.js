(function($){
    var page = {
        init: function(dom,obj,pages,main,btn,input){
            this.fillHtml(dom,obj);
            this.clickEven(dom,obj,main,btn,input);
            pages.text(obj.allPage)
        },
        // 填充html
        fillHtml: function(dom,obj){
            // 每次填充都必须清空之前的dom元素
            dom.empty();
            if(obj.current < 1 || obj.current > obj.allPage || obj.allPage < 1) return;
            // 上一页
            if(obj.current == 1){
                dom.append('<li><a class="gray" href="###">首页</a></li>')
                dom.append('<li><a class="gray" href="###"><上一页</a></li>')
            }else{
                dom.append('<li><a class="home" href="###">首页</a></li>')
                dom.append('<li><a class="prev" href="###"><上一页</a></li>')
            }
            // 中间分页
            if(obj.allPage <= 7){
                for(var i = 1; i <= obj.allPage; i++ ){
                    if(i == obj.current){
                        dom.append('<li class="this-page"><span>'+ i +'</span></li>')
                    }else{
                        dom.append('<li class = "item" ><a href="###">'+ i +'</a></li>')
                    }
                }
            }else{
                var start = obj.current - 2;
                var end = obj.current + 2 ;
                // 判断前面是否加省略号
                if(obj.current > 4){
                    dom.append('<li class = "item" ><a href="###">1</a></li>');
                    dom.append('<li class="this-page"><span>. . .</span></li>')
                // 如果当前页是小于4时 不需要省略号
                }else if(obj.current <= 4){
                    start = 1;
                    end = 6;
                }
                // 当前页在倒数第1 2 3 时 不需要省略号
                if(obj.current > obj.allPage - 3){
                    start = obj.allPage - 5;
                    end = obj.allPage;
                }    
                console.log(obj.current)
                for(var i = start; i <= end; i ++){
                    if(i == obj.current){
                        dom.append('<li class="this-page"><span>'+ i +'</span></li>');
                    }else{
                        dom.append('<li class = "item" ><a href="###">'+ i +'</a></li>');
                    }
                }
                if(obj.current < obj.allPage - 3){
                    dom.append('<li class="this-page"><span>. . .</span></li>');
                    dom.append('<li class = "item" ><a href="###">' + obj.allPage + '</a></li>')
                }
            }
            // 下一页
            if(obj.current == obj.allPage){
                dom.append('<li><a class="gray" href="###">下一页></a></li>')
            }else{
                dom.append('<li><a class="next" href="###">下一页></a></li>')
            }
        },
        // 重绘html
        redrawHtml: function(obj,main){
            main.css('display','none').eq(obj.current - 1).css('display','block')
           
        },
        // 事件函数
        clickEven: function(dom,obj,main,btn,input){
            var _this = this;
            // 每次点击都要重新填充html
            dom.on('click', '.item',function(e){
                // 注意这里一定要将文本内容转化为数字类型
                obj.current = Number($(e.target).text());
                _this.fillHtml(dom,obj);
                _this.redrawHtml(obj,main);
            }).on('click','.home',function(){
                obj.current = 1;
                _this.fillHtml(dom,obj);
                _this.redrawHtml(obj,main);

            }).on('click','.prev',function(){
                obj.current --;
                _this.fillHtml(dom,obj);
                _this.redrawHtml(obj,main);
            }).on("click",'.next',function(){
                obj.current ++;
                _this.fillHtml(dom,obj);
                _this.redrawHtml(obj,main);
            })
            input.on('input',function(){
                var val = input.val();
                if(val <= 1) input.val(1);
                if(val >= obj.allPage) input.val(obj.allPage);
            })
            btn.click(function(){
                var val = input.val();
                obj.current = parseInt(val);
                if(isNaN(obj.current)){
                    input.val('')
                    return;
                }
                console.log(obj.current)
                _this.fillHtml(dom,obj);
                _this.redrawHtml(obj,main);
            })
            
        }
    }
    $.fn.paging = function(obj,pages,main,btn,input){
        page.init(this,obj,pages,main,btn,input)
    }
})($)