function updateIcon() {
  chrome.browserAction.setIcon({path: "logo-passed.png"});
}

chrome.browserAction.onClicked.addListener(updateIcon);
chrome.browserAction.setIcon({path: "logo-disabled.png"});
