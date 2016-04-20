// 实现一个简单的Query
function $(selector) {
    var idRegex = /^#([\w\-\.\:]+)/;
    var tagRegex = /^\w+$/;
    var classRegex = /^\.([\w\-\.\:]+)/;
    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrRegex = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;    //important!!
    var selectActions = trim(selector).split(" ");
    
    //复合查找
    if (selectActions.length > 1) {    
        var root = $(selectActions[selectActions.length - 1]);
        if (root.length == 0) {
            return null;
        }
        
        if (!isArray(root)) {
            root = toArray(root);
        }
        for (var cur = 2; cur <= selectActions.length; cur++) {
            root = fliterParent(root, selectActions[selectActions.length - cur]);
        }
        return root;
    }
    
    //通过id查找
    if (idRegex.test(selector)) {
        return document.getElementById(selector.slice(1, selector.length));
    }
    
    //通过tagname查找
    if (tagRegex.test(selector)) {
        return document.getElementsByTagName(selector);
    }
    
    //通过class查找
    if (classRegex.test(selector)) {
        if (document.getElementsByClassName) {    //浏览器支持getElementsByClassName
            return document.getElementsByClassName(selector.slice(1, selector.length));
        }
        else {
            var allNodes = document.getElementsByTagName("*");
            var result = [];
            for (var cur = 0; cur < allNodes.length; cur++) {
                if (hasClass(allNodes[cur], selector.slice(1, selector.length))) {
                    result.push(allNodes[cur]);
                }
            }
            return result;
        }
    }
    
    //通过属性查找
    if (attrRegex.test(selector)) {
        var result = [];
        var allNodes = document.getElementsByTagName("*");
        var matchResult = selector.match(attrRegex);
        var tag = matchResult[1]; 
        var key = matchResult[2];
        var value = matchResult[4];
        for (var cur = 0; cur < allNodes.length; cur++) {
            if (value) {
                var temp = allNodes[cur].getAttribute(key);
                if (temp === value) {
                    result.push(allNodes[cur]);
                }
                else {
                    continue;
                }
            }
            else {
                if (allNodes[cur].hasAttribute(key)) {
                    result.push(allNodes[cur]);
                }
            }
        }
        return result;
    }
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return (Object.prototype.toString.call(arr) === '[object Array]');
}

// 得到真正的Array
function toArray(root) {
    var arr = [];
    for (var cur = 0; cur < root.length; cur++) {
        arr.push(root[cur]);
    }
    return arr;
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    console.log("addEvent");
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
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
//事件代理
function delegateEvent(element, tag, eventName, listener) {
    console.log("delegateEvent");
    addEvent(element, eventName, function () {
        var event = arguments[0] || window.event,
            target = event.target || event.srcElement;
        if (target && target.tagName === tag.toUpperCase()) {
            listener.call(target, event);
        }
    });
};
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
//jquery中的extend 浅拷贝
var extend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
};
//jquery中的深拷贝
var deepExtend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};
