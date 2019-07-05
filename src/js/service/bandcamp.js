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
        // https://t4.bcbits.com/stream/74e1c338673216c3a85041a4f47519ef/mp3-128/3952952926?p=0&ts=1562423234&t=60508881ecd12848a40f45b9874c69fe3ea4f6a9&token=1562423234_0acf646366e9cdd14a0f9ada28733a7cd70c9541
        {
            urls: [
                "*://*.bcbits.com/stream/*"
            ]
        }
    )
}


function shouldHandle() {
    return document.domain.indexOf('bandcamp.com') > 0
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener((info) => {
            const name = document.title // page is a mess, hard to get name
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