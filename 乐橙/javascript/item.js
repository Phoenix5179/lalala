;(function(){
    var itemcontent = document.querySelector(".item-content")
    ajaxGet("http://localhost:81/data/smart-lock.json",function(res){
        var str="";
        var obj=JSON.parse(res);
        // console.log(localStorage.num)
        // console.log(obj[localStorage.num])
        for(var i=0;i<obj.length;i++){
            str = `
            <section class="item-sec1">
            <div class="item-sec1-bottom">
                <div class="item-sec1-left">
                    <div class="sbox">
                        <img src="${obj[localStorage.num].img1}" alt="">
                        <span></span>
                    </div>
                </div>
                <div class="item-sec1-right">
                    <ul class="switch">
                        <li class="active">商品信息</li>
                        <li>放大观看</li>
                    </ul>
                    <div class="text" id="txt">
                        <div class="info">
                            <p class="item-sec1-label"><span>${obj[localStorage.num].tag}</span></p>
                            <p class="item-sec1-title">${obj[localStorage.num].name}</p>
                            <p class="item-sec1-info">
                                ${obj[localStorage.num].desc}
                            </p>
                            <div class="item-sec1-table">
                                <div class="item-sec1-price">
                                    <span>到手价</span>
                                    <em>￥<i>${obj[localStorage.num].price}</i></em>
                                    <b>${obj[localStorage.num].marketprice}</b>
                                </div>
                                <div class="item-sec1-button clear" index="${obj[localStorage.num].goodsId}" >
                                    <button class="el-button button-buy el-button--default">
                                        <span>看看购物车</span>
                                    </button>
                                    <button class="addCar el-button el-button--primary">
                                        <span>加入购物车</span>
                                    </button>
                                </div>                        
                            </div>
                        </div>
                        <div>
                            <div class="bbox ">
                                <img src="${obj[localStorage.num].img1}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`
        }
        itemcontent.innerHTML = str;

  


        function Tab(){
            //		1.选择元素
                    this.li = document.querySelectorAll(".switch li");
                    this.p = document.querySelectorAll(".text>div");
                    this.sSpan = document.querySelector(".sbox span");
                    // console.log(this.li)
            //		2.开始绑定事件
                    this.addEvent();
                }
                Tab.prototype.addEvent = function(){
                    var that = this;
            //		绑定事件的功能
                    for(var i=0;i<this.li.length;i++){
                        this.li[i].index = i;
                        this.li[i].onclick = function(){
            //				3.开始计算索引
                            that.changeIndex(this)
                        }
                    }
                }
                Tab.prototype.changeIndex = function(li){
            //		计算索引的功能
                    this.index = li.index;
            //		4.根据索引显示当前
                    this.setActive();
                }
                Tab.prototype.setActive = function(){
            //		根据索引显示当前的功能
                    for(var i=0;i<this.li.length;i++){
                        this.li[i].className = "";
                        this.p[i].style.display = "none";
                    }
                    this.li[this.index].className = "active";
                    this.p[this.index].style.display = "block";
                    if(this.index == 1 ){
                        new Magnifier();
                        // console.log(1)
                    }else{
                        // console.log(2)
                        // console.log(this.sSpan)
                        this.sSpan.style.background = "rgba(200,200,200,0)"
                    }
                }
                
                new Tab();
		
                
                class Magnifier{
                    constructor(){
        //				1.选元素
                        this.sBox = document.querySelector(".sbox");
                        this.sSpan = document.querySelector(".sbox span");
                        this.bBox = document.querySelector(".bbox");
                        this.bImg = document.querySelector(".bbox img");
                        console.log(this.bBox)
        //				2.绑定事件
                        this.init()
                    }
                    init(){
                        var that = this;
        //				绑定事件
        //				进入
                        this.sBox.onmouseover = function(){
        //					3.显示隐藏的内容
                            that.over()
                        }
        //				移动
                        this.sBox.onmousemove = function(eve){
                            var e = eve || window.event;
        //					4.移动时计算比例
                            that.move(e)
                        }
        //				离开
                        this.sBox.onmouseout = function(){
        //					5.隐藏
                            that.out()
                        }
                    }
                    over(){
        //				显示
                        this.sSpan.style.display = "block";
                        this.bBox.style.display = "block";
        //				根据右边图和框的比例,计算span的宽高
                        this.sSpanW = (this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth);
                        this.sSpanH = (this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight);
        //				设置span的宽高
                        this.sSpan.style.width = this.sSpanW + "px";
                        this.sSpan.style.height = this.sSpanH + "px";
                        
        //				提前获取尺寸,方便将来使用
                        this.sW = this.sBox.offsetWidth;
                        this.sH = this.sBox.offsetHeight;
        
                        this.bW = this.bBox.offsetWidth;
                        this.bH = this.bBox.offsetHeight;
        
                        this.bImgW = this.bImg.offsetWidth;
                        this.bImgH = this.bImg.offsetHeight;
                    }
                    move(e){
        //				计算span要移动的left和top
                        // console.log(e.clientX)
                        var l = e.clientX - this.sBox.offsetLeft - this.sSpan.offsetWidth/2;
                        var t = e.clientY - this.sBox.offsetTop - this.sSpan.offsetHeight/2;
        //				span的边界限定
                        if(l<0) l=0;
                        if(t<0) t=0;
                        if(l>this.sW - this.sSpanW){
                            l = this.sW - this.sSpanW;
                        }
                        if(t>this.sH - this.sSpanH){
                            t = this.sH - this.sSpanH;
                        }
        //				设置span的位置
                        this.sSpan.style.left = l + "px";
                        this.sSpan.style.top = t + "px";
        //				根据span移动的位置,计算出比例,在根据比例,计算右边大图要移动的距离
                        this.bImg.style.left = l / (this.sW - this.sSpanW) * (this.bW - this.bImgW) + "px";
                        this.bImg.style.top = t / (this.sH - this.sSpanH) * (this.bH - this.bImgH) + "px";
                    }
                    out(){
        //				隐藏
                        this.sSpan.style.display = "none";
                        this.bBox.style.display = "none";
                    }
                }
                
                // new Magnifier();
                


                class List{
                    constructor(){
                        this.btn = document.querySelector(".item-content");
                        
                        this.addEvent();
                    }
                    addEvent(){
                        var that = this;
                        this.btn.addEventListener("click",function(eve){
                            var e = eve || window.event;
                            var target = e.target || e.srcElement;
                            if(target.className == "addCar el-button el-button--primary"){
                                // console.log(1)
                                //存ID和价格到cookie
                                that.id = target.parentNode.getAttribute("index");
                                console.log(that.id)
                                that.setCookie();
                            }        
                        })
                    }
                    setCookie(){
                        //这里处理cookie,当我点击购买按钮，cookie处的变化是，先判断是否有该商品的ID，如果有，就num加1.如果没有，就加上ID，num=1.之前都没有设置过cookie,这里要假设cookie的格式是[{id:xx,num:x},{id:xx,num:x},...]
                        this.goods = getCookie("goodsDECookie") ? JSON.parse(getCookie("goodsDECookie")) : [];
                        if(this.goods.length<1){
                            this.goods.push({
                                id:this.id,
                                num:1
                            })
                        }else{
                            var onoff = true;   //for里有if,不能用else,
                            for(var i=0;i<this.goods.length;i++){
                                if(this.goods[i].id === this.id){
                                    this.goods[i].num++;
                                    onoff = false;  
                                }
                            }
                                if(onoff){
                                    this.goods.push({
                                        id:this.id,
                                        num:1
                                    })
                                }
                        }
                        setCookie("goodsDECookie",JSON.stringify(this.goods))
                    }
                }               
                new List;
                var gocar = document.querySelector(".el-button--default")
                // console.log(gocar)
                gocar.onclick = function(){
                    location.href = "car.html"
                }

    })
})();