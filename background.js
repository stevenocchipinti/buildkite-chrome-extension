var states = ["disabled", "passed", "failed"];

var i = 0;
setInterval(function() {
  chrome.browserAction.setIcon({path: "logo-" + states[i] + ".png"});
  if (i++ >= 2) i = 0;
}, 1000);

// var views = chrome.extension.getViews({
//     type: "popup"
// });
// console.log(views);
