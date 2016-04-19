define(function(require,exports,module){
    var ships=document.getElementsByClassName('ship');//获取html中的小船对象。
    function SHIP(powerType,energyType,orbit){//ship的构造函数。
        var bus=require("./main").bus;
        this.powerType=powerType;//引擎类型
        this.energyType=energyType;//能源系统类型
        this.orbit=orbit;//轨道编号
        this.power=100;//能量值，初始化为100%；
        this.degree=0;//旋转角度，初始化为0；
        this.life="alive";//生命状态，有alive和dead两种
        this.ship=ships[this.orbit-1];//对应的html小船对象
        this.origin_transform=getComputedStyle (ships[orbit-1],null)["transform"];//html小船对象的原始css中的transform属性
        this.state="stop";//飞船当前状态，有三种，fly，stop，destroy
        this.speed=(function(){
            //console.log(powerType=="ww");
            switch (powerType){
                case "前进号":
                    return 10;
                case "奔腾号":
                    return 20;
                case "超越号":
                    return 30;
            }//飞船速度
        })();
        this.powerLoss=(function(){
            switch (powerType){
                case "前进号":
                    return 30;
                case "奔腾号":
                    return 40;
                case "超越号":
                    return 60;
            }//飞船能量流失速度
        })();
        this.powerSupply=(function(){
            switch (energyType){
                case "劲量型":
                    return 10;
                case "光能型":
                    return 20;
                case "永久型":
                    return 30;
            }//飞船能量供应速度
        })();
        this.Adapter={};//飞船Adapter模块
        this.Adapter.ToBrain=require("./Adapter").ToBinary;
        this.Adapter.ToCommand=require("./Adapter").ToCommand;
        this.sendSignal=function(){
            var self=this;
            this.singInterval=setInterval(function(){
                require("./bus").prebus(bus,"shipstate",self.orbit-1,self.Adapter.ToBrain({
                "id":self.orbit,
                "command":self.state,
                "energy":self.power,
                }));
            },1000);
        };
        this.startSendSignal=this.sendSignal();//启动飞船信号发射模块
        this.reciveSignal=function(){
            var self=this;
            this.reciveSingInterval=setInterval(function(){
                var command=self.Adapter.ToCommand(bus.planetCommant[self.orbit-1]);
                bus.planetCommant[self.orbit-1]="";
                if(command.id){
                    self.state=command.command;
                }
                
            },1000);//飞船信号接受模块
        }
        this.startReciveCommand=this.reciveSignal();//启动飞船信号接受模块
        this.run=function(){
            var self=this;
            if(this.interval)
                clearInterval(this.interval);
            if(this.power>0){
                self.state="fly";
                this.interval=setInterval(function(){
                    if(self.state=="fly"){
                        if(self.power-self.powerLoss/30+ self.powerSupply/30>=0){
                            self.power=self.power-self.powerLoss/30+ self.powerSupply/30;
                           }
                        else {
                            self.state="stop";
                            self.power=0;
                            self.stop();
                        }
                        self.render();
                    }
                },30);
            }//飞船飞行函数
        }
        this.stop=function(){
            this.state="stop";
            if(this.interval)
                clearInterval(this.interval);
            var self=this;
            this.degree=this.degree%360;
            this.interval=setInterval(function(){
                if(self.power+self.powerSupply/30<=100){
                    self.power=self.power+self.powerSupply/30;
                }
                else{
                    self.power=100;
                    clearInterval(this.interval);
                }
                self.render();
            },30);//飞船停止函数
        }
        this.render=function(){
            var energy=ships[this.orbit-1].getElementsByClassName("energy")[0];
            energy.style.left=this.power-100 +"%";
            if(this.life=="alive"){
                if(this.state=="fly"){
                    this.degree=(this.degree+this.speed/(this.orbit*2));
                }
                ships[this.orbit-1].style["transform"]="rotate("+this.degree+"deg) "+this.origin_transform;
                return;
            }
            else{
                ships[this.orbit-1].style["transform"]=this.origin_transform;
                ships[this.orbit-1].style["display"]="";
                energy.style.left=0 +"%";
                return;
            }//飞船模型渲染函数
        }
        this.destroy=function(){
            var shipList=require("./main").shipList;
            this.state="destroy";
            this.life="dead";
            this.render();
            shipList[this.orbit-1]=undefined;
            clearInterval(this.interval);
            clearInterval(this.singInterval);
            clearInterval(this.stateInterval);
            clearInterval(this.reciveSingInterval);//飞船销毁函数
        }
        this.stateWatch=function(){
            var self=this;
            this.stateInterval=setInterval(function(){
                switch(self.state){
                case "fly":
                    self.run();
                    break;
                case "stop":
                    self.stop();
                    break;
                case "destroy":
                    self.destroy();
                    break;
                }
            },1000)//飞船状态监控函数
        }
        this.startStateWatch=this.stateWatch();//启动飞船状态监控函数
    }
    module.exports=SHIP;
});