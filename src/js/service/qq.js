import { addMessageListener, } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

function shouldHandle() {
    return window.location.href.indexOf('://y.qq.com/portal/player.html') > 0
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener((info) => {
            const name = document.querySelector('#sim_song_info').innerText
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
    pageAction
}