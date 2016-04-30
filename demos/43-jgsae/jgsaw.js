define(function(require,exports,module){
	var imgType=require("./Imgtype").imgType;
	var preloadImage=require("./imgLoad").preloadImage;
	var boxWidth=parseInt(require("./config").jgsawWidth);
	var boxHeight=parseInt(require("./config").jgsawHeight);
	function jgsaw(url,jgsawNum,index,parent){
		this.url=url;
		this.getimg=function(){
			var self=this;
			var img=new Image();
			img.src=url;
			img.onload=function(){
				//图片加载完成后往dom中添加
				self.img=this;
				self.type=self.gettype();
				self.class="jgsaw-img-"+jgsawNum+"-"+parseInt(index)+"-"+self.type;
				var image=document.createElement("img");
				addClass(image,self.class);
				image.class=self.class;
				switch(jgsawNum){//由于有些布局无法用纯粹的css实现，所以添加必要的js辅助手段
					case 2:
					switch(index){
						case 1:
							image.style["-webkit-clip-path"]="polygon(0 0,"+boxWidth*0.66+"px 0,"+boxWidth*0.33+"px 100%,0 100%)";
							break;
						case 2:
							image.style["-webkit-clip-path"]="polygon("+boxWidth*0.66+"px 0,100% 0,100% 100%,"+boxWidth*0.33+"px 100%)";
							break;
					}
						break;
					case 3:
						switch(index){
							case 1:
								if(self.type=="width"){
									image.style.width=boxWidth-boxHeight*0.5+"px";
								}
								break;
							case 2:
							case 3:
								if(self.type=="height"){
									image.style["left"]=boxWidth-boxHeight*0.5+"px";
								}
								break;
						}
						break;
					case 5:
						switch(index){
							case 4:
								if(self.type=="height"){
									image.style.height=boxWidth*0.333334+"px";
								}
								break;
							case 5:
								if(self.type=="height"){
									image.style.height=boxHeight-boxWidth*0.333334+"px";
									image.style.top=boxWidth*0.333334+"px";
								}
								if(self.type=="width"){
									image.style.top=boxWidth*0.333334+"px";
								}
								break;
						}
					case 6:
						break;
				}
				image.src=url;
				parent.appendChild(image);
			}
			return img;};
		this.img=this.getimg();
		this.gettype=function(){
			switch(jgsawNum){
				case 1:
					return imgType(this.img,boxWidth,boxHeight);
					break;
				case 2:
					return imgType(this.img,boxWidth,boxHeight);
					break;
				case 3:
					switch(index){
						case 1:
							return imgType(this.img,boxWidth-(boxHeight*0.5),boxHeight);
							break;
						case 2:
						case 3:
							return imgType(this.img,boxHeight*0.5,boxHeight*0.5);
							break;
					}
					break;
				case 4:
					return imgType(this.img,boxWidth*0.5,boxHeight*0.5);
					break;
				case 5:
					switch(index){
						case 1:
							return imgType(this.img,boxWidth*2/3,boxHeight*2/3);
							break;
						case 2:
						case 3:
							return imgType(this.img,boxWidth*1/3,boxHeight*1/3);
							break;
						case 4:
							return imgType(this.img,boxWidth*1/3,boxWidth*1/3);
							break;
						case 5:
							return imgType(this.img,boxWidth*1/3,boxHeight-boxWidth*1/3);
							break;
					}
					break;
				case 6:
					switch(index){
						case 1:
							return imgType(this.img,boxWidth*2/3,boxHeight*2/3);
							break;
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
							return imgType(this.img,boxWidth*1/3,boxHeight*1/3);
							break;
					}
					break;

			}
		};
	}	
	module.exports.jgsaw=jgsaw;
});