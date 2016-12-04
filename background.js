const refreshRate = 30;
var popup;


function getUrls() {
  const accessToken = localStorage.getItem("buildkite-access-key");
  if (!accessToken)
    throw "No access token! Please set `buildkite-access-key` in localStorage";

  const pipelines = JSON.parse(localStorage.getItem("buildkite-pipelines") || []);
  return pipelines.map(pipelineComposite => {
    const [ org, pipeline ] = pipelineComposite.split("/");
    const branch = "master";
    return `https://api.buildkite.com/v2/`
      + `organizations/${org}/pipelines/${pipeline}/builds`
      + `?per_page=1&branch=${branch}&access_token=${accessToken}`;
  });
}


function overallState(values) {
  if (values.every(value => { return value.state === "passed" })) {
    return "passed";
  } else {
    return "failed";
  }
}


function updateBuilds() {
  let promises = getUrls().map(url => {
    return fetch(url)
      .then(response => { return response.json() })
      .then(json => { return json[0] })
      .catch(ex => { console.error('parsing failed', ex) });
  });
  Promise.all(promises).then(values => {
    chrome.browserAction.setIcon({path: "logo-" + overallState(values) + ".png"});
    if (popup) popup.postMessage(values);
  });
}


updateBuilds();
setInterval(updateBuilds, refreshRate * 1000);

chrome.extension.onConnect.addListener(port => {
  popup = port;
  port.onDisconnect.addListener(() => { popup = undefined; });
  updateBuilds();
});
