# task1_3_try  by:yaoleo

###需要队伍logo与介绍，成员logo
####虽然任务只要求实现，但还是把知道的常用方法实现一下，果然很多的坑
####demo1 absolute
	尚未解决高度塌陷问题，目测不能解决了。。。
####demo2 float
	基本ok
####demo3 inline-block
	基本ok
####demo4 flex
	基本ok
####浏览器兼容性测试
	ie11，firefox，chrome


#####笔记：
三列布局的实现方式
1.absolute
    q1：position：absolute的元素，不设置left，top等位置的时候，初始位置应该在哪里？
    简单理解相对父元素非static明显有问题啊。。。
    q2: 三列布局，绝对定位的方式为什么要把中间的部分放到末尾，也就是在html中，center的部分要写在left，right后面！！！
    q3：都知道absolute布局，会脱离文档流高度塌陷，那么有没有办法让它撑开父元素的高度呢？ 为什么float可以撑开？
         https://segmentfault.com/q/1010000000686154
2.float
    q1：清除浮动最好的方法？
3.inline-block:
    q1: 每列必须有宽度，不适合自适应布局？
    q2：自动换行
    q3: width: 100%;
    q4: 清除空格间隙
4.flex:
    q1:flex：1和flex：auto
http://ued.taobao.org/blog/2012/08/inline-block/

	