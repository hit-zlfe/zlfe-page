##1.5整体页面布局

---
####结构

整个页面布局分为header、article、aside、footer四个部分，按照学院要求，这个页面要 ** 每人完成一个部分 ** 。

请自己选择想要完成的部分，添加对应的css，并在readme的签到区中注明。

---

#####签到区

 > header：刘彬德
 > aside： 张晶尧
 > footer：赵吟斌
 > article：周巧妍
 
---
####问题

1. 图片部分.picture-block中加上float:left后，最后一部分的文字标题会窜上去，不加，又会横向发展。求解决方法！

> 回复：float会让元素脱离文档流，成为独立的一部分，所以所属的article高度会塌缩（详细的请看尧帝的作业三、四）。
要解决不在一行显示的问题，只需要在.picture-block中添加一句display：inline-block；即可。因为section是块级元素（block），默认就是一行一列排列，改为inline后就可以在同一行排列了。（去看看css中关于block和inline的区别。）
2. 将section放在了article的外面了。书上说section强调分块，article强调独立性。如果觉得有问题。可以再改。
