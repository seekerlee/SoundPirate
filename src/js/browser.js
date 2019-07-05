function addMessageListener(func) {
    chrome.runtime.onMessage.addListener(func)
}
function sendRuntimeMsg(extensionId, message, options, responseCallback) {
    chrome.runtime.sendMessage(extensionId, message, options, responseCallback)
}
function addRuntimeListener(func) {
    chrome.runtime.onMessage.addListener(func)
}
function addHeaderListener(func, filter, extra) {
    chrome.webRequest.onHeadersReceived.addListener(func, filter, extra)
}
function sendTabsMsg(tabId, info) {
    chrome.tabs.sendMessage(tabId, info)
}
export {
    addMessageListener, addHeaderListener, sendTabsMsg, sendRuntimeMsg, addRuntimeListener
}