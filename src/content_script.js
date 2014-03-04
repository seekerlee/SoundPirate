//TODO: i18n!
var thisUrl = document.URL;
var filenamep = /(?=\w*\.mp3)|(?=\w*\.mp4)|(?=\w*\.m4a)|(?=\w*\.aac)/i;
var imgURL_MP3 = chrome.extension.getURL("images/music32.png");
var imgURL_AAC = chrome.extension.getURL("images/aac32.png");
var imgURL_M4A = chrome.extension.getURL("images/m4a32.png");
var imgURLLeftA = chrome.extension.getURL("images/arrowl32.png");
var imgURLRightA = chrome.extension.getURL("images/arrowr32.png");
var divId = "music-pirate";
if (!localStorage.piratePosition) localStorage.piratePosition = 'priate-left'
var onMsg = chrome.runtime.onMessage || chrome.extension.onMessage || chrome.extension.onRequest;
var requestQ = [];
onMsg.addListener(
	function (request, sender, sendResponse) {
		var onMusicReceive = function () {
			if (!document.getElementById(divId)) {
				$('body').append('<div id="' + divId + '" class="' + localStorage.piratePosition + '"><a id="moveleft" title="' + chrome.i18n.getMessage("moveleft") + '"><img src="' + imgURLLeftA + '"/></a><a id="dlink"><img src="' + imgURL_MP3 + '"/></a><a id="moveright" title="' + chrome.i18n.getMessage("moveright") + '"><img src="' + imgURLRightA + '"/></a></div>');
				$("#moveright").on('click', function () {
					$("#moveright").css("display", "none");
					$("#music-pirate").animate({left : document.body.clientWidth - 32}, 500, 'swing', function () {
						$("#music-pirate").attr("style", "").removeClass("priate-left").addClass("priate-right");
						$("#moveleft").css("display", "inline-block"); 
						localStorage.piratePosition = 'priate-right';
					});
				}); 
				$("#moveleft").on('click', function () {
					$("#moveleft").css("display", "none");
					$("#music-pirate").animate({right : document.body.clientWidth - 46}, 500, 'swing', function () {
						$("#music-pirate").attr("style", "").removeClass("priate-right").addClass("priate-left");
						$("#moveright").css("display", "inline-block");
						localStorage.piratePosition = 'priate-left';
					});
				});
				var stopProp = function (e) {
					e.stopPropagation();
				};
				$('#dlink').mousedown(stopProp).keydown(stopProp).click(stopProp); //prevent parent event
				
			}
			//console.log(request.obj);
			//console.log(request.url);
			//console.log(request.format);
			var filename;
			var url = request.url;
			//xiami radio will preload the next song
			if (thisUrl.indexOf('www.xiami.com/radio') > 0) {
				if (requestQ.indexOf(url) != -1) return; //when download, another request will be fired. Drop this.
				requestQ.push(request.url);
				if (requestQ.length > 2) {
					requestQ.shift();
				}
				url = requestQ[0];
			}
			if (thisUrl.indexOf('www.xiami.com') > 0) {
				var songTitle = document.title.substr(0, document.title.indexOf('—'));
				filename = songTitle;
				if (sessionStorage.xiamiPlayList) {
					$xml = $($.parseXML(sessionStorage.xiamiPlayList));
					var songArtist = $("artist", $("title:contains('" + songTitle + "')", $xml).parent()).text();
					if (songArtist) {
						filename = filename + ' - ' + songArtist;
					}
				}
			} else if (thisUrl.indexOf('douban.fm') > 0) {
				filename = document.title.substr(0, document.title.indexOf(' - '));
			} else if (thisUrl.indexOf('music.douban.com/artists/') > 0) {
				filename = $('.item-stat-play').attr('data-songname') + ' - ' + $('.artist-name a', $('.item-stat-play').parent().parent()).text();
			} else if (thisUrl.indexOf('www.songtaste.com/song') > 0) {
				filename = $('.mid_tit').text();
			} else if (thisUrl.indexOf('www.songtaste.com/playmusic.php') > 0) {
				filename = $.trim($('#songInfo a').text());
			} else if (thisUrl.indexOf('jing.fm') > 0) { //http://cc.cdn.jing.fm/201307271917/310d548af7024a96eb680a5be85f1105/2012/0716/07/NX/2012071607NXJ.m4a?start=68
				if (thisUrl.indexOf('jing.fm/tracks/') > 0) {
					filename = document.title.substr(2, document.title.indexOf(' - Jing') - 2);
				} else {
					var qkPlayBtnSelected = $('.topCvCtn .qkPlay .selected');
					console.log(qkPlayBtnSelected.size());
					if (qkPlayBtnSelected.size() > 0) {
						filename = $('.trckTit', qkPlayBtnSelected.parent()).text();
					} else {
						filename = $.trim($('#mscPlr .tit').text());
					}
				}
				if (url.indexOf('?') > 0) {
					url = url.substr(0, url.indexOf('?'));
				}
			} else if (thisUrl.indexOf('fm.renren.com') > 0) {
				filename = $('#song_name').text() + ' - ' + $('#artist_name a[title]').text();
			} else if (thisUrl.indexOf('play.baidu.com') > 0) {
				filename = document.title.substr(0, document.title.indexOf(' - 百度音乐盒'));
			} else if (thisUrl.indexOf('y.qq.com') > 0) {
				filename = $('#divplayer p.music_name').text() + ' - ' + $('#divplayer .music_info_main .singer_name').text();
			} else if (thisUrl.indexOf('music.163.com') > 0) {
				filename = $('.play .words .fc1').text() + ' - ' + $('.play .words .by').text();
			} else if (thisUrl.indexOf('ting.sina.com.cn') > 0) {
				filename = document.title.substr(0, document.title.indexOf(' - '));
			} else if (thisUrl.indexOf('player.mbox.sogou.com') > 0) {
				filename = document.title.substr(5, document.title.indexOf('-搜狗音乐') - 5);
			} else if (thisUrl.indexOf('soundcloud.com') > 0) {
				filename = document.title;
			} else if (thisUrl.indexOf('fm.qq.com') > 0) {
				filename = $('#divsongname').text();
			} else if (thisUrl.indexOf('kuwo.cn') > 0) {
				filename = document.title.substr(0, document.title.indexOf(' 在线试听'));
			} else if (thisUrl.indexOf('bandcamp.com') > 0) {
				filename = document.title;
			} else if (thisUrl.indexOf('indievox.com') > 0) {
				filename = $('#songLink').text() + " - " + $('#artistLink').text() + " - " + $('#albumLink').text();
			} else if (thisUrl.indexOf('music.so.com') > 0) {
				filename = document.title.substr(0, document.title.indexOf(' - 360音乐盒'));
			}
			if (!filename) {
				filename = filenamep.exec(url);
			} else {
				filename = filename + '.' + request.format;
			}
			$('#dlink').attr('download', filename).attr('title', filename).attr('href', url);
			(function (deg) {
				var degnow = 0;
				var ro = function () {
					if (degnow === 360) return;
					degnow = degnow + deg;
					$("#music-pirate #dlink").css({'-webkit-transform' : 'rotate(' + degnow + 'deg)',
						'transform'                                    : 'rotate(' + degnow + 'deg)'});
					setTimeout(ro, 20);
				};
				ro();
			})(12);
			if (request.format === 'aac') {
				$("#music-pirate #dlink img")[0].src = imgURL_AAC;
			} else if (request.format === 'm4a') {
				$("#music-pirate #dlink img")[0].src = imgURL_M4A;
			}
		};
		if (request.type === 'music') {
			onMusicReceive();
		} else if (request.type === 'xiami_play_list') {
			$.get(request.url, function (data) {
				if (!sessionStorage.xiamiPlayList) {
					sessionStorage.xiamiPlayList = data;
					console.log('xiami play list saved');
				} else { //TODO: append new playlist

				}
			}, 'text');
		}
		var onXiamiPlayListReceive = function () {

		};

	});
