function Node(name){//�ڵ�
    this.nodeName=name;
    this.leftChild=null;
    this.rightChild=null;
}
function Tree(data) {//�½������������ڵ���Ϊdata
    var node = new Node(data);
    this._root = node;
}
var nodelist=[];//������ű�����Ľڵ�˳��
function preorder(node){//ǰ�����
    if(node){
        nodelist.push(node.nodeName);
        preorder(node.leftChild);
        preorder(node.rightChild);
    }
}
function midorder(node){//�������
    if(node){
        midorder(node.leftChild);
        nodelist.push(node.nodeName);
        midorder(node.rightChild);
    }
}
function posorder(node){//�������
    if(node){
        posorder(node.leftChild);
        posorder(node.rightChild);
        nodelist.push(node.nodeName);
    }
}
var index=0;//��ǰ��Ⱦ�ڵ�
function render(){//��Ⱦ��ǰ�ڵ�
    if(index<nodelist.length){
        var NODE=document.getElementById(nodelist[index]);
        NODE.style.background="red";
        index++;
    }
}
function getSpeed(){//�ı���Ⱦ�ٶȣ�Ĭ��Ϊ500ms
    var input=document.getElementById('speed');
    return input.value||500;
}
function init(){//��ʼ���ڵ���ʽ
    var classnode=document.getElementsByClassName('node');
    for(var n =0;n<classnode.length;n++){
        classnode[n].style.backgroundColor="khaki";
    }


}
/*
* �ֶ�����������*/
var tree = new Tree('root');
tree._root.leftChild=new Node('left1');
tree._root.rightChild=new Node('right1');
tree._root.leftChild.leftChild=new Node('left21');
tree._root.leftChild.rightChild=new Node('left22');
tree._root.rightChild.leftChild=new Node('right21');
tree._root.rightChild.rightChild=new Node('right22');

/*
* ��ȡҳ��Ԫ��*/
var pro_btn=document.getElementById('pro-btn');
var mid_btn=document.getElementById('mid-btn');
var pos_btn=document.getElementById('pos-btn');
var time;//setinterval����
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

