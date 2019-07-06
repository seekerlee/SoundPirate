import { addMessageListener } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

function shouldHandle() {
    return document.domain.indexOf('play.taihe.com') == 0
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener((info) => {
            const name = document.querySelector('#playPanel .title').innerText
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