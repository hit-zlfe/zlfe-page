
	function addClass(node,newClass){
		if(node.classList){//检测是否支持classlist
			node.classList.add(newClass);
		}
		else{
			var oldClass,newClass;
       	    oldClass = currNode.getAttribute("class") || currNode.getAttribute("className");

        	if(oldClass !== null) {
   				oldClass = oldClass.split(" ");
  				newClass = newClass.split(" ");
 		    	newClass = oldClass.concat(newClass); 
        	}
  			currNode.className = newClass; //IE 和FF都支持
		}
		
	}	