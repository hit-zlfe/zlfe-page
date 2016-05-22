function Cask(selector,data) {
	this.data = data;
	this.container = selector;
	this.wholeWidth = document.documentElement.clientWidth ||
										document.body.width;
	this.curNum = 0;     //当前队列中图片的数量
	this.curArr = [];    //当前队列中的图片
	this.showNum = 0;     //已经展示的图片的数量
	this.rowMargin = 9;   //图片水平间距
	this.lineMinNum = 2;  //每行最少图片数量
	this.lineMaxNum = 5;   //每行最多图片数量
	this.photoMinHeight = 200;  //图片最小高度
	this.photoMaxHeight = 300;  //图片最大高度
	this.firstScreen = 15;   //首屏图片数量
	this.end = 0;            //当前图片展示终止位置
}  

Cask.prototype = {
	constructor: Cask,
	init: function() {
		console.log(this.data.length);
		var container = $(this.container)
		container.style.width = this.wholeWidth+"px";
		this.getPhoto(this.firstScreen);
	},
	getPhoto: function(num) {
		if(this.data.length!==this.end && this.curNum !== 0) {
			this.delPhoto();
		}
		var photoNum = (num<this.data.length-this.showNum) ? num:this.data.length-this.showNum;
		this.end = this.showNum + photoNum;
		var index = this.showNum;
		var self = this;
		for(var i=0;i<photoNum;i++) {
			var this_img = new Image();
			this_img.src = this.data[index];
			EventUtil.addHandler(this_img,"load",function() {
				self.afterLoad(this);
			});
			index++;
		}
	},
	afterLoad: function(img) {
		this.curNum++;
		this.curArr.push(img);
		if(this.curNum >= this.lineMinNum && this.curNum <= this.lineMaxNum) {
			var ansHeight = this.calcuHeight();	
			if(ansHeight!==-1) {
				this.showPhoto(ansHeight);
				this.curNum = 0;
				this.curArr = [];
			} else if(this.showNum+this.curNum===this.end) {
				ansHeight = this.calcuHeight(true);
				this.showPhoto(ansHeight);
			}
		} else if(this.showNum+this.curNum===this.end) {
			ansHeight = this.calcuHeight(true);
			this.showPhoto(ansHeight);
		}
	},
	calcuHeight: function() {
		var sum = 0;
		for(var i=0;i<this.curArr.length;i++) {
			sum += this.curArr[i].width/this.curArr[i].height;
		}
		var ans = (this.wholeWidth-this.rowMargin*i)/sum;
		if(ans<this.photoMaxHeight && ans>this.photoMinHeight || this.curNum === this.lineMaxNum) {
			return Math.floor(ans);
		}else if(arguments[0]) {
			return this.photoMaxHeight;
		} else {
			return -1;
		}
	},
	showPhoto: function(height) {
		var imgFragment = document.createDocumentFragment();
		var container = $(this.container);
		for(var i=0;i<this.curNum;i++) {
			this.showNum++;
			var img = new Image();
			img.src = this.curArr[i].src;
			img.style.height = height+"px";
			addClass(img,"gallry-row");
			imgFragment.appendChild(img);
		}
		container.appendChild(imgFragment);
	},
	delPhoto: function() {
		container = $(this.container);
		for(var i=0;i<this.curNum;i++) {
			container.removeChild(container.lastElementChild);
			this.showNum--;
			this.curArr.pop();
		}
		this.curNum=0;
	}
}