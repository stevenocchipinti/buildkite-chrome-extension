let accessKey = localStorage.getItem("buildkite-access-key");
let pipelines = JSON.parse(localStorage.getItem("buildkite-pipelines"));

document.getElementById("accessKey").value = accessKey;
document.getElementById("pipelines").value = pipelines.join("\n");
