(function(){
    window.Game = function(){    
        this.bottom = 0;//距离底部的距离

        this.start(); //游戏主循环 
    }
    // 游戏主循环
    Game.prototype.start = function(){    
        this.block = new Block(this);
        var self = this;
        $('.cur').click(self,
            function(event){
                _this = event.data         
                _this.timer = setInterval(function(){
                    _this.bottom -=10;
                    // 更改table的bottom
                    document.getElementsByTagName('table')[0].style.bottom  = _this.bottom +'px';
                    // 判断条件添加元素
                    if(_this.bottom % 100 == 0){
                        _this.block.change();
                        document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName("td")[parseInt(Math.random() *4)].className = "active"
                        _this.bottom = 0;
                        document.getElementsByTagName('table')[0].style.bottom  = _this.bottom +'px';
                        // 判断点击，没有点击结束游戏
                        if(_this.bottom == 0){
                            let o = 0;
                            for(var i = 0;i < _this.block.colAmount; i ++){
                                if($("tr")[_this.block.rowAmount-1].getElementsByTagName('td')[i].className != "changeactive"){
                                    o ++;
                                    if(o == 4){
                                        clearInterval(_this.timer)
                                    }
                                }
                            }
                        }
                    }
                },100)
            }
            
        )
    }

})()