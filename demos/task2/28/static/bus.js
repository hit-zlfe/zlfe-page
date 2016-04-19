define(function(require,exports,module){
	function BUS(){//bus系统的构造函数
		this.shipstate=["","","",""];//用来存储飞船发射的状态信号
		this.planetCommant=["","","",""];//用来存储planet发射的指令信号
	}
	function prebus(bus,TYPE,ORDER,VALUE){//bus的加载函数，将数据加载到bus中并在日志中打印
		var interval=setInterval(function(){
			var num=Math.random();
			if(num>0.10){//用随机数模拟10%的失败率，如果成功，就清除计时器，如果失败，计时器会再次发送信号。
				bus[TYPE][parseInt(ORDER)]=VALUE;
				clearInterval(interval);
				if(TYPE=="shipstate")
					console.log("%c %s# ship send state success","background:lightgreen;font-size:16px;",ORDER+1);
				else
					console.log("%c planet send command success","background:lightgreen;font-size:16px;");
			}
			else{
				if(TYPE=="shipstate")
					console.log("%c %s# ship send state faild","background:red;font-size:16px;",ORDER+1);
				else
					console.log("%c planet send command faild","background:red;font-size:16px;");
			
			}
		},300);
	}
	module.exports.BUS=BUS;
	module.exports.prebus=prebus;
})