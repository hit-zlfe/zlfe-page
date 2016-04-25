function Cask(selector,data) {
	this.data = data;
	this.container = selector;
	this.wholeWidth = document.documentElement.clientWidth ||
										document.body.width;
	this.curNum = 0;     //当前队列中图片的数量
	this.curArr = [];    //当前队列中的图片
	this.showNum = 0;     //已经展示的图片的数量
	this.rowMargin = 13;  //图片水平间距
}  

Cask.prototype = {
	constructor: Cask,
	init: function() {
		var container = $(this.container)
		container.style.width = this.wholeWidth+"px";
		this.getPhoto();
	},
	getPhoto: function() {
		for(var i=0;i<this.data.length;i++) {
			var this_img = new Image();
			this_img.src = this.data[i];
			var self = this;
			EventUtil.addHandler(this_img,"load",function() {
				self.afterLoad(this);
			});
		}
	},
	afterLoad: function(img) {
		this.curNum++;
		this.curArr.push(img);
		if(this.curNum > 1 && this.curNum < 6) {
			var ansHeight = this.calcuHeight();	
			if(ansHeight !== -1) {
				this.showPhoto(ansHeight);
				this.curNum = 0;
				this.curArr = [];
			}
		}
	},
	calcuHeight: function() {
		var sum = 0;
		for(var i=0;i<this.curArr.length;i++) {
			sum += this.curArr[i].width/this.curArr[i].height;
		}
		var ans = (this.wholeWidth-this.rowMargin*i)/sum;
		
		if(ans<300 && ans>200) {
			return Math.floor(ans);
		} else {
			return -1;
		}
	},
	showPhoto: function(height) {
		var imgFragment = document.createDocumentFragment();
		var contianer = $(this.container);
		for(var i=0;i<this.curNum;i++) {
			this.showNum++;
			var img = new Image();
			img.src = this.curArr[i].src;
			img.style.height = height+"px";
			addClass(img,"gallry-row");
			imgFragment.appendChild(img);
		}
		contianer.appendChild(imgFragment);
	}
}