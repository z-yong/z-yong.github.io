window.onload = function(){
    $('.wrapper').animate({
        width: 1250,
        height: 280,
    })
}


const json0 = {'width': '200','left': '0'}
const json1 = {'width': '350','left': '125'};
const json2 = {'width': '500','left': '375'};
const json3 = {'width': '350','left': '775'};
const json4 = {'width': '200','left': '1050'};
const json5 = {'width': '200','left': '0','z-index': '0'};
const json6 = {'width': '200','left': '1050px','z-index': '0'};


function Change(){
    this.index = 0;
    this.flag = true;
    this.init();
}
Change.prototype.init = function(){
    $('.left').on('click',this.left.bind(this))
    $('.right').on('click',this.right.bind(this));
    $('.assit').on('mouseleave',this.self.bind(this));
    $('.wrapper').on("mouseenter",function(){
        clearInterval(this.timer)
    }.bind(this));
    this.self();
    this.will();
}
Change.prototype.left = function (){
    var _this = this;
    if(this.flag){
        this.flag = false;
        $($('img')[this.index%7]).css(json6);

        $($('img')[(this.index+1)%7]).animate(json0).css('z-index',5)

        $($('img')[(this.index+2)%7]).animate(json0).css('z-index',10)

        $($('img')[(this.index+3)%7]).animate(json1).css('z-index',20)
        
        $($('img')[(this.index+4)%7]).animate(json2).css('z-index',99)

        $($('img')[(this.index+5)%7]).animate(json3,function(){
            _this.flag = true;
        }).css('z-index',20)

        $($('img')[(this.index+6)%7]).css('z-index',10)

        this.index ++
    }
}
Change.prototype.right = function (){
    var _this = this;
    if(this.flag){
        this.flag = false;
        $($('img')[this.index%7]).css(json5)
        $($('img')[(this.index+1)%7]).animate(json1).css('z-index','20')

        $($('img')[(this.index+2)%7]).animate(json2).css('z-index','99');

        $($('img')[(this.index+3)%7]).animate(json3).css('z-index','20')

        $($('img')[(this.index+4)%7]).animate(json4,function(){
            _this.flag = true;
        }).css('z-index','10');

        $($('img')[(this.index+5)%7]).css(json4).css('z-index','5');

        $($('img')[(this.index+6)%7]).css(json5);

        this.index --;
        if(this.index < 0){
            this.index += 7
        }
    }
}
Change.prototype.self = function(){
    this.timer = setInterval(this.left.bind(this),2000)
}

Change.prototype.will = function (){
    const _this = this;
    $('img').on("click",function(){
        const index = $(this).index();
        const arrIndex = _this.getIndex(index);

        if(_this.flag){
            _this.flag = false;
            $($('img')[arrIndex[0]]).css(json5);

            $($('img')[arrIndex[1]]).animate(json0).css('z-index','10');

            $($('img')[arrIndex[2]]).animate(json1).css('z-index','20');
    
            $($('img')[arrIndex[3]]).animate(json2).css('z-index','99');
    
            $($('img')[arrIndex[4]]).animate(json3).css('z-index','20');//
    
            $($('img')[arrIndex[5]]).animate(json4,function(){//
                _this.flag = true;
            }).css('z-index','10');
    
            $($('img')[arrIndex[6]]).css(json6)//
        }
    })
}
Change.prototype.getIndex = function(index){
    const arrIndex = [];
    let one = index - 3;
    let two = index - 2;
    let three = index - 1;
    let four = index;
    let five = index + 1;
    let six = index + 2;
    let seven = index + 3;

    if(one < 0) one += 7;
    if(two < 0) two += 7;
    if(three < 0) three += 7;
    if(five > 6) five -= 7;
    if(six > 6) six -= 7;
    if(seven > 6) seven -=7;

    arrIndex.push(one,two,three,four,five,six,seven);
    return arrIndex;
}
new Change();