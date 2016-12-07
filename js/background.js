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
  // Possible states and how I'll probably categorize them:
  //   Yellow:  running, scheduled
  //   Green:   passed, finished
  //   Red:     failed, canceled, canceling, blocked
  //   Grey:    skipped, not_run
  const yellow = build => {
    return ["running", "scheduled"].includes(build.state)
  }
  const red = build => {
    return ["failed", "canceled", "canceling", "blocked"].includes(build.state)
  }
  const green = build => {
    return ["passed", "finished"].includes(build.state)
  };

  if (builds.some(yellow)) return "running";
  if (builds.some(red)) return "failed";
  if (builds.every(green)) return "passed";
  return "disabled";
}


function setIconState(state) {
  chrome.browserAction.setIcon({path: `assets/logo-${state}.png`});
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
