let accessKeyElm = document.getElementById("accessKey");
let pipelinesElm = document.getElementById("pipelines");


function getAccessKey() {
  return localStorage.getItem("buildkite-access-key");
}
function setAccessKey(accessKey) {
  return localStorage.setItem("buildkite-access-key", accessKey);
}


function getPipelines() {
  return JSON.parse(
    localStorage.getItem("buildkite-pipelines") || '[]'
  ).join("\n");
}
function setPipelines(pipelinesString) {
  let pipelines = pipelinesString.split("\n").reduce((results, line) => {
    if (line.length) results.push(line.trim());
    return results;
  }, []);
  localStorage.setItem("buildkite-pipelines", JSON.stringify(pipelines));
}


accessKeyElm.value = getAccessKey();
pipelinesElm.value = getPipelines();
document.getElementById("config").addEventListener('submit', (event) => {
  event.preventDefault();
  setAccessKey(accessKeyElm.value);
  setPipelines(pipelinesElm.value);
  window.location = "popup.html";
});
