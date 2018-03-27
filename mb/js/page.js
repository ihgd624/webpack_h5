   const $=require("webpack-zepto");
   const Zepto=$;
   const touch=require('./touch.js');
   const music=require('./music.js');
   const share=require('./share.js');


   var h5={
                num: 1,
                total : $(".page").length,                
                initHtml : function (){    //初始化class
                   // var AnimateImg = $($(".page" + this.num)).find(".animated");
                    var AnimateImg = $(".page" + this.num).find(".animated");
                    $(AnimateImg).each(function(index, value){
                        var animationStyle = $(this).data("class");
                        $(this).removeClass(animationStyle);
                    })  
                },
                next : function(){
                    if(this.num < this.total){
                        $(".page" + this.num).addClass("fadeOut hide");
                        this.initHtml();
                        this.num++;
                        this.setAnimation(this.num);
                    }
                },
                last : function(){
                    if(this.num > 1){
                        $(".page" + this.num).addClass("fadeOut hide");
                        this.initHtml();
                        this.num--;
                        this.setAnimation(this.num);
                    }
                },          
                setAnimation : function(pageNum){
                    $(".page" + pageNum).removeClass("fadeOut hide");
                    var AnimateImg = $(".page" + pageNum).find(".animated");
                    $(AnimateImg).each(function(index, value){
                        var animationStyle = $(this).data("class");
                        var animationDelay = $(this).data("delay");
                        $(this).addClass(animationStyle).css({
                            "animation-delay":animationDelay,
                            "-webkit-animation-delay":animationDelay
                        });
                    })  
                },                            
                loadImg : function(){
                    var totalNum = 0;
                    var jiazai = 0;
                    var imgs = document.getElementsByTagName("img");
                    var imgLen = imgs.length;        
                    function setBaiNum(bai){
                        $("#baifen_txt").text(bai);
                        if(bai == 100){
                            setTimeout(function(){
                                $(".p1_close").addClass('hide');  
                                $(".pl_bj_d").addClass('hide');                              
                                h5.setAnimation(1);
                                
                            }, 500);
                            
                        }
                    }
                    for(var i = 0; i < imgLen; i++){
                        if(imgs[i].complete){
                            jiazai++;
                            var baifenbi = Math.floor(jiazai/imgLen*100);
                            setBaiNum(baifenbi);
                            continue;
                        }
                        imgs[i].onload = function(){
                            jiazai++;
                            var baifenbi = Math.floor(jiazai/imgLen*100);
                            setBaiNum(baifenbi);
                            
                        }
                    }
                },
                IsPC : function (){
                    var userAgentInfo = navigator.userAgent;
                    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
                    var flag = true;
                    for (var v = 0; v < Agents.length; v++) {
                        if (userAgentInfo.indexOf(Agents[v]) > 0) {
                            flag = false;
                            break;
                        }
                    } 
                    return flag;  
                },
                toPage: function(num){
                    $(".page" + this.num).addClass('hide');
                    //h5.initHtml(this.num-1, $(".page" + this.num));
                    h5.initHtml();
                    h5.setAnimation(num);
                    h5.num = num;
                },
                viewResize : function(){
                    var screen_w=parseInt(window.screen.width),scale=screen_w/750;
                    $("#auto_view").attr("content","width=750, initial-scale = "+scale+",user-scalable=1, minimum-scale = "+scale+", maximum-scale = "+scale);
                    if(h5.IsPC()){
                        document.body.style.margin = "0px auto";
                    }
                },
                window_viewResize:function(){
                        window.onresize = function(){
                            h5.viewResize();
                        }
                },
                AnimationEnd : function(div, style){
                    $(document).on("webkitAnimationEnd", div, function(e){
                        // e.target.oh5setParent.classList.add("pulse", "infinite");
                        $(div + "_parent").addClass(style+" infinite");
                    })                    
                },
                makePage:function(){
                    window.onload = function(){
                        document.addEventListener('touchmove', function (event) {
                            if(h5.num!=5){event.preventDefault();}
                        }, false);  
                        var firstTouch = true; //微博不能自动播放背景音乐
                        $('body').bind("touchstart",function(e){
                            if (firstTouch) { 
                                firstTouch = false; 
                                document.getElementById('theaudio').play();
                            }else{
                                return; 
                            } 
                        }); 

                        $(document).on("touchend",".close",function(){
                            h5.toPage(3);
                        });

                        $(document).on("touchend",".p43",function(){
                            //抽奖
                            h5.isCanCj();
                        });

                        $(document).on("touchend",".p42",function(){
                            h5.toPage(5);
                        });

                        $(document).on("touchend",".p23",function(){
                            h5.next();
                        });

                        $(document).on("touchend",".choose",function(){
                            h5.qnext();
                        });
               
                        $(".page1").swipeUp(function(){ 
                            h5.next();                
                        });
                        $("body").swipeDown(function(){ 
                            h5.last();                
                        });
                        h5.AnimationEnd(".p23","pulse");
                    }
                }
   } 

    module.exports = {
            h5          : h5,
            load        : h5.loadImg(),
            viewResize  : h5.window_viewResize(),
            makePage    : h5.makePage()
    };
  