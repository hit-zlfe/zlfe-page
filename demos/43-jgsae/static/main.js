define(function(require,exports,module){
	require("./addClass");
	var preloadImage=require("./imgLoad").preloadImage;//预加载函数
	var imgType=require("./Imgtype").imgType;//图片类型判断函数
	var JGSAW=require("./jgsaw").jgsaw;//加载jgsaw的构造函数
	var boxWidth=parseInt(require("./config").jgsawWidth);
	var boxHeight=parseInt(require("./config").jgsawHeight);

	var jgsaw=document.getElementsByClassName("jgsaw");
	for(var i in jgsaw){ 
		if(jgsaw[i].tagName=="DIV"){
			var Class = jgsaw[i].getAttribute("class") || jgsaw[i].getAttribute("className");
			if(Class.indexOf("jgsaw-1")!=-1){//1
				jgsaw[i].style.width=boxWidth+"px";
				jgsaw[i].style.height=boxHeight+"px";
				var urls=require("./config").imgsUrl_1
				for(var j=0;j<urls.length;j++){
					var img=new JGSAW(urls[j],1,j+1,jgsaw[i]);
				}
			}
			if(Class.indexOf("jgsaw-2")!=-1){//2
				//2中ff的裁剪要用到svg，所以在这里要改变svg的数据。
				jgsaw[i].style.width=boxWidth+"px";
				jgsaw[i].style.height=boxHeight+"px";
				var urls=require("./config").imgsUrl_2
				for(var j=0;j<urls.length;j++){
					var img=new JGSAW(urls[j],2,j+1,jgsaw[i]);
				}
			}
			if(Class.indexOf("jgsaw-3")!=-1){//3
				jgsaw[i].style.width=boxWidth+"px";
				jgsaw[i].style.height=boxHeight+"px";
				/**3张图片由于有正方形，所以不能用纯粹的css来解决**/
				var urls=require("./config").imgsUrl_3
				for(var j=0;j<urls.length;j++){
					var img=new JGSAW(urls[j],3,j+1,jgsaw[i]);
				}
			}
			if(Class.indexOf("jgsaw-4")!=-1){//4
				jgsaw[i].style.width=boxWidth+"px";
				jgsaw[i].style.height=boxHeight+"px";
				var urls=require("./config").imgsUrl_4
				for(var j=0;j<urls.length;j++){
					var img=new JGSAW(urls[j],4,j+1,jgsaw[i]);
				}
			}
			if(Class.indexOf("jgsaw-5")!=-1){//5
				/**5张图片由于有正方形，所以不能用纯粹的css来解决**/
				jgsaw[i].style.width=boxWidth+"px";
				jgsaw[i].style.height=boxHeight+"px";
				var urls=require("./config").imgsUrl_5
				for(var j=0;j<urls.length;j++){
					var img=new JGSAW(urls[j],5,j+1,jgsaw[i]);
				}
			}
			if(Class.indexOf("jgsaw-6")!=-1){//6
				jgsaw[i].style.width=boxWidth+"px";
				jgsaw[i].style.height=boxHeight+"px";
				var urls=require("./config").imgsUrl_6
				for(var j=0;j<urls.length;j++){
					var img=new JGSAW(urls[j],6,j+1,jgsaw[i]);
				}
			}

		}
	}
	window.onload=function(){//这里用于在最后更新内嵌的svg
		var jg_2=document.getElementsByClassName("jgsaw-2");
		if(jg_2){
			var clip1=document.getElementById('clip1');
			var currWidth=document.getElementsByClassName("jgsaw-2")[0].getElementsByTagName("img")[0].width;
			clip1.innerHTML="<polygon points=\"0 0,"+boxWidth*0.6666/currWidth+" 0,"+boxWidth*0.3334/currWidth+" 1,0 1\">";
			var clip2=document.getElementById('clip2');
			var currWidth=document.getElementsByClassName("jgsaw-2")[0].getElementsByTagName("img")[1].width;
			clip2.innerHTML="<polygon points=\""+boxWidth*0.6666/currWidth+" 0,1 0,1 1,"+boxWidth*0.3334/currWidth+" 1\">";
		}
		var shadow=document.getElementsByClassName("shadow")[0];
		var jgsaw_wall=document.getElementsByClassName("jgsaw");
			document.onclick=function(ev){
				var ev=ev||window.ev;
				var target=ev.target;
				if(target.tagName.toString().toUpperCase()=="IMG"&&target.parentNode.className.indexOf("jgsaw")>-1){
					var img =document.createElement("img");
					img.src=target.src;
					shadow.appendChild(img);				
					shadow.style.display="block";
				}
				else{
					shadow.innerHTML="";
					shadow.style.display="";
				}
			}
							
	}
})