const pipelines = localStorage.getItem("buildkite-pipelines");
const [ org, pipeline ] = JSON.parse(pipelines)[0].split("/");
const accessToken = localStorage.getItem("buildkite-access-key");
const branch = "master";
const refreshRate = 30;

if (!accessToken)
  throw "No access token! Please set `buildkite-access-key` in localStorage";

const url = `https://api.buildkite.com/v2/`
  + `organizations/${org}/pipelines/${pipeline}/builds`
  + `?per_page=1&branch=${branch}&access_token=${accessToken}`;


var popup;

function updateBuilds() {
  fetch(url)
    .then((response) => { return response.json() })
    .then((json) => {
      chrome.browserAction.setIcon({path: "logo-" + json[0].state + ".png"});
      if (popup) popup.postMessage(json);
    })
    .catch((ex) => { console.error('parsing failed', ex) })
}

updateBuilds();
setInterval(updateBuilds, refreshRate * 1000);

chrome.extension.onConnect.addListener((port) => {
  popup = port;
  port.onDisconnect.addListener(() => { popup = undefined; });
  updateBuilds();
});
