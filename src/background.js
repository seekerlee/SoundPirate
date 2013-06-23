chrome.webRequest.onHeadersReceived.addListener(
  function(info) {
    chrome.tabs.sendMessage(info.tabId, {desc: "You got a new song!", musicUrl: info.url});
    console.log('info sent');
  },
  // filters
  {
    urls: [
      "http://*/*.mp3*",
      "http://*.file.xiami.com/h/*" //for xiami vip
    ],
    types:[
      "other", "object"
    ]
  });