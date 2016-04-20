window.onload = function(){
	var st = document.getElementById('form');
	//自定义一个获取含类某名元素的方法
	function getByClass(className) {
		return document.getElementsByClassName(className);
	}
	//汉字占两个字节--处理长度的函数
	function getLength(val) {
		var cnCode = val.match(/[\u4E00-\u9FA5]/g) || [];
		//alert(cnCode);cnCode match返回中文的数组
		return (val.length + cnCode.length);
	}
	//得到输入
	function getValue(){
		var nameItem = document.getElementById('name');
		var value = nameItem.value;
		return value;
	}
	function init(){
		st.addEventListener('submit',function(evt) {

		evt.preventDefault();
		var nameItem = document.getElementById('name');
		
		var misItem  = document.getElementById('mistake');
		var maxLength = 16;
		var minLength = 4;
		var value = getValue();
		if (value === null || value.length === 0) {
			misItem.textContent = "姓名不能为空";
			nameItem.style.borderColor = "red";
			misItem.style.color="red";
			return false;
		}
		var len = getLength(value);
		if (len < minLength || len > maxLength) {
			misItem.textContent = "长度应为4~16个字符";
			nameItem.style.borderColor = "red";
			misItem.style.color="red";
		}else{
			nameItem.style.borderColor = "green";
			misItem.textContent = "格式正确";
			nameItem.style.borderColor = "green";
			misItem.style.color="green";
		}
		}, false);
	}
	init();
		
}	
/*
 为什么我把addeventlistener的回调函数拆除去单独写，执行时可以执行
 但是执行完页面刷新了。
 局部变量被删了么？？
 设置成全局变量也不行。。。
 
 		var nameItem = document.getElementById('name');
		var misItem  = document.getElementById('mistake');
		var maxLength = 16;
		var minLength = 4;
		
 function callback(){
		evt.preventDefault();

		if (value === null || value.length === 0) {
			misItem.textContent = "姓名不能为空";
			nameItem.style.borderColor = "red";
			misItem.style.color="red";
			return false;
		}
		var value = getValue();
		var len = getLength(value);
		if (len < minLength || len > maxLength) {
			misItem.textContent = "长度应为4~16个字符";
			nameItem.style.borderColor = "red";
			misItem.style.color="red";
		}else{
			nameItem.style.borderColor = "green";
			misItem.textContent = "格式正确";
			nameItem.style.borderColor = "green";
			misItem.style.color="green";
		}
 }
 function init(){
		st.addEventListener('submit',callback, false);
	}
*/