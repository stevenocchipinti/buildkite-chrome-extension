function getAccessToken() {
  return localStorage.getItem("buildkite-access-key");
}
function setAccessToken(accessToken) {
  return localStorage.setItem("buildkite-access-key", accessToken);
}

function getRefreshRate() {
  return localStorage.getItem("buildkite-refresh-rate");
}
function setRefreshRate(refreshRate) {
  return localStorage.setItem("buildkite-refresh-rate", refreshRate);
}

function getPipelines() {
  return JSON.parse(localStorage.getItem("buildkite-pipelines") || '[]');
}
function getPipelineNames() {
  return getPipelines().map(name => { return name.split("/")[1]; });
}
function setPipelines(pipelines) {
  let cleanedPipelines = pipelines.reduce((results, line) => {
    if (line.length) results.push(line.trim());
    return results;
  }, []);
  localStorage.setItem("buildkite-pipelines", JSON.stringify(cleanedPipelines));
}

function getBuilds() {
  return JSON.parse(localStorage.getItem("buildkite-builds") || '[]');
}
function setBuilds(builds) {
  localStorage.setItem("buildkite-builds", JSON.stringify(builds));
}
function getBuild(buildName) {
  return getBuilds().find(build => { return build.pipeline.name === buildName });
}
function setBuild(buildObject) {
  let builds = [];
  getPipelineNames().forEach(pipelineName => {
    if (pipelineName === buildObject.pipeline.name) {
      builds.push(buildObject);
    } else if (getBuild(pipelineName)) {
      builds.push(getBuild(pipelineName));
    }
  });
  setBuilds(builds);
}

function hasValidSettings() {
  const accessToken = (getAccessToken() && getAccessToken().length > 0);
  const pipelines = (getPipelines() && getPipelines().length > 0);
  const refreshRate = (getRefreshRate() && getRefreshRate() > 0);
  return accessToken && pipelines && refreshRate;
}
