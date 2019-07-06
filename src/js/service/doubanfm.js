import { addMessageListener, addHeaderListener, sendTabsMsg } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundURL, setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

/*

*/
function backAction() {
    addHeaderListener(
        info => {
            if (info.tabId !== -1) {
                info.soundFormat = 'mp4'
                sendTabsMsg(info.tabId, info)
                setLatestSoundURL(info.url)
            }
        },
        // filters
        {
            urls: [
                "*://*.douban.com/*.mp4", // 需要例子
                "*://*.doubanio.com/*.mp4",
            ]
        }
    )
}

function shouldHandle() {
    return document.domain === 'fm.douban.com' || document.domain === 'douban.fm'
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener((info) => {
            const songInfo = JSON.parse(localStorage.simpleStorage)
            const current_song = songInfo["douradio-player-state"].current_song;
            const name = current_song.title + ' - ' + current_song.artist;
            setLatestSoundName(name + '.' + info.soundFormat)
            newSound({
                name,
                format: info.soundFormat,
                action: downloadLatestSound
            })
        })
    }
    return handle
}

export {
    backAction,
    pageAction
}