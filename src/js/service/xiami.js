import { addMessageListener } from '../browser'
import * as link from '../page/link'
import { setLatestSoundName, downloadLatestSound } from '../backgroundAction/soundInfo'

const REGEX = /^https?:\/\/(.+\.)?xiami\.com(\/|(\/.+)?)$/mg
const SOUND_FORMAT = 'mp3'
/*
高品质：https://s320.xiami.net/821/1276275821/2102956053/1797966413_1511336432453.mp3?ccode=xiami_web_web&expire=86400&duration=362&psid=b00854063351552c6b27b228e5eb60ff&ups_client_netip=101.228.137.109&ups_ts=1562219179&ups_userid=1938672&utid=BWVvEURrITcCAXjMOBfcAtol&vid=1797966413&fn=1797966413_1511336432453.mp3&vkey=B5b78fa8e9bf76050161b894cfc77a48e
标准：  https://s128.xiami.net/821/1276275821/2102956053/1797966413_1511336432453.mp3?ccode=xiami_web_web&expire=86400&duration=362&psid=b00854063351552c6b27b228e5eb60ff&ups_client_netip=101.228.137.109&ups_ts=1562219179&ups_userid=1938672&utid=BWVvEURrITcCAXjMOBfcAtol&vid=1797966413&fn=1797966413_1511336432453.mp3&vkey=B5b78fa8e9bf76050161b894cfc77a48e
*/

function shouldHandle() {
    return REGEX.test(window.location.href)
}

function pageAction() {
    const handle = shouldHandle()
    if (handle) {
        addMessageListener(() => {
            function getSoundName() {
                const ele = document.querySelector("#J_trackInfo")
                if (ele) {
                    // for https://emumo.xiami.com/play 旧版
                    return ele.innerText.trim()
                } 
                const ele2 = document.querySelector(".play-bar .music .info .title")
                if (ele2) {
                    // for https://www.xiami.com/ 新版
                    return (ele2.innerText.trim()
                        + ' - '
                        + document.querySelector(".play-bar .music .info .singers").innerText.trim()).trim() // trim 首次载入两秒内下载 bug fix
                }
                // for https://emumo.xiami.com/radio/ 虾米电台
                // title: {音乐名}——虾小米打碟中……
                return document.title.substring(0, document.title.length - 10)
            }
            let name = getSoundName()
            setLatestSoundName(name + '.' + SOUND_FORMAT)

            setTimeout(()=>{
                // xiami 电台的 title 更改慢一个节拍，影响链接上的 title， delay 2 秒处理
                // https://www.xiami.com/ 首次载入时也获取不到音乐名，delay 2 秒也可以修正
                let name = getSoundName()
                setLatestSoundName(name + '.' + SOUND_FORMAT)
                link.setSoundName(name)
            }, 2000)

            link.newSound({
                name,
                format: SOUND_FORMAT,
                action: () => {
                    downloadLatestSound()
                }
            })
        })
    }
    return handle
}

export {
    pageAction
}