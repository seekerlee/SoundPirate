(function() {
var thisUrl = document.URL;
if(  thisUrl.indexOf('mail.google.com') >= 0
   ||thisUrl.indexOf('plus.google.com') >= 0)
  return;
var filenamep = /(?=\w*\.mp3)|(?=\w*\.mp4)|(?=\w*\.m4a)|(?=\w*\.aac)|(?=\w*\.wma)/i;
var imgURL_MP3 = chrome.extension.getURL("images/music32.png");
var imgURL_AAC = chrome.extension.getURL("images/aac32.png");
var imgURL_M4A = chrome.extension.getURL("images/m4a32.png");
var imgURL_MP4 = chrome.extension.getURL("images/mp432.png");
var imgURL_WMA = chrome.extension.getURL("images/wma32.png");
var imgURLLeftA = chrome.extension.getURL("images/arrowl32.png");
var imgURLRightA = chrome.extension.getURL("images/arrowr32.png");
var divId = "music-pirate";
if(!localStorage.piratePosition) localStorage.piratePosition = 'priate-left';
var onMsg = chrome.runtime.onMessage || chrome.extension.onMessage || chrome.extension.onRequest;
var requestQ = [];
onMsg.addListener(
  function(request, sender, sendResponse) {
    var onMusicReceive = function() {
      // frames
      //if($('body').size() == 0)
      if(!document.getElementById(divId)) {
        $('body').append('<div id="' + divId + '" class="' + localStorage.piratePosition + '"><a id="moveleft" title="' + chrome.i18n.getMessage("moveleft") + '"><img src="' + imgURLLeftA + '"/></a><a id="dlink" download><img src="' + imgURL_MP3 + '"/></a><a id="moveright" title="' + chrome.i18n.getMessage("moveright") + '"><img src="' + imgURLRightA + '"/></a></div>');
        $("#moveright").click(function(){
          $(this).css("display", "none");
          $("#music-pirate").animate({left: document.body.clientWidth - 32}, 500, 'swing', function(){
            $("#music-pirate").attr("style","").removeClass("priate-left").addClass("priate-right");
            $("#moveleft").css("display", "inline-block");
            localStorage.piratePosition = 'priate-right';
          });
        });
        $("#moveleft").click(function(){
          $(this).css("display", "none");
          $("#music-pirate").animate({right: document.body.clientWidth - 46}, 500, 'swing', function(){
            $("#music-pirate").attr("style","").removeClass("priate-right").addClass("priate-left");
            $("#moveright").css("display", "inline-block");
            localStorage.piratePosition = 'priate-left';
          });
        });
        var stopProp = function(e) {e.stopPropagation();};
        $('#dlink').mousedown(stopProp).keydown(stopProp).click(stopProp); //prevent parent event
      }
      console.log(request.desc);
      console.log(request.url);
      var filename;
      var url = request.url;
      //xiami radio will preload the next song
      if(thisUrl.indexOf('www.xiami.com/radio') > 0) {
        if(requestQ.indexOf(url) != -1) return; //when download, another request will be fired. Drop this.
        requestQ.push(request.url);
        if(requestQ.length > 2) {
          requestQ.shift();
        }
        url = requestQ[0];
      }
      if(thisUrl.indexOf('www.xiami.com') > 0) {
        //var songTitle = $(".ui-track-current .ui-row-item-body .c1").text();
        //var songArtist = $(".ui-track-current .ui-row-item-body .c2").text();
        filename = $.trim($('#J_trackInfo').text());
      } else if(thisUrl.indexOf('douban.fm') > 0) {
        var songInfo = JSON.parse(localStorage.bubbler_song_info);
        if(songInfo !== undefined)
            filename = songInfo.song_name + ' - ' + songInfo.artist;
        else
            filename = document.title.substr(0, document.title.indexOf(' - '));
            
      } else if(thisUrl.indexOf('music.douban.com/artists/') > 0) {
        filename = $('.item-stat-play').attr('data-songname') + ' - ' + $('.artist-name a', $('.item-stat-play').parent().parent()).text();
      } else if(thisUrl.indexOf('www.songtaste.com/song') > 0) {
        filename = $('.mid_tit').text();
      } else if(thisUrl.indexOf('www.songtaste.com/playmusic.php') > 0) {
        filename = $.trim($('#songInfo a').text());
      } else if(thisUrl.indexOf('jing.fm') > 0) { //http://cc.cdn.jing.fm/201307271917/310d548af7024a96eb680a5be85f1105/2012/0716/07/NX/2012071607NXJ.m4a?start=68
        if(thisUrl.indexOf('jing.fm/tracks/') > 0) {
          filename = document.title.substr(2, document.title.indexOf(' - Jing') - 2);
        } else {
          var qkPlayBtnSelected = $('.topCvCtn .qkPlay .selected');
          console.log(qkPlayBtnSelected.size());
          if(qkPlayBtnSelected.size() > 0) {
            filename = $('.trckTit', qkPlayBtnSelected.parent()).text();
          } else {
            filename = $.trim($('#mscPlr .tit').text());
          }
        }
        if(url.indexOf('?') > 0) {
          url = url.substr(0, url.indexOf('?'));
        }
      } else if(thisUrl.indexOf('fm.renren.com') > 0) {
        filename = $('#song_name').text() + ' - ' +$('#artist_name a[title]').text();
      } else if(thisUrl.indexOf('play.baidu.com') > 0) {
        filename = document.title.substr(0, document.title.indexOf(' - 百度音乐盒'));
      } else if(thisUrl.indexOf('y.qq.com') > 0) {
        filename = $('#divplayer p.music_name').text() + ' - ' + $('#divplayer .music_info_main .singer_name').text();
      } else if(thisUrl.indexOf('music.163.com') > 0) {
        filename = $('.play .words .fc1').text() + ' - ' + $('.play .words .by').text();
      } else if(thisUrl.indexOf('ting.sina.com.cn') > 0) {
        filename = document.title.substr(0, document.title.indexOf(' - '));
      } else if(thisUrl.indexOf('player.mbox.sogou.com') > 0) {
        filename = document.title.substr(5, document.title.indexOf('-搜狗音乐') - 5);
      } else if(thisUrl.indexOf('soundcloud.com') > 0) {
        filename = document.title;
      } else if(thisUrl.indexOf('fm.qq.com') > 0) {
        filename = $('#divsongname').text();
      } else if(thisUrl.indexOf('kuwo.cn') > 0) {
        filename = document.title.substr(0, document.title.indexOf(' 在线试听'));
      } else if(thisUrl.indexOf('bandcamp.com') > 0) {
        filename = document.title;
      } else if(thisUrl.indexOf('indievox.com') > 0) {
        filename = $('#songLink').text() + " - " + $('#artistLink').text() + " - " + $('#albumLink').text();
      } else if(thisUrl.indexOf('music.so.com') > 0) {
        filename = document.title.substr(0, document.title.indexOf(' - 360音乐盒'));
      } else if(thisUrl.indexOf('5sing.com') > 0) {
	    if(thisUrl.indexOf('fc.5sing.com') > 0) {
	      // 5sing 翻唱
	      filename = $('.mc_info h1').text() + ' - ' + $('.blue strong').text();
	    } else if(thisUrl.indexOf('yc.5sing.com') > 0) {
	      // 5sing  原创
	      filename = $('.mc_info h1').text() + ' - ' + $('.blue strong').text();
	    } else if(thisUrl.indexOf('bz.5sing.com') > 0) {
	      // 5sing 伴奏
	      filename = $('.play_intro_tit h1').text();
	    } else if(thisUrl.indexOf('fm.5sing.com') > 0) {
	      // 5sing 电台
	      filename = $('.sup span a').text();
	    }
      } else if(thisUrl.indexOf('grooveshark.com') > 0) {
          filename = $('#now-playing-metadata .song').text() + ' - ' + $('#now-playing-metadata .artist').text();
          url = url + '?streamKey=' + request.requestBody.formData['streamKey'];
      } else if(thisUrl.indexOf('thesixtyone.com') > 0) {
          filename = $('#song_panel_title').text() + ' - ' + $('#song_panel_artist').text();
      } else if(thisUrl.indexOf('luoo.net') > 0) {
          if(thisUrl.indexOf('discover') > 0) {
            filename = $('#lnTrackName').text();
          } else if(thisUrl.indexOf('essay') > 0) {
            filename = $('#luooPlayerPlaylist .track-name').text();
          } else if(thisUrl.indexOf('single') > 0) {
            filename = $('.jp-playlist-current .jp-playlist-current').text();
          } else if(thisUrl.indexOf('music') > 0) {
            filename = $('.luoo-player .track-name').text() + ' - ' + $('.luoo-player .artist').text();
          }
      } else if(thisUrl.indexOf('1ting.com') > 0) {
		  var idx = document.title.indexOf('免费在线试听');
		  if(idx != -1) {
	        // 第一次收听例外, 默认即为"曲名_歌手名"的命名方式
		    filename = $.trim(document.title.substr(0, idx));
		  }
		  else {
		    //为防止英文歌曲有多个空格，先确定歌手名字
		    var idx_begin = document.title.indexOf('歌词下载_') + 5;
		    var length = document.title.indexOf('专辑') - idx_begin;
		    var artist_name = $.trim(document.title.substr(idx_begin, length));
		    console.log('artist ' + artist_name); 

		    idx_begin = document.title.indexOf(artist_name) + artist_name.length;
		    length = document.title.indexOf('在线试听') - idx_begin;
		    var song_name = $.trim(document.title.substr(idx_begin, length));; 
		    console.log('song ' + song_name); 

		    filename = song_name + ' - ' + artist_name ;
		  }
	  }
	 
      if(!filename) {
        filename = filenamep.exec(url);
      } else {
        filename = $.trim(filename) + '.' + request.format;
      }
      
      // remain the old download code for failback
      $('#dlink').attr('download', filename).attr('title', filename).attr('href', url);
	  
      // chrome doesn't support download attribute for cross-site request, 
      // so use the code below to work around
      if (url !== window.currentMusicUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onload = function(e) {
          var res = xhr.response;
          var blob = new Blob([res], {type:"audio/mpeg"});

          window.URL.revokeObjectURL(window.downloadUrl);
          window.currentMusicUrl = url;
          window.downloadUrl = window.URL.createObjectURL(blob);
          document.getElementById('dlink').href = downloadUrl;
        };
        xhr.send();
      }
	  
      (function(deg){
        var degnow = 0;
        var ro = function(){
          if(degnow === 360) return;
          degnow = degnow + deg;
          $("#music-pirate #dlink").css({'-webkit-transform': 'rotate(' + degnow + 'deg)',
                                          'transform': 'rotate(' + degnow + 'deg)'});
          setTimeout(ro, 20);
        };
        ro();
      })(12);
      if(request.format === 'aac') {
        $("#music-pirate #dlink img")[0].src = imgURL_AAC;
      } else if(request.format === 'm4a') {
        $("#music-pirate #dlink img")[0].src = imgURL_M4A;
      } else if(request.format === 'mp4') {
        $("#music-pirate #dlink img")[0].src = imgURL_MP4;
      } else if(request.format === 'wma') {
        $("#music-pirate #dlink img")[0].src = imgURL_WMA;
      }
    };
    if(request.type === 'music') {
      onMusicReceive();
    }
});
})();
