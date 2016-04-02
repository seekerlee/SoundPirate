chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (info.type === 'other' || info.type === 'object') {
      chrome.tabs.sendMessage(info.tabId, {desc: JSON.stringify(info), url: info.url, format: 'mp3', type: 'music'});
      console.log('info sent0');
      console.log(info.requestBody);
      console.log(info );
    }
  },
  // filters
  {
    urls: [
      "http://*/*.mp3*",
      "https://*/*.mp3*",
      "http://*.thesixtyone.com/thesixtyone_production/audio/*",
      "https://*.thesixtyone.com/thesixtyone_production/audio/*",
      "http://*.file.xiami.com/h/*", //for xiami vip
      "http://*.bcbits.com/download/track/*",
      "https://*.bcbits.com/download/track/*", //for bandcamp.com
      "https://*.indievox.com/audio-streamer.php*"
    ]
  }
);
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (info.type === 'other' || info.type === 'object') {
      chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'mp4', type: 'music'});
      console.log('info sent0');
      console.log(info.requestBody);
      console.log(info );
    }
  },
  // filters
  {
    urls: [
      "https://songza.com/*.mp4*",
      "http://songza.com/*.mp4*",
      "http://mn-ecn-prd-http.mndigital.com/*.mp4",
      "https://mn-ecn-prd-http.mndigital.com/*.mp4",
      "http://fp-limelight.musicnet.com/mp3/*.mp4*",
      "https://fp-limelight.musicnet.com/mp3/*.mp4*",
      "https://*.douban.com/*.mp4",
      "http://*.douban.com/*.mp4",
      "http://*.doubanio.com/*.mp4",
      "https://*.doubanio.com/*.mp4",
    ]
  }
);
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (info.type === 'other' || info.type === 'object') {
      chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'mp3', type: 'music', requestBody: info.requestBody});
      console.log('info sent0');
      console.log(info.requestBody);
      console.log(info );
    }
  },
  // filters
  {
    urls: [
      "http://*.grooveshark.com/stream.php*",
      "https://*.grooveshark.com/stream.php*"
    ]
  },
  ['requestBody']
);
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (info.type === 'other' || info.type === 'object') {
      chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'aac', type: 'music'});
      console.log('info sent1');
    }
  },
  {
    urls: [
      "http://*/*.aac*",
      "https://*/*.aac*"
    ]
});
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (info.type === 'other' || info.type === 'object') {
      chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", url: info.url, format: 'm4a', type: 'music'});
      console.log('info sent2');
      console.log(info.frameId);
      console.log(info.parentFrameId );
    }
  },
  {
    urls: [
      "http://*/*.m4a*",
      "https://*/*.m4a*"
    ]
});
chrome.webRequest.onBeforeRequest.addListener(function (info) {
    if (info.type === 'other' || info.type === 'object') {
      return {cancel : true};
    }
	},
	{
		urls  : [
		  "http://*.douban.com/*/rda/*.mp3",
		  "http://*.douban.fm/j/except_report?*"
		]
	},
	["blocking"]
);
