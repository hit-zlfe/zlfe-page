window.onload = function() {
	var map = new boxMap();
	map.build();
	var move_box = new moveBox();
	move_box.init();

	var c_box = document.getElementById("textIn");
	var eBox = new editBox(c_box);
	eBox.init();

	var run_btn = document.getElementById("runBtn");     //运行按钮
	var num_ul = document.getElementById("num-wrap");    //数字标号外层div
	var num_list = num_ul.getElementsByTagName("p");     //数字标号
	var ins_list = ["go","tun lef","tun rig","tun bac","mov lef","mov lef",
	                "mov top","mov rig","mov bot"];
	var cur_ins = [];
	var err_flag = 0;    //指令错误标志
	EventUtil.addHandler(run_btn,"click",function(){
		var cur_content = c_box.value.split("\n");       //textArea中的指令
		for(var i=0;i<cur_content.length;i++) {
			var inx_ins = ins_list.indexOf(cur_content[i].toLowerCase());
			if(err_flag!=1 && inx_ins!==-1) {
				cur_ins.push(inx_ins);
			}  else {
				err_flag = 1;
				addClass(num_list[i],"errIns");
			}
		}
		if(err_flag === 0) {
			for(var i=0;i<cur_ins.length;i++) {
				switch(cur_ins[i]) {
					case 0: move_box.go();
							break;
					case 1: move_box.turnLeft();
							break;
					case 2: move_box.turnRight();
							break;
					case 3: move_box.turnBack();
							break;
				}
			}
		} else {
			err_flag = 0;
		}
	});
}

var boxMap = function() {
	this.num = 15;
	this.build = function() {
		var top_num = document.getElementById("top-num");
		var box_board = document.getElementById("box-board");
		var num_frag = document.createDocumentFragment();
		var board_frag = document.createDocumentFragment();
		for(var i=0;i<this.num;i++) {
			var oNum = document.createElement("span");
			oNum.innerHTML = i+1;
			addClass(oNum,"small-box");
			num_frag.appendChild(oNum);
			for(var j=0;j<(this.num+1);j++) {
				var oBoard = document.createElement("span");
				addClass(oBoard,"small-box");
				if(j%(this.num+1) === 0) { //最左边的数字列
					oBoard.innerHTML = i+1;
					addClass(oBoard,"left-num");
				} else {
					if((i+1) === this.num) {  //最下边的格子
						oBoard.style.borderBottom = "1px solid #e6e6e6";
					}
					addClass(oBoard,"small-board");
				}
				
				if((j+1)%(this.num+1) === 0) { //最右边的格子
					oBoard.style.borderRight = "1px solid #e6e6e6";
				} 
				board_frag.appendChild(oBoard);
			}
		}
		top_num.appendChild(num_frag);
		box_board.appendChild(board_frag);
	}
}

var moveBox = function() {
	this.oBox = document.getElementById("move-box");
	this.oBox_left = 41;    //box的left值
	this.oBox_top = 1;      //box的top值
	this.rot_deg = 0;       //box的rotate角度
	this.step = 40;         //box移动时的步进值
	this.head = 1;          //box的头部.1表示向右，2向下，依次顺时针
	this.init = function() {
		this.oBox.style.left = "41px";
		this.oBox.style.top = "1px";
	}
	this.turnRight = function() {
		this.rot_deg += 90;
		if(this.head === 4) {
			this.head = 1;
		} else {
			this.head++;
		}
		this.oBox.style.transform = "rotate("+
			              this.rot_deg+"deg)";
	}
	this.turnLeft = function() {
		this.rot_deg -= 90;
		if(this.head === 1) {
			this.head = 4;
		} else {
			this.head--;
		}
		this.oBox.style.transform = "rotate("+
			              this.rot_deg+"deg)";
	}
	this.turnBack = function() {
		this.rot_deg += 180;
		if(this.head>2) {
			this.head -= 2;
		} else {
			this.head += 2;
		}
		this.oBox.style.transform = "rotate("+
			              this.rot_deg+"deg)";
	}
	this.go = function() {
		switch(this.head) {
			case 1: this.oBox_left += this.step;
					this.oBox.style.left = this.oBox_left+"px";
					break;
			case 2: this.oBox_top += this.step;
					this.oBox.style.top = this.oBox_top+"px";
					break;
			case 3: this.oBox_left -= this.step;
					this.oBox.style.left = this.oBox_left+"px";
					break;
			case 4: this.oBox_top -= this.step;
					this.oBox.style.top = this.oBox_top+"px";
					break;
		}
	}
}

var editBox = function(box) {
	this.box = box;
	this.num = box.value.split("\n").length;
	this.init = function() {
		var newLine = this.newLine;
		var delLine = this.delLine;
		var box = this.box;
		var this_num = this.num;
		
		EventUtil.addHandler(this.box,"keyup",function(ev) {
			ev = EventUtil.getEvent(ev);
			var bValue = box.value.split("\n");
			if(ev.keyCode === 13 ) {
				this_num++;
				newLine(this_num);
			} else if(ev.keyCode === 8 && bValue.length < this_num) {
				console.log(bValue);
				this_num--;
				delLine(this_num);
			}	
		});
	}
	this.newLine = function(num) {
		var numWrap = document.getElementById("num-wrap");
		var numP = document.createElement("p");
		numP.className = "text-num edit-text";
		numP.innerHTML = num;
		numWrap.appendChild(numP);
	} 
	this.delLine = function(num) {
		var numWrap = document.getElementById("num-wrap");
		var numP_list = numWrap.getElementsByTagName("p");
		var numP_length = numP_list.length;
		while(num < numP_length) {
			numP_length--;
			numWrap.removeChild(numP_list[numP_length]);
		}
	}
}