chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
	chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", musicUrl: info.url});
  },
  // filters
  {
    urls: [
      "http://*/*.mp3*"
    ],
	types:[
	  "other", "object"
	]
  });