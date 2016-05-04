function pullDown(num,oCask) {
	this.cask = oCask;
	this.num = num;
	this.scrollTop = 0;
}

pullDown.prototype = {
	constructor: pullDown,
	init: function() {
		self = this;
		EventUtil.addHandler(document,"scroll",function() {
			if(self.check() && self.cask.data.length !== self.cask.end) {
				self.cask.getPhoto(self.num);
				document.documentElement.scrollTop = self.scrollTop;
			}
		});
	},
	check: function() {
		//滚动条的距离
		var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
		this.scrollTop = oScroll;
		//页面高度
		var oHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
		//可视区的高度
		var vHeight = document.documentElement.clientHeight || document.body.clientHeight;

		return (Math.ceil(oScroll) + vHeight >= oHeight) ? true:false
	}
}