const WRAPPED_ID          = "__sound-pirate"
const WRAPPED_CLASS_LEFT  = "__sound-pirate-at-left"
const WRAPPED_CLASS_RIGHT = "__sound-pirate-at-right"
const CLASS_TO_LEFT  = "__sound-pirate-to-left"
const CLASS_DOWNLOAD = "__sound-pirate-download"
const CLASS_TO_RIGHT = "__sound-pirate-to-right"

const IMG_MP3   = chrome.extension.getURL("img/music32.png");
const IMG_AAC   = chrome.extension.getURL("img/aac32.png");
const IMG_M4A   = chrome.extension.getURL("img/m4a32.png");
const IMG_MP4   = chrome.extension.getURL("img/mp432.png");
const IMG_LEFT  = chrome.extension.getURL("img/arrowl32.png");
const IMG_RIGHT = chrome.extension.getURL("img/arrowr32.png");

function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    return div.firstChild; 
}

let pirateDiv = null
let downLoadA = null
let musicIMG = null

/*
`<div id="${WRAPPED_ID}" class="${position}">
    <a class="${CLASS_TO_LEFT}"><img src="${IMG_LEFT}"/></a>
    <a class="${CLASS_DOWNLOAD}" download><img src="${IMG_MP3}"/></a>
    <a class="${CLASS_TO_RIGHT}"><img src="${IMG_RIGHT}"/></a>
</div>`
*/
function createIfNone() {
    if (pirateDiv) return pirateDiv

    const positionClass = localStorage.piratePosition || WRAPPED_CLASS_LEFT
    pirateDiv = document.createElement('div')
    pirateDiv.id = WRAPPED_ID
    pirateDiv.className = positionClass
    pirateDiv.innerHTML = `
    <a class="${CLASS_TO_LEFT}"><img src="${IMG_LEFT}"/></a>
    <a class="${CLASS_DOWNLOAD}" download><img src="${IMG_MP3}"/></a>
    <a class="${CLASS_TO_RIGHT}"><img src="${IMG_RIGHT}"/></a>`

    document.body.appendChild(pirateDiv)

    downLoadA = pirateDiv.querySelector(`.${CLASS_DOWNLOAD}`)
    // add actions

}

export function setSoundName(name) {
    if (name) {
        downLoadA.setAttribute('download', name) // only works for same origin
    } else {
        downLoadA.removeAttribute('download')
    }
    downLoadA.setAttribute('title', name)
}

export function newSound(soundInfo) {
    createIfNone()
    const { url, name, format, action } = soundInfo

    if (url) {
        downLoadA.setAttribute('href', url)
    } else {
        downLoadA.removeAttribute('href')
    }

    setSoundName(name)

    if (format) {
        // change icon
    }

    if (action) {
        downLoadA.onclick = (event) => {
            action()
            event.preventDefault()
            event.stopPropagation()
        }
    }
}
