;(function(){
    var ali = document.querySelectorAll(".nav li");
    var onav = document.querySelector(".pop-container");
    var t;
    // console.log(onav);
    console.log(ali)
    ajaxGet("http://localhost:81/data/smart-lock.json",function(res){
        
        ali[2].onmouseenter = function(){
            var obj = JSON.parse(res)
            var str = "";
            onav.parentNode.style.height = 0; 
            for(var i=0;i<6;i++){
                // arr.push(obj[i])
                // console.log(1)
                str+=`<li><img src="${obj[i].img}"><p>${obj[i].name}</p><span>${obj[i].price}</span></li>`
            }
            onav.innerHTML = str;
            onav.parentNode.style.display ="block";
            clearInterval(t)
            t = setInterval(()=>{
                if(parseInt(onav.parentNode.style.height) < 280){
                    onav.parentNode.style.height = onav.parentNode.offsetHeight + 10 + "px";
                }
            },8)
            var ali1 = document.querySelectorAll(".pop-container li") 
            console.log(ali1)
            for(var i=0;i<6;i++){
                (function(arg){
                    ali1[arg].onclick = function(){
                        // console.log(arg);
                        localStorage.setItem("num",arg);
                        location.href = "item.html"
                    };
                })(i)  
            }
        }
        onav.parentNode.parentNode.onmouseleave = function(){
            onav.parentNode.style.display ="none";
        }
        
       //差从下拉框出来的到商品详情页
       //差从li的a标签上出来的到商品列表页
    })
    var shopcart = document.querySelector(".shopcart")
    shopcart.onclick = function(){
        if(localStorage.logintype == "on" ){
            location.href = "car.html"
        }else{
            location.href = "login.html"           
        }
    }
})();