chrome.webRequest.onBeforeRequest.addListener(function (info) {
		chrome.tabs.sendMessage(info.tabId, {
			desc   : "You got a new song!",
			url    : info.url,
			obj    : info,
			format : 'mp3',
			type   : 'music'
		});


	},
// filters
	{
		urls  : ["http://douban.fm/j/", "http://*/*.mp3*", "https://*/*.mp3*", "http://*.file.xiami.com/h/*", //for xiami vip
			"http://*.bcbits.com/download/track/*", //for bandcamp.com
			"https://*.indievox.com/audio-streamer.php*"],
		types : ["other", "object"]
	});
/*
 chrome.webRequest.chrome.webRequest.onCompleted.addListener(function (info) {
 console.log('got the list');

 },
 {
 urls  : ["*://douban.fm/j*playlist"],
 types : ["xmlhttprequest", "other"]
 }

 );.addListener(function (info) {
 console.log('got the list');

 },
 {
 urls  : ["*://douban.fm/j*playlist"],
 types : ["xmlhttprequest", "other"]
 }

 );
 */


chrome.webRequest.onBeforeRequest.addListener(function (info) {
		return {cancel : true};
	},
// filters
	{
		urls  : ["http://*/*.flv*"],
		types : ["other", "object"]
	},
	["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(function (info) {
	chrome.tabs.sendMessage(info.tabId, {
		desc   : "You got a new song!",
		url    : info.url,
		format : 'aac',
		type   : 'music'
	});
	console.log('info sent');
}, {
	urls  : ["http://*/*.aac*", "https://*/*.aac*"],
	types : ["other", "object"]
});
chrome.webRequest.onBeforeRequest.addListener(function (info) {
	chrome.tabs.sendMessage(info.tabId, {
		desc   : "You got a new song!",
		url    : info.url,
		format : 'm4a',
		type   : 'music'
	});
	console.log('info sent');
}, {
	urls  : ["http://*/*.m4a*", "https://*/*.m4a*"],
	types : ["other", "object"]
});
chrome.webRequest.onBeforeRequest.addListener(function (info) {
	chrome.tabs.sendMessage(info.tabId, {
		desc : "You got a new playlist!",
		url  : info.url,
		type : 'xiami_play_list'
	});
	console.log('info sent');
}, {
	urls  : ["http://www.xiami.com/song/playlist/*" //xiami playlist, to retrieve music info.
	],
	types : ["other", "object"]
});
