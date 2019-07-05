
import { addRuntimeListener, sendRuntimeMsg } from '../browser'
const filenamify = require('filenamify')
let latestSoundURL
let latestSoundName

function backgroundInit() {
    function download() {
        chrome.downloads.download({
            url: latestSoundURL,
            filename: latestSoundName
        })
    }
    addRuntimeListener( msg => {
        if (msg.action === 'download') {
            download()
        } else if (msg.action === 'setName') {
            latestSoundName = filenamify(msg.name)
            chrome.browserAction.setTitle({title: `声海盗\n点击下载 ${msg.name}\n`})
        }
    })
    
    chrome.browserAction.onClicked.addListener(() => {
        download()
    })
}

function setLatestSoundURL(url) {
    latestSoundURL = url
}

function setLatestSoundName(name) {
    sendRuntimeMsg(null, {
        action: "setName",
        name
    })
}

function downloadLatestSound() {
    sendRuntimeMsg(null, {
        action: "download"
    })
}

export {
    backgroundInit,
    setLatestSoundURL,
    setLatestSoundName,
    downloadLatestSound
}