说要尝试不同的position
实际上需要理解的只有：fixed absolute relative static

###水平垂直居中：
	demo1: absolute/fixed
		.center {
			position: absolute/fixed;
			left: 50%;
			top: 50%;
			margin-left: -200px;
			margin-top: -100px;
		}
	区别是一个相对外层非static的block一个相对于浏览器窗口
	缺点是垂直居中的定位是给定的margin负值，不能自适应高度
	demo3:relative/static
		.center {
			position: relative/static;
			margin: auto;
			top: 50%;
			margin-top: -100px;
		}
	demo3: display:flex
	很容易实现但是它外层容器高度必须是浏览器高度才能垂直居中实现效果
	不适合该题目啊。。。因为现在外层容器是body。
	body的position设置为absolute，height：100%才有用。估计还有兼容问题。。。

	demo4： css3
	CSS3的transform和flex固然好用，但在项目的实际运用中必须考虑兼容问题，大量的hack代码可能会导致得不偿失。
	某些浏览器仍需使用前缀写法(不考虑太多，问题其实不大)

####半圆定位
	demo1 absolute
		可以适应灰色区域的改变

	demo2 relative
		缺点是灰色区域必须定宽，定高。。。
	