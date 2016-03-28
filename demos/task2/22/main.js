function Node(name){//节点
    this.nodeName=name;
    this.leftChild=null;
    this.rightChild=null;
}
function Tree(data) {//新建二叉树，根节点名为data
    var node = new Node(data);
    this._root = node;
}
var nodelist=[];//用来存放遍历后的节点顺序
function preorder(node){//前序遍历
    if(node){
        nodelist.push(node.nodeName);
        preorder(node.leftChild);
        preorder(node.rightChild);
    }
}
function midorder(node){//中序遍历
    if(node){
        midorder(node.leftChild);
        nodelist.push(node.nodeName);
        midorder(node.rightChild);
    }
}
function posorder(node){//后序遍历
    if(node){
        posorder(node.leftChild);
        posorder(node.rightChild);
        nodelist.push(node.nodeName);
    }
}
var index=0;//当前渲染节点
function render(){//渲染当前节点
    if(index<nodelist.length){
        var NODE=document.getElementById(nodelist[index]);
        NODE.style.background="red";
        index++;
    }
}
function getSpeed(){//改变渲染速度，默认为500ms
    var input=document.getElementById('speed');
    return input.value||500;
}
function init(){//初始化节点样式
    var classnode=document.getElementsByClassName('node');
    for(var n =0;n<classnode.length;n++){
        classnode[n].style.backgroundColor="khaki";
    }


}
/*
* 手动建立二叉树*/
var tree = new Tree('root');
tree._root.leftChild=new Node('left1');
tree._root.rightChild=new Node('right1');
tree._root.leftChild.leftChild=new Node('left21');
tree._root.leftChild.rightChild=new Node('left22');
tree._root.rightChild.leftChild=new Node('right21');
tree._root.rightChild.rightChild=new Node('right22');

/*
* 获取页面元素*/
var pro_btn=document.getElementById('pro-btn');
var mid_btn=document.getElementById('mid-btn');
var pos_btn=document.getElementById('pos-btn');
var time;//setinterval变量
pro_btn.onclick=function(){
    nodelist=[];
    index=0;
    clearInterval(time);
    init();
    preorder(tree._root);
    time=setInterval(function(){
            render();
            if(index==7)
                clearInterval(time);
        },getSpeed());
};
mid_btn.onclick=function(){
    nodelist=[];
    index=0;
    clearInterval(time);
    init();
    midorder(tree._root);
    time=setInterval(function(){
        render();
        if(index==7)
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
        if(index==7)
            clearInterval(time);
    },getSpeed());
};

