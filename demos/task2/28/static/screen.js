define(function(require,exports,module){
	var ship_tbody=document.getElementById("ship-tbody");//获取tbody，用来做为planet的大屏幕，根据DC中的数据实时更新飞船状态
	function ship_screen(commands){//commands是planet中的DC
		for(var i in commands){
			if(commands[i]!=undefined&&commands[i].id!=undefined){
				var tds=document.getElementsByTagName("td");
				for(var j in tds){//这里先删除已经存在的节点，再添加新的节点。
					if(tds[j].textContent==commands[i].id.toString()){
						tds[j].parentNode.parentNode.removeChild(tds[j].parentNode);
					}
				}
				//添加节点
				var tr=document.createElement('tr');
				var tid=document.createElement('td');
				var tpowerType=document.createElement('td');
				var tenergyType=document.createElement('td');
				var tstate=document.createElement('td');
				var tenergy=document.createElement('td');
				tid.textContent=commands[i].id;
				tpowerType.textContent=commands[i].powerType;
				tenergyType.textContent=commands[i].energyType;
				tstate.textContent=commands[i].state;
				tenergy.textContent=commands[i].energy;
				tr.appendChild(tid);
				tr.appendChild(tpowerType);
				tr.appendChild(tenergyType);
				tr.appendChild(tstate);
				tr.appendChild(tenergy);
				ship_tbody.appendChild(tr);
			}
			else if(commands[i]==undefined){//如果DC中的数据为空，即为ship被销毁或者尚未发射，应该从大屏幕上删除对应飞船的信息。
				var tds=document.getElementsByTagName("td");
				for(var j in tds){
					if(tds[j].textContent==(parseInt(i)+1).toString()){
						tds[j].parentNode.parentNode.removeChild(tds[j].parentNode);
					}
				}
			}
		}
	}
	module.exports.ship_screen=ship_screen;
})