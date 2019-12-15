;(function($){
    "use strict";
    class Banner{
        constructor(){
            this.aimg =$("#banner img");
            // console.log(this.aimg)
            this.left =$("#banner .btn-left");
            this.right =$("#banner .btn-right");
            this.index =0;
            this.iPrev ="";
            this.moveTime=400;
            this.delayTime = 2000;
            this.t=0;
            this.autoplay();
            this.init()
        }
        init(){
            this.aimg.css({
                position:"absolute",
                left:this.aimg.eq(0).width(),
                top:0
            }).eq(this.index).css({left:0})
            this.changeIndex();
        }
        changeIndex(){
            var that = this
            this.left.click(function(){
                // console.log(1)
                that.changeIndexleft()
            }),
            this.right.click(function(){
                that.changeIndexright();
            })
        }
        changeIndexleft(){
            // var that = this
            if(this.index == 0){
                // console.log(this.aimg.length)
                this.index = this.aimg.length-1;
                this.iPrev = 0
            }else{
                // console.log(this.aimg)
                this.index --;
                this.iPrev = this.index + 1;
            }
            this.btnMove(1);
        }
        changeIndexright(){
            if(this.index == this.aimg.length-1){
                this.index = 0;
                this.iPrev = this.aimg.length-1
            }else{
                this.index ++;
                this.iPrev = this.index - 1;
            }
            this.btnMove(-1);
        }
        btnMove(type){
            this.aimg.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:this.aimg.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:-this.aimg.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime);
        }
        autoplay(){
            var that = this;
            this.t = setInterval(()=>{
                that.changeIndexright();
            },that.delayTime)
            this.aimg.hover(function(){
                clearInterval(that.t);
            },function(){
                that.t=setInterval(()=>{
                    that.changeIndexright();
                },that.delayTime)
            })
        }
    }
    new Banner();
})(jQuery)