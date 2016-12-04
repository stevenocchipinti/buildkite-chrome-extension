function getUrls() {
  return getPipelines().map(pipelineComposite => {
    const [ org, pipeline ] = pipelineComposite.split("/");
    const accessToken = getAccessToken();
    const branch = "master";

    return `https://api.buildkite.com/v2/`
      + `organizations/${org}/pipelines/${pipeline}/builds`
      + `?per_page=1&branch=${branch}&access_token=${accessToken}`;
  });
}


function overallState(builds) {
  if (builds.every(build => { return build && build.state === "passed" })) {
    return "passed";
  } else {
    return "failed";
  }
}

function setIconState(state) {
  chrome.browserAction.setIcon({path: `logo-${state}.png`});
}


var popup;
function updateBuilds() {
  if (!hasValidSettings()) {
    setIconState("disabled");
    return;
  }

  if (popup) popup.postMessage({action: "UPDATE_PENDING"});
  let promises = getUrls().map(url => {
    return fetch(url)
      .then(response => { return response.json() })
      .then(json => {
        setBuild(json[0]);
        if (popup) popup.postMessage({action: "UPDATE_SUCCESSFUL"});
        return json[0];
      })
      .catch(ex => { console.error('parsing failed', ex) });
  });
  Promise.all(promises).then(builds => {
    setIconState(overallState(builds));
    if (popup) popup.postMessage({action: "UPDATE_COMPLETE"});
  });
}

var interval;
function init() {
  if (interval) clearInterval(interval)
  updateBuilds();
  interval = setInterval(updateBuilds, getRefreshRate() * 1000);
}

init();
chrome.extension.onConnect.addListener(port => {
  popup = port;
  port.onDisconnect.addListener(() => { popup = undefined; });
  port.onMessage.addListener((msg) => {
    if (msg.action === "UPDATE_CONFIG") init();
  });
  updateBuilds();
});
