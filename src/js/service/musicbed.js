import { addMessageListener, addHeaderListener, sendTabsMsg } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundURL, setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

function backAction() {
    addHeaderListener(
        info => {
            if (info.tabId !== -1) {
                info.soundFormat = 'mp3'
                sendTabsMsg(info.tabId, info)
                setLatestSoundURL(info.url)
            }
        },
        {
            urls: [
                // captured mp3: https://cdn.musicbed.com/video/authenticated/s--_AaSUAap--/af_48000,br_128k,so_0.012/v1554924209/production/songs/34885.mp3
                "*://*.musicbed.com/*.mp3",
            ]
        }
    )
    addHeaderListener(
        info => {
            if (info.tabId !== -1) {
                info.soundFormat = 'ogg'
                sendTabsMsg(info.tabId, info)
                setLatestSoundURL(info.url)
            }
        },
        {
            urls: [
                "*://*.musicbed.com/*.ogg",
            ]
        }
    )
}

function shouldHandle() {
    return document.domain === 'www.musicbed.com' || document.domain === 'musicbed.com'
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener((info) => {
            const songInfo = JSON.parse(localStorage['mb.PlayerStateNovus'])
            const current_song = songInfo.loadedSong
            let name = current_song.name
            let artist
            if (current_song.album && current_song.album.artist) {
                artist = current_song.album.artist.name
                name = name + ' - ' + artist
            }
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
