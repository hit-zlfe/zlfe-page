define(function(require,exports,module){
	function ToBinary(command){//将指令转化为2进制
	/**
	*command的格式：
	*{
	*	id:3
	*	command:"fly"
	*   enetgy:98;
	*}
	***/
		var binaryShip=[0,0,0,0];/**飞船编号
		                          **1000 0100 0010 0001
		                          **1号   2号   3号  4号
		                          **/
		var binaryState=[0,0,0,0];/**飞船状态
		                          **1000  0100    0010    0001
		                          **fly   stop   destroy  保留状态，尚未使用
		                          **/
		var binaryEnergy,binaryEnergyFirst,binaryEnergyLast;
		/**
		**binaryEnergy:能量剩余量的二进制表示
		**binaryEnergyFirst：能量剩余量十位的二进制表示
		**binaryEnergyLast：能量剩余量个位的二进制表示
		**/

		binaryShip[parseInt(command.id)-1]=1;//编码飞船编号
		switch(command.command){//编码飞船状态；
			case "fly":
				binaryState[0]=1;
				break;
			case "stop":
				binaryState[1]=1;
				break;
			case "destroy":
				binaryState[2]=1;
				break;
		}
		var energyFirst,energyLast;//飞船能量十进制的个位和十位
		energyFirst=parseInt(parseInt(command.energy)/10);
		energyLast=parseInt(command.energy)-energyFirst*10;

		var firstOrigin=(energyFirst).toString(2);
		var flength=firstOrigin.length;
		if(flength!=4){
			for(var i=0;i<4-flength;i++){
				firstOrigin="0"+firstOrigin;
			}
		}
		var lastOrigin=(energyLast).toString(2);
		var llength=lastOrigin.length;
		
		if(llength!=4){//变为二进制后补足位数，如3->11->0011
			for(var i=0;i<4-llength;i++){
				lastOrigin="0"+lastOrigin;
			}
		}
		binaryEnergyFirst=firstOrigin;
		binaryEnergyLast=lastOrigin;
		binaryEnergy=binaryEnergyFirst+binaryEnergyLast;
		var Binary=binaryShip.join("")+binaryState.join("")+binaryEnergy;//整合二进制指令
		return Binary;

	}
	function ToCommand(binary){
	/**
	*binary的格式：
	*  string类型
	*	id:1000 0100 0010 0001
	*	command: 1000 0100 0010
	*   enetgy:0000 0000           0000 0001 0010 0011 0100 0101 0110 0111 1000 1001
	*                               0    1    2   3     4    5    6    7    8    9    
	***/
		var bId=binary.slice(0,4);
		var bCommand=binary.slice(4,8);
		var bEnergyFirst=binary.slice(8,12);
		var bEnergyLast=binary.slice(12,16);

		var id,command,energyFirst,energyLast;
		//console.log(binary,bEnergyFirst,bEnergyLast)
		switch(bId){
			case "1000":
				id=1;
				break;
			case "0100":
				id=2;
				break;
			case "0010":
				id=3;
				break;
			case "0001":
				id=4;
				break;
		}
		switch(bCommand){
			case "1000":
				command="fly";
				break;
			case "0100":
				command="stop";
				break;
			case "0010":
				command="destroy";
				break;
		}
		switch(bEnergyFirst){
			case "0000":
				energyFirst="0";
				break;
			case "0001":
				energyFirst="1";
				break;
			case "0010":
				energyFirst="2";
				break;
			case "0011":
				energyFirst="3";
				break;
			case "0100":
				energyFirst="4";
				break;
			case "0101":
				energyFirst="5";
				break;
			case "0110":
				energyFirst="6";
				break;
			case "0111":
				energyFirst="7";
				break;
			case "1000":
				energyFirst="8";
				break;
			case "1001":
				energyFirst="9";
				break;
			case "1010":
				energyFirst="10";
				break;
		}
		switch(bEnergyLast){
			case "0000":
				energyLast="0";
				break;
			case "0001":
				energyLast="1";
				break;
			case "0010":
				energyLast="2";
				break;
			case "0011":
				energyLast="3";
				break;
			case "0100":
				energyLast="4";
				break;
			case "0101":
				energyLast="5";
				break;
			case "0110":
				energyLast="6";
				break;
			case "0111":
				energyLast="7";
				break;
			case "1000":
				energyLast="8";
				break;
			case "1001":
				energyLast="9";
				break;
		}
		var Command={
			"id":id,
			"command":command,
			"energy":(energyFirst+energyLast)
		}
		return Command;
	}
	module.exports.ToBinary=ToBinary;
	module.exports.ToCommand=ToCommand;
})
