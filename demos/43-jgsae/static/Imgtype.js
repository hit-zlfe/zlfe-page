define(function(require,exports,module){
	function imgType(img,areaW,areaH){//判断图片是由高度决定的还是宽度决定的
		//console.log(img,img.width);
		var H=img.height/(areaH);
		var W=img.width/(areaW);
		//console.log(W,H);
		return H<W?"height":"width";
	}
	module.exports.imgType=imgType;
});