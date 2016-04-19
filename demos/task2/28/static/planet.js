define(function(require,exports,module){//planet模块
	var shipList=require("./main").shipList;//调去main模块中的shipList
	function PLANET(){
		this.contral_center=require("./contral-center").center();//控制中心
		this.fire_center=require("./fireCenter").center();//发射中心
		this.DC=require("./DC").DC;//DC模块
		this.uptate=function(){//更新函数，用来接受bus中的信号，并以此更新DC数据
			var self=this;
			setInterval(function(){
				var bus=require("./main").bus;
				for(var i in self.DC){
					var Command=require("./Adapter").ToCommand(bus.shipstate[i]);
					if(shipList[i]){
						Command["energyType"]=shipList[i].energyType;
						Command["powerType"]=shipList[i].powerType;
						Command["state"]=shipList[i].state;
					}
					else{
						Command=undefined;
					}
					self.DC[i]=Command;
				}
				require("./screen").ship_screen(self.DC);//更新数据后，在大屏幕上显示飞船状态。
			},100);
		};
		this.startupdate=this.uptate();//启动更新函数。
	}
	module.exports.PLANET=PLANET;
	
})