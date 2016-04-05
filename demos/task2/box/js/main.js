window.onload = function() {
	var box = new boxMap();
	box.build();
	var move_box = new moveBox();
	move_box.init();
	move_box.go();
	setTimeout(function() {
		move_box.turnRight();
	},1000);
	setTimeout(function() {
		move_box.go();
	},2000);
	setTimeout(function() {
		move_box.turnBack();
	},3000);
	setTimeout(function() {
		move_box.go();
	},4000);
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
				if(j%(this.num+1) === 0) {
					oBoard.innerHTML = i+1;
					addClass(oBoard,"left-num");
				} else {
					addClass(oBoard,"small-board");
				}
				
				if((j+1)%(this.num+1) === 0) {
					oBoard.style.borderRight = "1px solid #e6e6e6";
				}
				if((i+1) === this.num) {
					oBoard.style.borderBottom = "1px solid #e6e6e6";
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
