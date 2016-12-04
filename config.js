let accessTokenElm = document.getElementById("accessToken");
let pipelinesElm = document.getElementById("pipelines");

accessTokenElm.value = getAccessToken();
pipelinesElm.value = getPipelines().join("\n");

document.getElementById("config").addEventListener('submit', (event) => {
  event.preventDefault();
  setAccessToken(accessTokenElm.value);
  setPipelines(pipelinesElm.value.split("\n"));
  window.location = "popup.html";
});
