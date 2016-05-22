
var imgUrls=["http://www.wed114.cn/jiehun/uploads/allimg/150303/39_150303100501_2.jpg",
"http://img5.pcpop.com/ArticleImages/fnw/2016/0331/a1e4454c-5486-4052-b8ab-fd3d699440f9.jpg",
"http://www.ygjj.com/bookpic2/2015-09-11/new533592-20150911125825527112.jpg",'http://7xrbxc.com1.z0.glb.clouddn.com/FuIk5hC-r1k0k5d-mBVpUVer1jDi',
        'http://7xrbxc.com1.z0.glb.clouddn.com/Fmw3-dOXcbLNubC2p8jrGWYQwPAK',
        'http://7xrbxc.com1.z0.glb.clouddn.com/Fpr0wEtkwKGRpBSnmW0uwdTUqApy',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FrP8qwn92YlIuaMqhOlmxpZ31pji',
        'http://7xrbxc.com1.z0.glb.clouddn.com/Fjc61f4EvkmBZHbmtELO9Cz4BqHU',
        'http://7xrbxc.com1.z0.glb.clouddn.com/Fts0MS6lmpRFunfAAqVujKTWKPLd',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FkgnxT_t66CO10dfNwg1iKo-_E4Z',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FuewZJr5wmENwJ-XNnqFrd_N2ecW',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FjWrwKaBB9tN0tCjkih0lKGAEvOn',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FvaOjagiAKaSp6cc-w58LO9Teua0',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FlVS5b8EDUczs1HGH0xoArxVLqbQ',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FpoijcrTNolDBKuxW4z20Uw92g3M',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FpP1ZSgv2uizxyUOmBe0xO9I6AZB',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FrSPBXbpL2Gs4VOTsdqc2OSOP8Qc',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FsS0baJIgkZF2chpk_c1F1OnSfYA',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FmqFVzBlhbczSnzjh53Qz5mSyZkB',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FkI2Z-1Z1xeiI0UK1ckM3iOpY78p',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FsnuRGWOVgeE1Nyb_5OVT9bREXsf',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FreNcgPy2SHOxPbXv09MNyrBW9j4',
        'http://7xrbxc.com1.z0.glb.clouddn.com/Ftgo-yAxfoCXDfMQsEZTD9HXsR52',
        'http://7xrbxc.com1.z0.glb.clouddn.com/Fibqr6ZOxqZLk9W5A6fHH1PkX1wd',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FvIPM8rivGByxAhlKOUXiGr8NycC',
        'http://7xrbxc.com1.z0.glb.clouddn.com/FqhnfTfmwXrhtlLAQ4li1oHa2eNS',
        'http://7xrbxc.com1.z0.glb.clouddn.com/Fhv0Qp2yKYgwh013b_zrjL6igLXD'];
var bimgurls=["http://npic7.edushi.com/cn/zixun/zh-chs/2016-01/07/6-151016161357.jpg",
"http://tu.webps.cn/tb/img/4/T14I5tFOtXXXXXXXXX_%21%210-item_pic.jpg",
"http://img5.pcpop.com/ArticleImages/fnw/2016/0331/a1e4454c-5486-4052-b8ab-fd3d699440f9.jpg",
"http://www.ygjj.com/bookpic2/2015-09-11/new533592-20150911125825527112.jpg"]

window.ifeAlbum.setImage(bimgurls,"PUZZLE");
window.ifeAlbum.rendImageDomElements();

var btn1=document.getElementById("btn1");
btn1.onclick=function(){
    window.ifeAlbum.setImage(bimgurls,"PUZZLE");
    window.ifeAlbum.rendImageDomElements();
}
var btn2=document.getElementById("btn2");
btn2.onclick=function(){
    window.ifeAlbum.setImage(imgUrls,"WATERFALL");
    window.ifeAlbum.rendImageDomElements();
}
var btn3=document.getElementById("btn3");
btn3.onclick=function(){
    window.ifeAlbum.setImage(imgUrls,"BARREL");
    window.ifeAlbum.rendImageDomElements();
}