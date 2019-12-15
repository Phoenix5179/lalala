
;(function(){
    var oinfo = document.querySelector(".icon-mobile-phone");
    // console.log(oinfo)
    if(localStorage.logintype == "on"){
        var achild = oinfo.parentNode.parentNode.children;

        var arr = Array.from(achild);
        arr[0].remove();
        arr[1].remove();
        arr[2].remove();
        console.log(arr)
        arr[3].outerHTML = `欢迎，${localStorage.user}
        <span class="signout">退出登录</span>
        |${arr[3].outerHTML}`


        var signout = document.querySelector(".signout");
        signout.onclick = function(){
            localStorage.logintype = "off";
            location.href = "login.html"
        }
    }
    //导航商品渲染
    var ali = document.querySelectorAll(".nav li");
    var onav = document.querySelector(".pop-container");
    var t;
    // console.log(onav);
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
        

    })
    var newarrival = document.querySelector(".newarrival")
    ajaxGet("http://localhost:81/data/goods-new-arrival.json",function(res){
        var obj = JSON.parse(res);
        var str = "";
        for(var i=0;i<obj.length;i++){
            str +=`<li><div class="img-wrap"><img lazysrc="${obj[i].img}" alt=""></div><p class="tags"><span>${obj[i].tag}</span></p><p class="name over">${obj[i].name}</p><p class="desc">${obj[i].desc}</p><p class="price">${obj[i].price}</p></li>`
        }
        newarrival.innerHTML = str;
//懒加载
    var aimg = document.querySelectorAll("img[lazysrc]");
    // console.log(aimg)
	var arr = Array.from(aimg);
	var clientH = document.documentElement.clientHeight;
	
	lazyLoad();
	onscroll = function(){
		lazyLoad();
	}
	function lazyLoad(){
		var scrollT = document.documentElement.scrollTop;
		for(var i=0;i<arr.length;i++){
			if(arr[i].offsetTop - clientH < scrollT){
				arr[i].src = arr[i].getAttribute("lazysrc");
				arr.splice(i,1);
                i--;
                console.log("懒加载")
			}
		}
	}

    })
    var shopcart = document.querySelector(".shopcart")
    shopcart.onclick = function(){
        if(localStorage.logintype == "on" ){
            location.href = "car.html"
        }else{
            location.href = "login.html"           
        }
    }
    $(".storey li").click(function(){
		var i = $(this).index();
		var t = $(".floor").eq(i).offset().top;
		$("html").animate({
			scrollTop:t
		})
	})
    

    
})();