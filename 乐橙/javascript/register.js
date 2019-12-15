;(function(){

var ou = document.querySelector(".username");
var op = document.querySelector(".password");
var om = document.querySelector(".makesure");
var ob = document.querySelector(".regbutt");
var otips = document.querySelector(".reg_tips");
var u=p1=p2=false;


ou.onblur = function(){
    var myreg = /^1[0-9][0-9]\d{8}$/;
    if(this.value == localStorage.user){
        this.nextElementSibling.innerHTML = "手机号已注册"
        u = false;
    }else{
        if(myreg.test(this.value)){
            this.nextElementSibling.innerHTML = "手机号正确";
            u = true;
        }else{
            this.nextElementSibling.innerHTML = "手机号不正确";
            u = false;
        }
    }
}

op.oninput = function(){
       // 不允许为空，为空的话，验证就不验证
    //    console.log(1)
       if(this.value == ""){
        this.nextElementSibling.innerHTML = "不允许为空";
        p = false
        return;
    }
    // 用来记录是否出现数字n，字母a，特殊t的状态变量
    var n=a=t=0;
    
    // 单独验证，查询是否存在，而不需要整体验证
    var numReg = /\d/;
    var azReg = /[a-z]/i;
    var tsReg = /[^\da-z]/i;
    if(numReg.test(this.value)){
        n=1
    }
    if(azReg.test(this.value)){
        a=1
    }
    if(tsReg.test(this.value)){
        t=1
    }

    switch(n+a+t){
        case 1:
            this.nextElementSibling.innerHTML = "简单";break;
        case 2:
            this.nextElementSibling.innerHTML = "一般";break;
        case 3:
            this.nextElementSibling.innerHTML = "困难";break;
    }
    p = true;

    if(om.value == "") return;
    if(this.value == om.value){
        om.nextElementSibling.innerHTML = "一致";
        p2 = true;
    }else{
        om.nextElementSibling.innerHTML = "不一致";
        p2 = false;
    }
}

om.oninput = function(){
    if(this.value == op.value){
        this.nextElementSibling.innerHTML = "一致";
        p2 = true;
    }else{
        this.nextElementSibling.innerHTML = "不一致";
        p2 = false;
    }
}

ob.onclick = function(){
    if(u && p && p2){
        alert("注册成功");
        // console.log(ou.value)
        // console.log(op.value)
        localStorage.setItem("user",ou.value);
        localStorage.setItem("psw",op.value);        
    }else{
        if(!u){

        }
        if(!p){

        }
        if(!p2){

        }
    }
}


})()
//先增加事件，1.用户名格式必须是手机号 2.判断用户名是否重复 3.判断两次密码是否一致