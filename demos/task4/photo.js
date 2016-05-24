(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';


    function IfeAlbum() {

        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3     // 木桶布局
        };
        // 图片地址数组
        this.imgUrls=[];
        this.LayoutType=2;

        // 公有变量可以写在这里
        // this.xxx = ...

    }

    // 私有变量可以写在这里
    // var xxx = ...

    function addClass(node,newClass){
        //if(node.classList){//检测是否支持classlist
          //  node.classList.add(newClass);
       // }
        //else{
            var oldClass,newClass;
            oldClass = node.getAttribute("class") || node.getAttribute("className");

            if(oldClass !== null) {
                oldClass = oldClass.split(" ");
                newClass = newClass.split(" ");
                newClass = oldClass.concat(newClass).join(" ");
               // console.log(newClass); 
            }
            node.className = newClass; //IE 和FF都支持
       // }
        
    }
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
                var oldClassName = element.className;
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

    /************* 以下是本库提供的公有方法 *************/



    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    IfeAlbum.prototype.setImage = function (image, option) {
        var dAlbume=document.getElementsByClassName("album")[0];
        dAlbume.innerHTML="";
        var dclass=dAlbume.className;
        var did=dAlbume.id;
        dAlbume.outerHTML="<div id=\"container\" class=\"album\"></div>"
        dAlbume.className=dclass;
        dAlbume.id=did;
        var imgs=dAlbume.getElementsByTagName("img");
        for(var i=0;i<imgs.length;i++){

            imgs[i].className="";
        }
        dAlbume.className="album";
        if (typeof image === 'string') {
            // 包装成数组处理
            this.setImage([image]);
            return;
        }
         this.imgUrls=[];
        // 你的实现
        for(var i in image){
            this.imgUrls.push(image[i])
        }
        if(option){
            this.setLayout(option);
        }

        

    };

 

    /**
     * 选择模式，并渲染
     * 
     * 
     */
    IfeAlbum.prototype.rendImageDomElements = function() {
        
        if(this.LayoutType==1){//puzzle
            this.rendPuzzle();
        }
        if(this.LayoutType==3){//puzzle
            this.rendBarrel();
        }
        if(this.LayoutType==2){//WATERFALL
            this.rendWaterfull();
        }
    };



    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL布局下 或多张图片 URL 组成的数组
     */
    IfeAlbum.prototype.addImage = function (image) {
        if (typeof image === 'string') {
            // 包装成数组处理
            this.addImage([image]);
            return;
        }
        this.imgUrls=this.imgUrls.concat(image);
        console.log(this.imgUrls)
        this.rendImageDomElements();
    };



    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (image) {
        var isArray = (function(obj) { 
            return Object.prototype.toString.call(obj) === '[object Array]'; 
            })(image);
        if(!isArray){
            //not Arr
            for(var i in this.imgUrls){
                if(image.src===this.imgUrls[i]){
                    this.imgUrls.splice(i,1);
                    this.rendImageDomElements();
                    return true;
                }
            }
        }
        if(isArray){
            //is Arr
            for(var i in image){
                var key=this.removeImage(image[i]);
                if(key){
                    this.rendImageDomElements();
                    return true;
                }
                else{
                    return false;
                }
            }
        }

    };


    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (layout) {
        this.LayoutType=this.LAYOUT[layout];
    };



    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    IfeAlbum.prototype.getLayout = function() {
        return this.LayoutType;
    };



    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    IfeAlbum.prototype.setGutter = function (x, y) {

    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.enableFullscreen = function () {

    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.disableFullscreen = function () {

    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {


    };


    /**
     * 设置木桶模式每行图片数的上下限
     * @param {number} min 最少图片数（含）
     * @param {number} max 最多图片数（含）
     */
    IfeAlbum.prototype.setBarrelBin = function (min, max) {

        // 注意异常情况的处理，做一个健壮的库
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // 你的实现

    };



    /**
     * 获取木桶模式每行图片数的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * 获取木桶模式每行高度的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // 你想增加的其他接口
    /**
    *拼图布局渲染
    *
    */
    IfeAlbum.prototype.rendPuzzle = function() {
        var dAlbume=document.getElementsByClassName("album")[0];
        dAlbume.innerHTML="";
        var imglength=this.imgUrls.length;
        if(imglength>=7){
            this.rendWaterfull();
            return;
        }
        dAlbume.className="album";
        
        var puzzleClass="jgsaw jgsaw-"+imglength;
        addClass(dAlbume,puzzleClass);

        var boxWidth="280";
        var boxHeight="210";
        var imgType=function imgType(img,areaW,areaH){//判断图片是由高度决定的还是宽度决定的
           
            var H=img.height/(areaH);
            var W=img.width/(areaW);
            
            return H<W?"height":"width";
        };//图片类型判断函数
        var JGSAW=function jgsaw(url,jgsawNum,index,parent){
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
                                   // if(self.type=="height"){
                                    if(1){
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
        };//加载jgsaw的构造函数
        var jgsaw=document.getElementsByClassName("jgsaw");
        for(var i in jgsaw){ 
            if(jgsaw[i].tagName=="DIV"){
                var Class = jgsaw[i].getAttribute("class") || jgsaw[i].getAttribute("className");
                if(Class.indexOf("jgsaw-1")!=-1){//1
                    jgsaw[i].style.width=boxWidth+"px";
                    jgsaw[i].style.height=boxHeight+"px";
                    var urls=this.imgUrls;
                    for(var j=0;j<urls.length;j++){
                        var img=new JGSAW(urls[j],1,j+1,jgsaw[i]);
                    }
                }
                if(Class.indexOf("jgsaw-2")!=-1){//2
                    //2中ff的裁剪要用到svg，所以在这里要改变svg的数据。
                    jgsaw[i].style.width=boxWidth+"px";
                    jgsaw[i].style.height=boxHeight+"px";
                    var urls=this.imgUrls;
                    for(var j=0;j<urls.length;j++){
                        var img=new JGSAW(urls[j],2,j+1,jgsaw[i]);
                    }
                }
                if(Class.indexOf("jgsaw-3")!=-1){//3

                    jgsaw[i].style.width=boxWidth+"px";
                    jgsaw[i].style.height=boxHeight+"px";
                    /**3张图片由于有正方形，所以不能用纯粹的css来解决**/
                    var urls=this.imgUrls;

                    for(var j=0;j<urls.length;j++){
                        var img=new JGSAW(urls[j],3,j+1,jgsaw[i]);
                    }
                }
                if(Class.indexOf("jgsaw-4")!=-1){//4
                    jgsaw[i].style.width=boxWidth+"px";
                    jgsaw[i].style.height=boxHeight+"px";
                    var urls=this.imgUrls;
                    for(var j=0;j<urls.length;j++){
                        var img=new JGSAW(urls[j],4,j+1,jgsaw[i]);
                    }
                }
                if(Class.indexOf("jgsaw-5")!=-1){//5
                    /**5张图片由于有正方形，所以不能用纯粹的css来解决**/
                    jgsaw[i].style.width=boxWidth+"px";
                    jgsaw[i].style.height=boxHeight+"px";
                    var urls=this.imgUrls;
                    for(var j=0;j<urls.length;j++){
                        var img=new JGSAW(urls[j],5,j+1,jgsaw[i]);
                    }
                }
                if(Class.indexOf("jgsaw-6")!=-1){//6
                    jgsaw[i].style.width=boxWidth+"px";
                    jgsaw[i].style.height=boxHeight+"px";
                    var urls=this.imgUrls;
                    for(var j=0;j<urls.length;j++){
                        var img=new JGSAW(urls[j],6,j+1,jgsaw[i]);
                    }
                }

            }
        }
    }
     /**
    *木桶布局渲染
    *
    */
    IfeAlbum.prototype.rendBarrel = function() {
        
        document.getElementsByClassName("album")[0].id="container";
        function Cask(selector,data) {
            this.data = data;
            this.container = selector;
            this.wholeWidth = document.documentElement.clientWidth ||
                                                document.body.width;
            this.curNum = 0;     //当前队列中图片的数量
            this.curArr = [];    //当前队列中的图片
            this.showNum = 0;     //已经展示的图片的数量
            this.rowMargin = 9;   //图片水平间距
            this.lineMinNum = 2;  //每行最少图片数量
            this.lineMaxNum = 5;   //每行最多图片数量
            this.photoMinHeight = 200;  //图片最小高度
            this.photoMaxHeight = 300;  //图片最大高度
            this.firstScreen = 15;   //首屏图片数量
            this.end = 0;            //当前图片展示终止位置
        }  

        Cask.prototype = {
            constructor: Cask,
            init: function() {
                
                var container = document.getElementById(this.container);
                container.style.width = this.wholeWidth+"px";
                this.getPhoto(this.firstScreen);
            },
            getPhoto: function(num) {
                if(this.data.length!==this.end && this.curNum !== 0) {
                    this.delPhoto();
                }
                var photoNum = (num<this.data.length-this.showNum) ? num:this.data.length-this.showNum;
                this.end = this.showNum + photoNum;
                var index = this.showNum;
                var self = this;
                for(var i=0;i<photoNum;i++) {
                    var this_img = new Image();
                    this_img.src = this.data[index];
                    EventUtil.addHandler(this_img,"load",function() {
                        self.afterLoad(this);
                    });
                    index++;
                }
            },
            afterLoad: function(img) {
                this.curNum++;
                this.curArr.push(img);
                if(this.curNum >= this.lineMinNum && this.curNum <= this.lineMaxNum) {
                    var ansHeight = this.calcuHeight(); 
                    if(ansHeight!==-1) {
                        this.showPhoto(ansHeight);
                        this.curNum = 0;
                        this.curArr = [];
                    } else if(this.showNum+this.curNum===this.end) {
                        ansHeight = this.calcuHeight(true);
                        this.showPhoto(ansHeight);
                    }
                } else if(this.showNum+this.curNum===this.end) {
                    ansHeight = this.calcuHeight(true);
                    this.showPhoto(ansHeight);
                }
            },
            calcuHeight: function() {
                var sum = 0;
                for(var i=0;i<this.curArr.length;i++) {
                    sum += this.curArr[i].width/this.curArr[i].height;
                }
                var ans = (this.wholeWidth-this.rowMargin*i)/sum;
                if(ans<this.photoMaxHeight && ans>this.photoMinHeight || this.curNum === this.lineMaxNum) {
                    return Math.floor(ans);
                }else if(arguments[0]) {
                    return this.photoMaxHeight;
                } else {
                    return -1;
                }
            },
            showPhoto: function(height) {
                var imgFragment = document.createDocumentFragment();
                var container = document.getElementById(this.container);;
                for(var i=0;i<this.curNum;i++) {
                    this.showNum++;
                    var img = new Image();
                    img.src = this.curArr[i].src;
                    img.style.height = height+"px";
                    addClass(img,"gallry-row");
                    imgFragment.appendChild(img);
                }
                container.appendChild(imgFragment);
            },
            delPhoto: function() {
                var container = document.getElementById(this.container);;
                for(var i=0;i<this.curNum;i++) {
                    container.removeChild(container.lastElementChild);
                    this.showNum--;
                    this.curArr.pop();
                }
                this.curNum=0;
            }
        }
        function pullDown(num,oCask) {
            this.cask = oCask;
            this.num = num;
            this.scrollTop = 0;
        }

        pullDown.prototype = {
            constructor: pullDown,
            init: function() {
                self = this;
                EventUtil.addHandler(document,"scroll",function() {
                    if(self.check() && self.cask.data.length !== self.cask.end) {
                        self.cask.getPhoto(self.num);
                        document.documentElement.scrollTop = self.scrollTop;
                    }
                });
            },
            check: function() {
                //滚动条的距离
                var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
                this.scrollTop = oScroll;
                //页面高度
                var oHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //可视区的高度
                var vHeight = document.documentElement.clientHeight || document.body.clientHeight;

                return (Math.ceil(oScroll) + vHeight >= oHeight) ? true:false
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
        
        var cask = new Cask("container",this.imgUrls);
        cask.init();
        var oPull = new pullDown(10,cask);
        oPull.init();
    }
     /**
    *瀑布流局渲染
    *
    */
    IfeAlbum.prototype.rendWaterfull = function(){
        var album=this;
        var dAlbume=document.getElementsByClassName("album")[0];
        dAlbume.id="waterfall";
        dAlbume.className="album";
        function Waterfall(){
            this.cfg = {
                fatherId: "waterfall",      //默认父容器的id
                fallClass: "box",           //默认字容器的类
                columnNum: 4,               //列数 默认值4
                pix: 16,                    //子容器的间距单位px
                isClickShowDetail: false,    //是否有点击回调函数，默认存在
                
            }
            

        }

        Waterfall.prototype = {
            initColumn: function(cfg) { //添加列
              // create column div
              
              this.columns = [];
              cfg = extend({},this.cfg,cfg); //覆盖默认值
              var columnNum = cfg.columnNum;
              var father = document.getElementById(cfg.fatherId);//父容器
              for (var i = 0; i < columnNum; i++) {
                var columnDiv = document.createElement('div');
                columnDiv.style.width = (100/columnNum) + '%';
                addClass(columnDiv,'waterfallColumn');
                this.columns.push(columnDiv);
                father.appendChild(columnDiv);
              }
              //添加事件监听
              
            },

            getMinHeightIndex: function() {

                var min = this.columns[0].clientHeight;
                var index = 0;
                for (var i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].clientHeight < min) {
                      min = this.columns[i].clientHeight;
                      index = i;
                    }
                }
                    return index;
                },

            createContent: function(cfg){ //添加子容器
                
                cfg = extend({},this.cfg,cfg); //覆盖默认值

                var content = document.createElement("div");
                addClass(content,cfg.fallClass);
                var bul= document.getElementById(cfg.fatherId);
               // console.log(bul)
                bul.appendChild(content);
                //content.style.height = (Math.random()*100+100)+"px";
                content.style.margin = (cfg.pix/2) +"px";

                var img = document.createElement("img");
                img.style.width = "100%";
                var imgnum = parseInt(Math.random()*10);
              
                img.src = album.imgUrls[imgnum]//暂时图片地址是这样子的，for demo
                content.appendChild(img);

                return content;
            },

            addContent: function(){
                for (var i = 0; i < 10; i++) {
                    var c = this.createContent();
                    var num = document.createElement("div");
                    num.innerHTML = i;
                    c.appendChild(num);
                    //c.innerHTML = i;
                    var index = this.getMinHeightIndex();
                    var column = this.columns[index];
                  
                    column.appendChild(c);
                }
            },
            

        };
        function init(){
            var waterfall = new Waterfall();
            waterfall.initColumn()
            
            waterfall.addContent();
            // add scroll event
            function loadMore() {
              window.onscroll = function() {
                var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
                var container = waterfall.columns[waterfall.getMinHeightIndex()];
                var containerHeight = container.offsetTop  + container.offsetHeight;
                if (containerHeight < screenHeight) {
                  waterfall.addContent();
                }
              }
            }
            loadMore();
        }
    
        init(); 

    }
    /************* 以上是本库提供的公有方法 *************/


    
    // 实例化
    if (typeof window.ifeAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.ifeAlbum = new IfeAlbum();
    }

}(window));