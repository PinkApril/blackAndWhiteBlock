(function(){
    window.Block = function(){
        this.rowAmount = 7; //行数
        this.colAmount = 4;//列数
        this.score = 0;//游戏分数
        this.pev = 0;//点击状态
        this.init();//初始化dom
        this.render();//渲染dom
        this.BindEvent();//添加点击事件
        // arr.push(this)
    }
    // 初始化dom
    Block.prototype.init = function(){
        var table,tr,td,div,span,btn;
        this.dom = document.createElement('span');
        document.getElementById('box').appendChild(this.dom);
        $('span')[0].className = 'start'
        table = document.createElement('table');
        this.dom.after(table);
        div = $('<div class="over"></div>');
        span = $('<span>游戏结束</span><br>');
        btn = $('<button><a href="./index.html">确 定</a></button>');
        $("#box").append(div);
        $('.over').append(span)
        $('.over').append(btn)
        for(var i = 0; i < this.rowAmount; i++){
            tr = document.createElement("tr");
            table.appendChild(tr);
            for(var j = 0; j <  this.colAmount; j++){
                td = document.createElement("td");
                tr.appendChild(td);
            }
        }
    }
    // 渲染dom
    Block.prototype.render = function(){
        for(var j = 0 ;j < this.rowAmount; j++){//行
            document.getElementsByTagName('tr')[j].getElementsByTagName("td")[parseInt(Math.random() *4)].className = "active"
            // this.num = parseInt(Math.random() *3);
        }
        for (let i = this.colAmount-1; i >= 0; i--) {
            if($('tr')[this.rowAmount-1].getElementsByTagName('td')[i].className == 'active'){
                $('tr')[this.rowAmount-1].getElementsByTagName('td')[i].innerText = "开始!";
                $('tr')[this.rowAmount-1].getElementsByTagName('td')[i].className = 'cur';
            }
            
        }
    }
    
    // 添加点击事件
    Block.prototype.BindEvent = function(){//添加点击事件
        var self = this;        
        // var pev = 0;
        for(var i = 0; i < this.rowAmount; i++){
            for(var j = 0; j < this.colAmount;j++){
                document.getElementsByTagName('tr')[i].getElementsByTagName("td")[j].onclick = function(){
                    if(this.hasAttribute("class")){
                        if($(this).parent().index() == self.rowAmount-1 ){
                            self.pev = self.rowAmount-1;
                            this.className = "changeactive";
                            $('span')[0].innerText = "分数：" + self.score;
                            self.score += 1;
                        }else if($(this).parent().index() < self.pev && self.pev - $(this).parent().index() == 1){
                            self.pev = $(this).parent().index()
                            this.className = "changeactive";
                            $('span')[0].innerText = "分数：" + self.score;
                            self.score += 1
                        }else{
                            clearInterval(game.timer);
                            self.over()
                        }
                    }else{
                        clearInterval(game.timer);
                        self.over()
                    }
                } 
            }
        }
    }

    // 添加新的表格并给新表格添加点击事件
    Block.prototype.change = function(){
        var td;
        var tr = document.createElement('tr');
        var table = document.getElementsByTagName('table')[0];
        var oldtr = table.getElementsByTagName('tr')[0];
        table.insertBefore(tr,oldtr);
        for(var j = 0; j < 4; j++){
            td = document.createElement("td");
            tr.appendChild(td);
        }
        this.BindEvent()
        $("table").find("tr:last").remove()
        // 每次添加删除一行后，状态码+1
        this.pev +=1
    }
    // 游戏结束后提示游戏结束，确认后数据归零
    Block.prototype.over = function(){
        var _this = this;
        $('.over')[0].style.display = 'block'
        $('button').click(_this,function(){
            $('.over')[0].style.display = 'none'
        })
    }
    
})();