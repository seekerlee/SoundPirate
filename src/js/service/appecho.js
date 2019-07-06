import { addMessageListener } from '../browser'
import { newSound } from '../page/link'
import { setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

function shouldHandle() {
    return document.domain === 'www.app-echo.com'
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener((info) => {
            const name = document.querySelector('.mp-main .panel-center h1').innerText
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