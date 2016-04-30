(function(){//主函数，用来添加属性。
	window['BD']={
		BDevent:{
			addEvent:function(element,eventType,eventFunction){
				if(element.addEventListener){//DOM2级
					element.addEventListener(eventType,eventFunction,false);
				}
				else if(element.attachEvent){//兼容IE
					element.attachEvent("on"+eventType,eventFunction);
				}
				else{//DOM0级
					element["on"+eventType]=eventFunction;
				}
			},
			removeEvent:function(element,eventType,eventFunction){
				if(element.removeEventListener){//DOM2级
					element.removeEventListener(eventType,eventFunction,false);
				}
				else if(element.detachEvent){//兼容IE
					element.detachEvent("on"+eventType,eventFunction);
				}
				else{//DOM0级
					element["on"+eventType]=null;
				}
			},
			getEvent:function(event){
				return event?event:window.event;
			},//获取事件
			getTarget:function(event){
				return event.target?event.target:event.srcElement;
			},//获取事件触发对象
			preventDefault:function(event){
				event.preventDefault?event.preventDefault():event.returnValue=false;
			},//阻止默认事件
			stopBubble:function(event){
				event.stopPropagation?event.stopPropagation():event.cancelBubble=true;
			},//阻止事件冒泡
		}
	};//给window添加自己的命名空间
})()

function getByClass(oParent,sClass)
{
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];

	for(var i = 0;i < aEle.length;i++)
	{
		if(aEle[i].className == sClass)
		{
			aResult.push(aEle[i])
		}
	}
	return aResult;
}
function getStyle(obj,name) {
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}
function startMove(obj,json,fnFunction) {
	clearInterval(obj.timer);
	var bfinish=true;
	obj.timer=setInterval(function () {
		for(attr in json)
		{
			var cur=0;
		if(attr=='opacity')
		{
			cur=parseFloat(getStyle(obj,attr))*100;
		}
		else
		{
			cur=parseInt(getStyle(obj,attr));
		}
		var speed=(json[attr]-cur)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur!=json[attr])
		{
			bfinish=false;
		}
		if(bfinish)
		{
			clearInterval(obj.timer);
			if(fnFunction)
			{
				fnFunction();
			}
		}
		else
		{
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+cur+speed+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}

		}
		
	},30);
}

function Ajax (url,fnSucess,fnFaild) {
	//创建ajax对象
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}

	//连接服务器
	oAjax.open('get',url,true);

	//发送请求
	oAjax.send();

	//接受返回
	oAjax.onreadystatechange=function()
	{
		//浏览器和服务器交互到第几步？
		if(oAjax.readyState==4)//读取完成
		{
			if(oAjax.status==200)//读取成功
			{
				fnSucess(oAjax.responseText);
			}
			else
			{
				if(fnFaild)
				{
					fnFaild(oAjax.status);
				}	
			}
		}
	}

}
