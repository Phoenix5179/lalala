let http = require("http");
let fs = require("fs");

//解析url的小模块,工具模块
let url = require("url");
//解析查询数据的小模块,工具模块
let querystring = require("querystring");

http.createServer((req,res)=>{
	if(req.url != "/favicon.ico"){
		let urlObj = url.parse(req.url,true);
		
		switch(urlObj.pathname){
			case "/api":
				ajaxHandle(req,res);break;
			default:
				fileHandle(req,res);
		}
	}
}).listen("8080","127.0.0.2",()=>{
	console.log("服务器开启成功")
});

let userMsg = [];

function ajaxHandle(req,res){
	let msg;
	let urlObj = url.parse(req.url,true);
	let str = "";
	req.on("data",(s)=>{
		str += s;
	})
	req.on("end",()=>{
		if(str){
			msg = querystring.parse(str);
		}else{
			msg = urlObj.query;
		}
		
		let obj;
		
		if(msg.type == "login"){
			let onoff = userMsg.some((val)=>{
				return val.user == msg.user && val.pass == msg.pass;
			});
			if(onoff){
				obj = {msg:"登录成功",code:0};
			}else{
				obj = {msg:"登录失败",code:1};
			}
		}else if(msg.type == "register"){
			let onoff = userMsg.some((val)=>{
				return val.user === msg.user;
			})
			if(onoff){
				obj = {msg:"用户重复",code:1};
			}else{
				userMsg.push({
					user:msg.user,
					pass:msg.pass
				})
				obj = {msg:"用户成功",code:0};
			}
		}
		res.write(JSON.stringify(obj));
		res.end();
	})
}


function fileHandle(req,res){
	let path = req.url == "/" ? "./root/index.html" : "./root"+req.url;
	fs.readFile(path,(err,data)=>{
		if(err){
			res.write("404");
		}else{
			res.write(data);
		}
		res.end()
	})
}


