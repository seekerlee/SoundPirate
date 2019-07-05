import { addMessageListener, addHeaderListener, sendTabsMsg } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundURL, setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

const REGEX = /^https?:\/\/(.+\.)?douban\.fm(\/|(\/.+)?)$/mg
const SOUND_FORMAT = 'mp4'
/*

*/
function backAction() {
    addHeaderListener(
        info => {
            if (info.tabId !== -1) {
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
    return REGEX.test(window.location.href)
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener(() => {
            const songInfo = JSON.parse(localStorage.simpleStorage)
            const current_song = songInfo["douradio-player-state"].current_song;
            const name = current_song.title + ' - ' + current_song.artist;
            setLatestSoundName(name + '.' + SOUND_FORMAT)
            newSound({
                name,
                format: SOUND_FORMAT,
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