;(function(){
    var ou = document.querySelector(".username");
    var op = document.querySelector(".password");
    var ob = document.querySelector(".loginbutt");
    var t = false;
    ob.onclick = function(){
        // console.log(1)
        if(ou.value == localStorage.user && op.value == localStorage.psw){
            alert("登录成功");
            localStorage.logintype = "on"
            location.href = "index.html"
        }else{
            alert("用户名或密码错误，请重新输入");
            ou.value = "";
            op.value = "";
        }
    }
})()