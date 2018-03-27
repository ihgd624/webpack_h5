   const $=require("webpack-zepto");
   const Zepto=$;
   
       var audio;
        playmusic('http://n.sinaimg.cn/cq/h5zt/mp3/20180322xf_music.mp3');
        $('#start').bind('click',function(){
            playOrPaused(this); 
        });
        function playmusic(music_src){
            $('.Vbody').append('<div id="audiobox"><span id="radmark"></span><p class="icon-music" id="start"></p></div>');
            audio =  document.createElement("audio");
            audio.id = 'theaudio';
            audio.loop = 'loop';
            audio.autoplay='autoplay';
            audio.src = music_src;
            $('#audiobox').append(audio);
            $('#start').addClass('rotate'); 
            audio = document.getElementById('theaudio');
            playOrPaused(this); 
        }
        function playOrPaused(obj){
            if(audio.paused){
                audio.play();
                $('#start').addClass('rotate'); 
                $('#radmark').addClass('radmark-show');
                $('#radmark').html('播放');
                setTimeout(function(){ $('#radmark').removeClass('radmark-show'); },1000);
                return;
            }
            audio.pause();
            $('#start').removeClass('rotate');  
            $('#radmark').addClass('radmark-show');
            $('#radmark').html('暂停');
            setTimeout(function(){ $('#radmark').removeClass('radmark-show'); },1000);
        }