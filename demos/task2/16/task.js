/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 判断数据是否合理
 */
function isPlace(city){
    var re = /^[\u4E00-\u9FA5a-zA-Z]+$/;//中引文re

    return re.test(city);
}
function isNum(num){
    var re = /^[0-9]+(?!\.)$/;//数字re

    return re.test(num);
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input');
    var num = document.getElementById('aqi-value-input');
    if(isPlace(city.value)){
        if(isNum(num.value)){
            aqiData[city.value]=num.value;
        }
        else{
            alert("空气质量必须是一个正数！");
        }
    }
    else{
        alert("城市名只能是中文或者英文字母！");
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    var table=document.getElementById('aqi-table');
    var thead=document.createElement("thead");//添加表头
    var thead_tr = document.createElement("tr");
    for (var i = 0;i<3;i++){
        thead_tr.appendChild(document.createElement("td"));
    }
    thead_tr.childNodes[0].textContent="城市";
    thead_tr.childNodes[1].textContent="空气质量";
    thead_tr.childNodes[2].textContent="操作";
    thead.appendChild(thead_tr);

    var tbody = document.createElement("tbody");//添加tbody
    for(city in aqiData){
        var tr = document.createElement("tr");
        for (var i = 0;i<3;i++){
            tr.appendChild(document.createElement("td"));
        }
        tr.childNodes[0].textContent=city;
        tr.childNodes[1].textContent=aqiData[city];
        tr.childNodes[2].innerHTML="<button>删除</button>";
        tbody.insertBefore(tr,tbody.childNodes[0]);//最前插入
    }
    table.replaceChild(thead,table.childNodes[0]);//表头不变
    table.replaceChild(tbody,table.childNodes[1]);//更新tbody

}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var key =target.parentNode.previousSibling.previousSibling.childNodes[0].textContent;
    delete aqiData[key];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    window.onload=function(){
        var add_btn=document.getElementById('add-btn');
        add_btn.onclick = function (){
            addBtnHandle();//添加记录
        }
        var table=document.getElementById('aqi-table');
        table.onclick=function(event){//事件委托添加点击事件
            var event = event||window.event;
            var target = event.target||event.srcElement;
            if(target.nodeName=="BUTTON"){
                delBtnHandle(target);
            }
        };
    }

}

init();