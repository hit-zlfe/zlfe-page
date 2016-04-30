define(function(require,exports,module){
	function preloadImage(url,callback) { 
		var img = new Image(); //创建一个Image对象，实现图片的预下载 
		img.src = url; 
		if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
			return img; // 直接返回，不用再处理onload事件 
		}
		if(callback){
			img.onload=callback;
		}
		return img;
	};
	module.exports.preloadImage=preloadImage;

});