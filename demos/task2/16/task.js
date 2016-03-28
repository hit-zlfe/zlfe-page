/**
 * aqiData£¬´æ´¢ÓÃ»§ÊäÈëµÄ¿ÕÆøÖ¸ÊýÊý¾Ý
 * Ê¾Àý¸ñÊ½£º
 * aqiData = {
 *    "±±¾©": 90,
 *    "ÉÏº£": 40
 * };
 */
var aqiData = {};

/**
 * ÅÐ¶ÏÊý¾ÝÊÇ·ñºÏÀí
 */
function isPlace(city){
    var re = /^[\u4E00-\u9FA5a-zA-Z]+$/;//ÖÐÒýÎÄre

    return re.test(city);
}
function isNum(num){
    var re = /^[0-9]+(?!\.)$/;//Êý×Öre

    return re.test(num);
}

/**
 * ´ÓÓÃ»§ÊäÈëÖÐ»ñÈ¡Êý¾Ý£¬ÏòaqiDataÖÐÔö¼ÓÒ»ÌõÊý¾Ý
 * È»ºóäÖÈ¾aqi-listÁÐ±í£¬Ôö¼ÓÐÂÔöµÄÊý¾Ý
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input');
    var num = document.getElementById('aqi-value-input');
    if(isPlace(city.value)){
        if(isNum(num.value)){
            aqiData[city.value]=num.value;
        }
        else{
            alert("¿ÕÆøÖÊÁ¿±ØÐëÊÇÒ»¸öÕýÊý£¡");
        }
    }
    else{
        alert("³ÇÊÐÃûÖ»ÄÜÊÇÖÐÎÄ»òÕßÓ¢ÎÄ×ÖÄ¸£¡");
    }
}

/**
 * äÖÈ¾aqi-table±í¸ñ
 */
function renderAqiList() {

    var table=document.getElementById('aqi-table');
    var thead=document.createElement("thead");//Ìí¼Ó±íÍ·
    var thead_tr = document.createElement("tr");
    for (var i = 0;i<3;i++){
        thead_tr.appendChild(document.createElement("td"));
    }
    thead_tr.childNodes[0].textContent="城市";
    thead_tr.childNodes[1].textContent="空气质量";
    thead_tr.childNodes[2].textContent="操作";
    thead.appendChild(thead_tr);

    var tbody = document.createElement("tbody");//Ìí¼Ótbody
    for(city in aqiData){
        var tr = document.createElement("tr");
        for (var i = 0;i<3;i++){
            tr.appendChild(document.createElement("td"));
        }
        tr.childNodes[0].textContent=city;
        tr.childNodes[1].textContent=aqiData[city];
        tr.childNodes[2].innerHTML="<button>删除</button>";
        tbody.insertBefore(tr,tbody.childNodes[0]);//×îÇ°²åÈë
    }
    table.replaceChild(thead,table.childNodes[0]);//±íÍ·²»±ä
    table.replaceChild(tbody,table.childNodes[1]);//¸üÐÂtbody

}


/**
 * µã»÷add-btnÊ±µÄ´¦ÀíÂß¼­
 * »ñÈ¡ÓÃ»§ÊäÈë£¬¸üÐÂÊý¾Ý£¬²¢½øÐÐÒ³Ãæ³ÊÏÖµÄ¸üÐÂ
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * µã»÷¸÷¸öÉ¾³ý°´Å¥µÄÊ±ºòµÄ´¦ÀíÂß¼­
 * »ñÈ¡ÄÄ¸ö³ÇÊÐÊý¾Ý±»É¾£¬É¾³ýÊý¾Ý£¬¸üÐÂ±í¸ñÏÔÊ¾
 */
function delBtnHandle(target) {
    // do sth.
    var key =target.parentNode.previousSibling.previousSibling.childNodes[0].textContent;
    delete aqiData[key];
    renderAqiList();
}

function init() {

    // ÔÚÕâÏÂÃæ¸øadd-btn°ó¶¨Ò»¸öµã»÷ÊÂ¼þ£¬µã»÷Ê±´¥·¢addBtnHandleº¯Êý

    // Ïë°ì·¨¸øaqi-tableÖÐµÄËùÓÐÉ¾³ý°´Å¥°ó¶¨ÊÂ¼þ£¬´¥·¢delBtnHandleº¯Êý
    window.onload=function(){
        var add_btn=document.getElementById('add-btn');
        add_btn.onclick = function (){
            addBtnHandle();//Ìí¼Ó¼ÇÂ¼
        }
        var table=document.getElementById('aqi-table');
        table.onclick=function(event){//ÊÂ¼þÎ¯ÍÐÌí¼Óµã»÷ÊÂ¼þ
            var event = event||window.event;
            var target = event.target||event.srcElement;
            if(target.nodeName=="BUTTON"){
                delBtnHandle(target);
            }
        };
    }

}

init();