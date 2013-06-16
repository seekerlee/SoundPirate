var thisUrl = document.URL;
var filenamep = /\w*\.mp3/i;
var imgURL = chrome.extension.getURL("images/music32.png");
var imgURLLeftA = chrome.extension.getURL("images/arrowl32.png");
var imgURLRightA = chrome.extension.getURL("images/arrowr32.png");
var divId = "music-pirate";
var defaultClass = "priate-left";
var onMsg = chrome.runtime.onMessage || chrome.extension.onMessage || chrome.extension.onRequest;
onMsg.addListener(
  function(request, sender, sendResponse) {
    var filename;
    console.log(request.desc);
    console.log(request.musicUrl);
    if(!document.getElementById(divId)) {
      $('body').append('<div id="' + divId + '" class="' + defaultClass + '"></div>');
    }
	if(thisUrl.indexOf('www.xiami.com') > 0) {
	  filename = document.title.substr(0, document.title.indexOf('—')) + '.mp3';
	} else if(thisUrl.indexOf('douban.fm') > 0) {
	  filename = document.title.substr(0, document.title.indexOf(' - ')) + '.mp3';
	} else if(thisUrl.indexOf('music.douban.com/artists/') > 0) {
	  filename = $('.item-stat-play').attr('data-songname') + ' - ' + $('.artist-name a', $('.item-stat-play').parent().parent()).text() + '.mp3';
	} else if(thisUrl.indexOf('www.songtaste.com/song') > 0) {
	  filename = $('.mid_tit').text() + '.mp3';
	} else if(thisUrl.indexOf('www.songtaste.com/playmusic.php') > 0) {
	  filename = $.trim($('#songInfo a').text()) + '.mp3';
	} else if(thisUrl.indexOf('fm.renren.com') > 0) {
	  filename = $('#song_name').text() + ' - ' +$('#artist_name a[title]').text() + '.mp3';
	} else if(thisUrl.indexOf('play.baidu.com') > 0) {
	  filename = document.title.substr(0, document.title.indexOf(' - 百度音乐盒')) + '.mp3';
	} else if(thisUrl.indexOf('y.qq.com') > 0) {
	  filename = $('#divplayer p.music_name').text() + ' - ' + $('#divplayer .music_info_main .singer_name').text() + '.mp3';
	} else if(thisUrl.indexOf('music.163.com') > 0) {
	  filename = $('.play .words .fc1').text() + ' - ' + $('.play .words .by').text() + '.mp3';
	} else if(thisUrl.indexOf('ting.sina.com.cn') > 0) {
	  filename = document.title.substr(0, document.title.indexOf(' - ')) + '.mp3';
	} else if(thisUrl.indexOf('player.mbox.sogou.com') > 0) {
	  filename = document.title.substr(5, document.title.indexOf('-搜狗音乐') - 5) + '.mp3';
	} else {
      filename = filenamep.exec(request.musicUrl);
	}
    $('#' + divId).html('<a id="moveleft" title="move left"><img src="' + imgURLLeftA + '"/></a><a id="dlink" download="' + filename + '" href="' + request.musicUrl + '" title="' + filename + '"><img src="' + imgURL + '"/></a><a id="moveright" title="move right"><img src="' + imgURLRightA + '"/></a>');
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
	$("#moveright").click(function(){
	  $("#music-pirate").animate({left: window.innerWidth - 32}, 500, 'swing', function(){
	    $("#music-pirate").removeAttr('style').removeClass("priate-left").addClass("priate-right");
	  });
	  $("#moveleft").css("display", "inline-block");
	  $("#moveright").css("display", "none");
	});
	$("#moveleft").click(function(){
	  $("#music-pirate").animate({right: window.innerWidth - 32}, 500, 'swing', function(){
	    $("#music-pirate").removeAttr('style').removeClass("priate-right").addClass("priate-left");
	  });
	  $("#moveright").css("display", "inline-block");
	  $("#moveleft").css("display", "none");
	});
});