import { addMessageListener } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

const REGEX = /^https:\/\/music\.douban\.com\/artists\/player\/.*$/mg

function shouldHandle() {
    return REGEX.test(window.location.href)
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener(() => {
            const name = document.querySelector('.song-title').innerText + ' - ' + document.querySelector('.pl-artist').innerText
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