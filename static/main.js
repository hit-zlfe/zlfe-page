$('section').css(
    {/*
      *let the height of section equals window
      */
        "height":$(window).height(),
    }
)
$(".nav-button").click(function(){
        /*
        * when on the mobile phone we can click the nav-button to appear the nav-link*/
        var oLink=document.getElementById("link");
        var oStyle = oLink.currentStyle? oLink.currentStyle : window.getComputedStyle(oLink, null);

        if(oStyle.display=="none"){
                oLink.style.display="block";
        }
        else{
            oLink.style.display="none";
        }
    }
);
$("section").mouseover(function(){
    /*
    * when on the mobile phone as we mouve mouse on the section the display of nav-link will be none*/
    if(parseInt($(window).width())<960){
        var oLink=document.getElementById("link");
        var oStyle = oLink.currentStyle? oLink.currentStyle : window.getComputedStyle(oLink, null);
        oLink.style.display="none";
    }
});

function handle(delta) {//handle after wheelEnent
    var s = delta + ": ";
    if (delta <0)
    {
        switch(window.location.hash){
            case "":
            case "#home":
                window.location.hash="about";
                break;
            case "#about":
                window.location.hash="works";
                break;
            case "#works":
                window.location.hash="contact";
                break;
            default :
                break;
        }
       //ÏÂ»¬
    }
    else {
        switch(window.location.hash){
            case "#works":
                window.location.hash="about";
                break;
            case "#about":
                window.location.hash="home";
                break;
            case "#contact":
                window.location.hash="works";
                break;
            default :
                break;
            }
    }
}
var bIfScroll =0;/*the key to contral whether handle Function runs*/
function wheel(event){//whellEvent
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta/120;
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail/3;
    }
    if (delta && bIfScroll%2==0)
        handle(delta);
    bIfScroll++;
}

//add whellEvent
if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;