chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'mp3', type: 'music'});
    console.log('info sent0');
    console.log(info.requestBody);
    console.log(info );
  },
  // filters
  {
    urls: [
      "http://*/*.mp3*",
      "https://*/*.mp3*",
      "http://*.file.xiami.com/h/*", //for xiami vip
      "http://*.bcbits.com/download/track/*", //for bandcamp.com
      "https://*.indievox.com/audio-streamer.php*",
	  "https://songza.com/*.mp4*",
	  "http://songza.com/*.mp4*"//songza.com
                "https://*.douban.com/*.mp4", 
                "http://*.douban.com/*.mp4"
    ],
    types:[
      "other", "object"
    ]
  }
);


chrome.webRequest.onBeforeRequest.addListener(function (info) {
		return {cancel : true};
	},
// filters
	{

		urls  : [
			"http://mr*.douban.com/*/rda/*.mp3",
			"http://douban.fm/j/*.mp3"
			],
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

);
//filtering ad in douban
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'mp3', type: 'music', requestBody: info.requestBody});
    console.log('info sent0');
    console.log(info.requestBody);
    console.log(info );
  },
  // filters
  {
    urls: [
      "http://*.grooveshark.com/stream.php*"
    ],
    types:[
      "other", "object"
    ]
  },
  ['requestBody']
  );
