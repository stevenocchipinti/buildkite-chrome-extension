let accessTokenElm = document.getElementById("accessToken");
let pipelinesElm = document.getElementById("pipelines");
let refreshRateElm = document.getElementById("refreshRate");

accessTokenElm.value = getAccessToken();
pipelinesElm.value = getPipelines().join("\n");
refreshRateElm.value = getRefreshRate() || 60;

document.getElementById("config").addEventListener('submit', (event) => {
  event.preventDefault();
  setAccessToken(accessTokenElm.value);
  setPipelines(pipelinesElm.value.split("\n"));
  setRefreshRate(refreshRateElm.value);

  let port = chrome.extension.connect({ name: "BuildKite Builds" });
  port.postMessage({action: "UPDATE_CONFIG"});

  window.location = "popup.html";
});
