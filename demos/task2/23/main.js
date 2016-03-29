function Node(name){//节点
    this.nodeName=name;
    this.Childs=[];

}
function Tree(data) {//建立一个树，名为data
    var node = new Node(data);
    this._root = node;
}
var nodelist=[];//存储遍历后的节点顺序
function preorder(node){//先序遍历
    if(node){
        nodelist.push(node.nodeName);
        for(var child in node.Childs){
            preorder(node.Childs[child]);
        }
    }
}

function posorder(node){//后序遍历
    if(node){
        for(var child in node.Childs){
            posorder(node.Childs[child]);
        }
        nodelist.push(node.nodeName);
    }
}
var index=0;//用来记录当前子节点数
var proNODE=null;
function render_serch(){//查询时用到的渲染方式
    if(index<nodelist.length){
        if(proNODE)
            proNODE.style.background="khaki";
        var NODE=document.getElementById(nodelist[index]);
        NODE.style.background="orangered";
        if(NODE.textContent==document.getElementById('serch-input').value){
            NODE.style.background="lightpink";
            NODE.style.border="solid 3px green";
            return -1;
        }
        proNODE=NODE;
        index++;
        if(index==nodelist.length&&NODE.textContent!=document.getElementById('serch-input').value){
            alert("百度没有这个项目哦");
            return -1;
        }
        return 1;
    }
}
function render(){//遍历时用到的渲染方式
    if(index<nodelist.length){
        if(proNODE)
            proNODE.style.background="khaki";
        var NODE=document.getElementById(nodelist[index]);
        NODE.style.background="orangered";
        proNODE=NODE;
        index++;
    }
}
function getSpeed(){//获取自定义速度
    var input=document.getElementById('speed');
    return input.value||500;
}
function init(){//初始化
    var classnode=document.getElementsByClassName('node');
    for(var n =0;n<classnode.length;n++){
        classnode[n].style.backgroundColor="khaki";
        classnode[n].style.border="solid 2px limegreen";
    }


}
/*
* 手工建树，有点low*/
var tree = new Tree('root');
tree._root.Childs.push(new Node('left1'));
tree._root.Childs.push(new Node('right1'));
tree._root.Childs[0].Childs.push(new Node('left21'));
tree._root.Childs[0].Childs.push(new Node('left22'));
tree._root.Childs[0].Childs.push(new Node('left23'));
tree._root.Childs[1].Childs.push(new Node('right21'));
tree._root.Childs[1].Childs.push(new Node('right22'));
tree._root.Childs[0].Childs[0].Childs.push(new Node('left31'));
tree._root.Childs[0].Childs[1].Childs.push(new Node('left32'));
tree._root.Childs[0].Childs[2].Childs.push(new Node('left33'));
tree._root.Childs[0].Childs[2].Childs.push(new Node('left34'));
tree._root.Childs[1].Childs[0].Childs.push(new Node('right31'));
tree._root.Childs[1].Childs[0].Childs.push(new Node('right32'));
tree._root.Childs[1].Childs[0].Childs.push(new Node('right33'));
tree._root.Childs[1].Childs[1].Childs.push(new Node('right34'));
tree._root.Childs[1].Childs[1].Childs.push(new Node('right35'));
tree._root.Childs[1].Childs[1].Childs.push(new Node('right36'));

/*
* 获取页面元素*/
var pro_btn=document.getElementById('pro-btn');
var pos_btn=document.getElementById('pos-btn');
var serch_btn=document.getElementById('serch-btn');
var time;//setinterval标记
pro_btn.onclick=function(){
    nodelist=[];
    index=0;
    clearInterval(time);
    init();
    preorder(tree._root);
    time=setInterval(function(){
            render();
            if(index==nodelist.length)
                clearInterval(time);
        },getSpeed());
};
pos_btn.onclick=function(){
    nodelist=[];
    index=0;
    clearInterval(time);
    init();
    posorder(tree._root);
    time=setInterval(function(){
        render();
        if(index==nodelist.length)
            clearInterval(time);
    },getSpeed());
};
serch_btn.onclick=function(){
    nodelist=[];
    index=0;
    clearInterval(time);
    init();
    if(!document.getElementById('serch-input').value) {
        return alert("客官您要找啥咧？");
    }
    posorder(tree._root);
    time=setInterval(function(){
        var key=render_serch();
        if(key==-1||index==nodelist.length)
            clearInterval(time);
    },getSpeed());
};
