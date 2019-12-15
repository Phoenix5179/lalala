;(function(){
    var goodslist = document.querySelector(".goodslist")
    ajaxGet("http://localhost:81/data/smart-lock.json",function(res){
        var str = "";
        var obj = JSON.parse(res);
        for(var i=0;i<obj.length;i++){
            str +=`<li>
            <div class="goodsitem">
                <div class="img-wrap">
                    <img src="${obj[i].img}" alt="">
                </div>
            
            <p class="tags"><span>${obj[i].tag}</span></p>
            <p class="name over">${obj[i].name}</p>
            <p class="desc">${obj[i].desc}</p>
            <p class="price">
                <span>${obj[i].price}</span>
                <span class="marketprice">${obj[i].marketprice}</span>
            </p>
            </div>
        </li>`
        }
        goodslist.innerHTML = str;
        var ali = document.querySelectorAll(".goodslist li")
        // console.log(ali)
        for(var j=0;j<ali.length;j++){
            (function(arg){
                ali[arg].onclick = function(){
                    console.log(arg);
                    localStorage.setItem("num",arg);
                    location.href = "item.html";
                };
            })(j)  
        }       
    })

})();