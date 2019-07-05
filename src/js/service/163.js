import { addMessageListener } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

const REGEX = /^https:\/\/music\.163\.com(\/|(\/.+)?)$/mg

function shouldHandle() {
    return REGEX.test(window.location.href)
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener((info) => {
            const name = document.querySelector('.play .name').innerText + ' - ' + document.querySelector('.play .by').innerText
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