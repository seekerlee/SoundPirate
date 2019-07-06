import {backgroundInit} from './backgroundAction/soundInfo'

backgroundInit()
const files = require.context('./service', false, /\.js$/)

for (const key of files.keys()) {
    if (files(key).backAction) {
        files(key).backAction()
    }
}
