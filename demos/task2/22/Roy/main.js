var trager = [];
function preOrder(node) {
	trager.push(node);
	if(node.firstElementChild) {
		preOrder(node.firstElementChild);
	}
	if(node.lastElementChild && node.lastElementChild!==node.firstElementChild) {
		preOrder(node.lastElementChild);
	}
}
function inOrder(node) {
	if(node.firstElementChild) {
		inOrder(node.firstElementChild);
	}
	trager.push(node);
	if(node.lastElementChild &&node.lastElementChild!==node.firstElementChild) {
		inOrder(node.lastElementChild);
	}
}
function postOrder(node) {
	if(node.firstElementChild) {
		inOrder(node.firstElementChild);
	}
	if(node.lastElementChild &&node.lastElementChild!==node.firstElementChild) {
		inOrder(node.lastElementChild);
	}
	trager.push(node);
}
var count = 0,
    speed = 100, 
    curNode;
function show() {
	if(curNode) {
		curNode.style.backgroundColor = "#fff";
	}
	trager[count].style.backgroundColor = "red";
	curNode = trager[count];
	count++;
	if(count !== trager.length) {
		setTimeout(show,speed);
	}
}

function init() {
	var root = document.getElementsByClassName("root")[0];
	var orderDiv = document.getElementById("order");
	var speeder = document.getElementById("speeder");
	orderDiv.addEventListener("click",function(ev) {
		ev = ev || window.ev;
		target = ev.target || ev.srcElement;
		switch(target.value) {
			case "前序":
				trager = [];
				count = 0;
				preOrder(root);
				show();
				break;
			case "中序":
				trager = [];
				count = 0;
				inOrder(root);
				show();
				break;
			case "后序":
				trager = [];
				count = 0;
				postOrder(root);
				show();
				break;
		}
	});
	speeder.addEventListener("change",function() {
		if(this.value === "快") {
			speed = 100;
		} else if(this.value === "中") {
			speed = 300;
		} else {
			speed = 500;
		}
	});
}
window.onload = function() {
	init();
}