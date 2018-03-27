   const $=require("webpack-zepto");
   const Zepto=$;
 var wechats={
        title:"消防",//标题
        desc:"杜东：不想当将军的士兵不是一个好厨子",//关键字
        link:"",//链接
        imgUrl:""//分享需要的图片
    }
     shareDataF = {
        title:wechats.title,
        desc:wechats.desc,
        link:wechats.link,
        imgUrl: wechats.imgUrl,
    };
    shareDataT = {
        title: wechats.title,
        link:wechats.link, 
        imgUrl:wechats.imgUrl,
    }; 
    function WechatConfig() {
            this.debug = false;
            this.appId = "wx090b31bec4375c37";
            this.timestamp = "1499588391";
            this.nonceStr = "SUaol7U58N0qqRT6";
            this.signature = "36552f93ef6aff772b674e29c35b568dff254dea";
            this.jsApiList = null
    }
    var wechatClient = null;

    function wxShare() {
        wx.ready(function() {
            wx.onMenuShareAppMessage(shareDataF);
            wx.onMenuShareTimeline(shareDataT);
            wx.onMenuShareQQ(shareDataF);
            document.getElementById("theaudio").play();
        });
        wx.error(function(a) {})
    }

    function wxShareConfig() {
        $sd_wx_url = "http://www.sinacq.com/public/wx/sample_jsop.php";
        $.get($sd_wx_url, {
            url: window.location.href
        }, function(a) {
            wechatClient.debug = false;
            wechatClient.appId = a["appId"];
            wechatClient.jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"];
            wechatClient.nonceStr = a["nonceStr"];
            wechatClient.signature = a["signature"];
            wechatClient.timestamp = a["timestamp"];
            wx.config(wechatClient);
            wxShare()
        }, "jsonp")
    }
    $(function() {
        wechatClient = new WechatConfig();
        wxShareConfig();
    });   
         