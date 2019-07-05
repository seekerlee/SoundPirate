import "../css/pirate.scss"

const files = require.context('./service', false, /\.js$/)
let handled = false

for (const key of files.keys()) {
    if (key === './common-service.js') {
        continue
    }
    
    handled = files(key).pageAction()
    
    if (handled) {
        console.log("SoundPirate directly support this website")
        break
    }
}

if (!handled) {
    files('./common-service.js').pageAction()
}