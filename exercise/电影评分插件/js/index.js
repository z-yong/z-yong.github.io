(function(){
    const grade = {
        init: function(dom,obj){
            if(obj.step > 1 || obj.step < 0){
                throw new Error("需要一个大于0且小于1的小数")
            }
            // 初始化所有的d元素
            const p = `<p class='name'>${obj.name}</p>`;
            const bg = `<div class="bg"></div>`;
            const active = `<div class='active'></div>`; 
            dom.append(p,bg); 
            $('.bg').append(active).css({
                'background': obj.bgImg,
                'background-size': obj.width + 'px',
                'width': obj.width * obj.num + 'px',
                'height': obj.width + 'px'
            })
            $('.active').css({
                'width': obj.numYellow/obj.num * 100 + '%',
                'background-size': obj.width + 'px'
            })
            // 需要用到的dom先存下来
            this.bg = $('.bg');
            this.active = $('.active');
            // 执行函数
            this.down(dom,obj)
        },
        // 事件绑定
        down: function(dom,obj){
            dom.on("mousedown",'.bg',function(e){
                $('.bg')[0].addEventListener('mousemove',this.move,false);
                document.addEventListener('mouseup',this.up.bind(this),false);
            }.bind(this))
        },
        move: function(e){
            grade.gradeChange(e,obj)
        },
        gradeChange: function(e,obj){
            this.ratio = e.offsetX/(obj.width*obj.num);
            // 当前星星个数
            if(!obj.step){
                this.rating = Math.ceil(this.ratio * obj.num);
            }else{
                for(let i = 0 ;; i += obj.step){
                    if(i >= this.ratio*obj.num){
                        this.rating = i;
                        break;
                    }
                }
                // 解决精度问题 先精确到十位数 然后在让它变成浮点数
                this.rating = parseFloat(this.rating.toPrecision(10));
                console.log(this.rating)
            }
            if(this.ratio < 0.01){
                this.rating = 0
            }
            this.active.css({
                'width': this.rating / obj.num * 100 + '%'
            });
            this.bg.attr('data-title',this.rating + '/' + obj.num)
        },
        up: function(){
            $('.bg')[0].removeEventListener('mousemove',this.move,false);
            document.removeEventListener("mouseup",this.up.bind(this),false);
        }
    }
    $.fn.movieGrade = function(obj){
        grade.init(this,obj);
    }
})($)