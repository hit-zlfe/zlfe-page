function ajax(url,options){
    var xhr,method ;
    if ( window.XMLHttpRequest ) {// code for IE7+, Firefox, Chrome, Opera, Safari
       xhr = new XMLHttpRequest();
    } else {// code for IE6, IE5
       xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if( options.type ) {
        method = options.type;
    } else { 
        method = "GET";
    }

    xhr.open(method,url,true);
    if( options.data ) {
        if(method === "POST"){
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
        }
        xhr.send(options.data);
    }else {
    	xhr.send();
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200){
            options.onsuccess(xhr);
        }else if( options.onfail ) {
            options.onfail();
        }
    }
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    try{
        element.classList.add(newClassName);
    }catch(ex){
        oldClassName = element.className;
        element.className = !oldClassName? newClassName : oldClassName+" "+newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    try{
        element.classList.remove(oldClassName);  //html5中新增的，classList属性，只有chrome和firefox3.6支持
    }catch(ex){
        var re = RegExp("\\b"+oldClassName+"\\b");
        console.log(element);
        element.className = element.className.replace(re,"");
    }
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    return str.replace(/^\s*\t*\r*\n*|\s*\t*\r*\n*$/,'');
}

var EventUtil={
    addHandler:function(element,type,handler){
        if (element.addEventListener) {            //DOM2级方法
            element.addEventListener(type, handler);
        } else if (element.attachEvent) {          //针对IE8及以下浏览器
            element.attachEvent("on" + type, handler);
        }else{
            element["on"+type] = handler;            //DOM0级方法
        }
    },
    removeHandler:function(element,type,handler){
        if (element.removeEventListener) {              //DOM2级方法
            element.removeEventListener(type, handler);
        } else if (element.detachEvent) {              //针对IE8及以下浏览器
            element.detachEvent("on" + type, handler);
        }else{
            element["on"+type] = null;            //DOM0级方法
        }
    },

    getEvent: function(event){
        return event ? event :window.event;
    },

    getTarget: function(event){           //事件真正的目标
        return event.target || event.srcElement;
    },

    preventDefault: function(event){       //取消事件的默认行为
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopProagation: function(event){       //取消事件进一步冒泡或者捕获
        if(event.stopProagation){
            event.stopProagation();
        }else{
            event.cancelBubble = true;
        }
    }
}


function $(selector) {
    var re_id = /^#(\S+)$/;
    var re_class = /^\.(\S+)$/;
    var re_com = /^#(\w+)\s+\.(\w+)/;
    if(re_id.test(selector)) {      
        var idName = RegExp.$1;                  // 可以通过id获取DOM对象，通过#标示，例如$("#adom");
        return document.getElementById(idName);  // 返回id为adom的DOM对象
    } else if(re_class.test(selector)) {            // 可以通过样式名称获取DOM对象，例如$(".classa"); 
        var className = RegExp.$1;               // 返回第一个样式定义包含classa的对象
        return document.getElementsByClassName(className)[0];
    } else if(re_com.test(selector)) {            // 可以通过简单的组合提高查询便利性，例如$("#adom .classa");
        var re_comId = RegExp.$1;              // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
        var re_comClass = RegExp.$2;
        var ansList = document.getElementById(re_comId);
        return ansList.getElementsByClassName(re_comClass)[0];
    } else {                                                        // 可以通过tagName获取DOM对象，例如$("a");
        return document.getElementsByTagName(selector)[0];        // 返回第一个<a>对象
    } 
}