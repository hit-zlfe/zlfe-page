 define(function(require,exports,module){
 	function contral_center(){
 		/**有一个bug，如果不点击发射，先给指令，会有错误产生
 		**但个人认为不是bug，如果飞船没有发射，在控制中心发送指令，照样会传送到DC中去，逻辑上没有问题。
 		**/
 		var shipList=require("./main").shipList;//获取已经发射的飞船列表

	 	var run1=document.getElementById('run1');//以下为控制按钮
	    var stop1=document.getElementById('stop1');
	    var run2=document.getElementById('run2');
	    var stop2=document.getElementById('stop2');
	    var run3=document.getElementById('run3');
	    var stop3=document.getElementById('stop3');
	    var run4=document.getElementById('run4');
	    var stop4=document.getElementById('stop4');

	    var contral_ship=document.getElementById('ship-contral');
	    contral_ship.onclick=function speace_contral(ev){//控制中心事件委托
	        var ev=ev||window.ev;
	        if(ev.target.tagName=="BUTTON"){
	        	var buttonList=document.getElementsByClassName('ship-contral');
	        	var command={};//command用来生成指令。
	        	for(var i in buttonList){
	        		if(buttonList[i]===ev.target.parentNode){
	        			command['id']=i-0+1;
	        			command["command"]=ev.target.className;
	        			command["energy"]=100;
	        			var bus=require("./main").bus;//这里调用bus，并通过prebus将指令传送到bus系统中，传送时使用了Adapter模块对command进行二进制转换
	        			require("./bus").prebus(bus,"planetCommant",command['id']-1,require("./Adapter").ToBinary(command));
	        		}
	        	}

	        }
	    }
 	}
 	module.exports.center=contral_center;
 })