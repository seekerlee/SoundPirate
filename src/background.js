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
	  "http://*.thesixtyone.com/thesixtyone_production/audio/*",
      "http://*.file.xiami.com/h/*", //for xiami vip
      "http://*.bcbits.com/download/track/*", //for bandcamp.com
      "https://*.indievox.com/audio-streamer.php*",
    ],
    types:[
      "other", "object"
    ]
  }
);
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'mp4', type: 'music'});
    console.log('info sent0');
    console.log(info.requestBody);
    console.log(info );
  },
  // filters
  {
    urls: [
      "https://songza.com/*.mp4*",
      "http://songza.com/*.mp4*",
      "http://fp-limelight.musicnet.com/mp3/*.mp4*",
      "https://*.douban.com/*.mp4",
      "http://*.douban.com/*.mp4"
    ],
    types:[
      "other", "object"
    ]
  }
);
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
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'aac', type: 'music'});
    console.log('info sent1');
  },
  {
    urls: [
      "http://*/*.aac*",
      "https://*/*.aac*"
    ],
    types:[
      "other", "object"
    ]
});
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'm4a', type: 'music'});
    console.log('info sent2');
    console.log(info.frameId);
    console.log(info.parentFrameId );
  },
  {
    urls: [
      "http://*/*.m4a*",
      "https://*/*.m4a*"
    ],
    types:[
      "other", "object"
    ]
});
chrome.webRequest.onBeforeRequest.addListener(function (info) {
		return {cancel : true};
	},
	{
		urls  : [
		  "http://*.douban.com/*/rda/*.mp3",
		  "http://*.douban.fm/j/except_report?*"
		],
		types : ["other", "object"]
	},
	["blocking"]
);
