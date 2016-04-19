
define(function(require,exports,module){
    alert("指令系统请按F12在console中查看~");
    var BUS=require("./bus").BUS;//bus系统的构造函数
    bus=new BUS();//构造bus系统用来发送信号
    var ships=document.getElementsByClassName('ship');//获得小船的html对象
    var shipList=[];//存储小船实例
    module.exports={//定义main.js模块的接口
        shipList:shipList,
        bus:bus
    }
    var PLANET=require("./planet").PLANET;//planet模型的构造函数
    var planet= new PLANET;//构造planet模型
});