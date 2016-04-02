var tree = document.getElementById('tree');//文件树
var serch_btn=document.getElementById('serch-btn');
var serch_input=document.getElementById('serch-input');
var ifFind=0;//标记是否找到
var menus=document.getElementById('menus');//右键菜单

tree.onclick=function(ev){//事件委托，控制展开和隐藏
    var event=ev||window.event;
    var target=event.target;
    var p =tree.getElementsByTagName("P");
    for(var m in p){//取消选择
        if(p[m].tagName){
            p[m].style.backgroundColor="";
            p[m].style.border="";
        }
    }
    menus.style.display="";
    if(event.target.tagName==("P"||"p")){//选中
        event.target.style.backgroundColor="rgba(230,220,60,0.7)";
        event.target.style.border="solid lightgray 2px";
        target=target.parentNode;
    }
    if(target.className=="node"){
        var childs=target.childNodes;
        if(childs.length==1){//空文件处理
            if(target.style['skey']=="on"){
                target.style['list-style-image']='url("file2.jpg")';
                target.style['skey']="off";
            }
            else{
                target.style['list-style-image']='url("file1.jpg")';
                target.style['skey']="on";
            }
        }
        for(var node in childs){
            if(childs[node].tagName=="UL"||childs[node].tagName=="ul"){
                if(childs[node].style.display){//从隐藏到展开
                    childs[node].style.display="";
                    target.style['list-style-image']="url('file2.jpg')";
                }
                else{
                    childs[node].style.display="none";//从展开到隐藏
                    target.style['list-style-image']="url('file1.jpg')";
                }
            }
        }
    }
}
tree.onmouseup=function(ev){//菜单事件
    var event=ev||window.event;
    var p;
    tree.oncontextmenu=function(event){
        event.preventDefault();//阻止鼠标默认事件
    };
    var ps =tree.getElementsByTagName("P");
        for(var t in ps){//取消选择
            if(ps[t].tagName){
                ps[t].style.background="";
                ps[t].style.border="";
            }
        }
    if(event.button==2 && (event.target.tagName==("P"||"p"))){//弹出菜单
        p=event.target;
        event.target.style.backgroundColor="rgba(230,220,60,0.7)";
        event.target.style.border="solid lightgray 2px";
        var x=event.clientX+window.pageXOffset+1;
        var y=event.clientY+window.pageYOffset+1;
        menus.style.top=y+"px";
        menus.style.left=x+"px";
        menus.style.display="block";
    }
    else{
        menus.style.display="";
        if(p){
            p.style.backgroundColor="";
            p.style.border="";
        }
    }
    menus.onclick=function(e){//菜单选项
        var e = e||window.event;
        if(event.target.tagName==("P"||"p")){
            switch (e.target.id){
                case "delete":
                    menus.style.display="";
                    event.target.style.backgroundColor="";
                    event.target.style.border="";
                    alert("delete:"+event.target.textContent);
                    var parNode=event.target.parentNode.parentNode;
                    parNode.removeChild(event.target.parentNode);
                    break;
                case "creat":
                    menus.style.display="";
                    event.target.style.backgroundColor="";
                    event.target.style.border="";
                    var name=prompt("请输要添加的入新文件名","");
                    if(name){
                        var fragment=document.createDocumentFragment();
                        var li=document.createElement("li");
                        var p=document.createElement("p");
                        li.className="node";
                        p.textContent=name;
                        li.appendChild(p);
                        if(event.target.parentNode.childNodes.length>1){
                            fragment.appendChild(li);
                            event.target.parentNode.childNodes[2].appendChild(fragment);
                        }
                        else{
                            var ul=document.createElement("ul");
                            ul.appendChild(li);
                            fragment.appendChild(ul);
                            event.target.parentNode.childNodes[0].appendChild(fragment);
                        }
                    }
                    break;
                case "rename":
                    event.target.style.backgroundColor="";
                    event.target.style.border="";
                    menus.style.display="";
                    var name=prompt("请输入文件的新名称","");
                    if(name){
                        event.target.textContent=name;
                    }
                    break;
            }
        }

    }
}
serch_btn.onclick=function(){//setch button事件
    if(!serch_input.value){//input为空
        alert("客官您找啥咧");
        return;
    }
    else{
        find(serch_input.value);
    }
};
function find(title){//查找函数
    var root=document.getElementById('root');
    ifFind=0;
    for(var node in root.childNodes){
        if(root.childNodes[node])
            DFS(root.childNodes[node],title);
    };
    if(ifFind){
        //alert("终于找到了");
    }
    else{
        alert("找不到啊");
    }
}
function DFS(node,title){//深度优先算法
    if(node.tagName){
        if(node.tagName==("P"||"p")){
            if(node.textContent.indexOf(title)>=0){
                node.style.background="rgba(200,200,180,80)";
                parent=node.parentNode;
                //alert(parent.id);
                while(parent.id!="root"){
                    parent.style.display="";
                    parent=parent.parentNode;
                }
                ifFind=1;
            }
            else{
                node.style.background="";
            }
        }
        for(var n in node.childNodes){
            if(node.childNodes[n].tagName){
                DFS(node.childNodes[n],title);
            }
        }
        if(node.nextSibling){
            DFS(node.nextSibling,title);
        }
        return ;
    }
    else{
        return ;
    }
}