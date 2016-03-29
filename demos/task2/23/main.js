function Node(name){//½Úµã
    this.nodeName=name;
    this.Childs=[];

}
function Tree(data) {//ÐÂ½¨¶þ²æÊ÷£¬¸ù½ÚµãÃûÎªdata
    var node = new Node(data);
    this._root = node;
}
var nodelist=[];//ÓÃÀ´´æ·Å±éÀúºóµÄ½ÚµãË³Ðò
function preorder(node){//Ç°Ðò±éÀú
    if(node){
        nodelist.push(node.nodeName);
        for(var child in node.Childs){
            preorder(node.Childs[child]);
        }
    }
}

function posorder(node){//ºóÐò±éÀú
    if(node){
        for(var child in node.Childs){
            posorder(node.Childs[child]);
        }
        nodelist.push(node.nodeName);
    }
}
var index=0;//µ±Ç°äÖÈ¾½Úµã
var proNODE=null;
function render_serch(){//äÖÈ¾µ±Ç°½Úµã
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
function render(){//äÖÈ¾µ±Ç°½Úµã
    if(index<nodelist.length){
        if(proNODE)
            proNODE.style.background="khaki";
        var NODE=document.getElementById(nodelist[index]);
        NODE.style.background="orangered";
        proNODE=NODE;
        index++;
    }
}
function getSpeed(){//¸Ä±ääÖÈ¾ËÙ¶È£¬Ä¬ÈÏÎª500ms
    var input=document.getElementById('speed');
    return input.value||500;
}
function init(){//³õÊ¼»¯½ÚµãÑùÊ½
    var classnode=document.getElementsByClassName('node');
    for(var n =0;n<classnode.length;n++){
        classnode[n].style.backgroundColor="khaki";
        classnode[n].style.border="solid 2px limegreen";
    }


}
/*
* ÊÖ¶¯½¨Á¢¶þ²æÊ÷*/
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
* »ñÈ¡Ò³ÃæÔªËØ*/
var pro_btn=document.getElementById('pro-btn');
var pos_btn=document.getElementById('pos-btn');
var serch_btn=document.getElementById('serch-btn');
var time;//setinterval±äÁ¿
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
