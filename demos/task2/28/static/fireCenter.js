define(function(require,exports,module){//发射中心
  function fire_center(){
        var ships=document.getElementsByClassName('ship');
        var SHIP=require("./ship");//获取ship构造函数
        var shipList=require("./main").shipList;
        var fireCenter=document.getElementById("fire-center");
        var fireButton=document.getElementById("creat-ship");
        var ship=null,orbit;

        fireButton.onclick=function(){
            orbit=document.getElementById('orbit-select').value-1;
            var power_sys=document.getElementById('power-sys').value;
            var energy_sys=document.getElementById('energy-sys').value;

            if(ships[orbit].style.display!="block"){//如果没有发射，就新建ship，发射飞船
                ships[orbit].style.display="block";
                ship=new SHIP(power_sys,energy_sys,orbit+1);
                shipList[orbit]=ship;
            }
            else{
                alert("发射le!");
                ship=null;
            }
        }
      }
    module.exports.center=fire_center;
});