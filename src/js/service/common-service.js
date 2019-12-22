import { addMessageListener, addHeaderListener, sendTabsMsg } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundURL, setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

function shouldHandle(url) {
    // add more exclude here:
    // exclude gmail https://ssl.gstatic.com/chat/sounds/incoming_message_eb39ce414e3ffba41a8e173581dc7248.mp3
    return !url.includes('gstatic.com/chat/sounds')
}

function backAction() {
    addHeaderListener(
        info => {
            if (info.tabId !== -1 && shouldHandle(info.url)) {
                console.log('captured mp3: ' + info.url)
                info.soundFormat = 'mp3'
                sendTabsMsg(info.tabId, info)
                setLatestSoundURL(info.url)
            }
        },
        {
            urls: [
                "*://*/*.mp3",
                "*://*/*.mp3?*"
            ]
        }
    )
    addHeaderListener(
        info => {
            if (info.tabId !== -1) {
                console.log('captured m4a: ' + info.url)
                info.soundFormat = 'm4a'
                sendTabsMsg(info.tabId, info)
                setLatestSoundURL(info.url)
            }
        },
        {
            urls: [
                "*://*/*.m4a",
                "*://*/*.m4a?*"
            ]
        }
    )
    addHeaderListener(
        info => {
            if (info.tabId !== -1) {
                console.log('captured aac: ' + info.url)
                info.soundFormat = 'aac'
                sendTabsMsg(info.tabId, info)
                setLatestSoundURL(info.url)
            }
        },
        {
            urls: [
                "*://*/*.aac",
                "*://*/*.aac?*"
            ]
        }
    )
    addHeaderListener(
        info => {
            if (info.tabId !== -1) {
                console.log('captured ogg: ' + info.url)
                info.soundFormat = 'ogg'
                sendTabsMsg(info.tabId, info)
                setLatestSoundURL(info.url)
            }
        },
        {
            urls: [
                "*://*/*.ogg",
                "*://*/*.ogg?*"
            ]
        }
    )
}

function pageAction() {
    addMessageListener((info) => {
        const name = document.title
        setLatestSoundName(name + '.' + info.soundFormat)
        newSound({
            name,
            format: info.soundFormat,
            action: downloadLatestSound
        })
    })
}

export {
    backAction,
    pageAction
}
