function getAccessKey() {
  return localStorage.getItem("buildkite-access-key");
}
function setAccessKey(accessKey) {
  return localStorage.setItem("buildkite-access-key", accessKey);
}

function getPipelines() {
  return JSON.parse(localStorage.getItem("buildkite-pipelines") || '[]');
}
function setPipelines(pipelines) {
  let cleanedPipelines = pipelines.reduce((results, line) => {
    if (line.length) results.push(line.trim());
    return results;
  }, []);
  localStorage.setItem("buildkite-pipelines", JSON.stringify(cleanedPipelines));
}

function getBuilds() {
  return JSON.parse(localStorage.getItem("buildkite-builds") || '{}');
}
function setBuilds(builds) {
  localStorage.setItem("buildkite-builds", JSON.stringify(builds));
}
function getBuild(buildName) {
  return getBuilds()[buildName];
}
function setBuild(buildName, buildObject) {
  let builds = getBuilds();
  builds[buildName] = buildObject;
  setBuilds(builds);
}

function hasValidSettings() {
  const accessToken = (getAccessKey() && getAccessKey().length > 0);
  const pipelines = (getPipelines() && getPipelines().length > 0);
  return accessToken && pipelines;
}
