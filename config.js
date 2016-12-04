let accessKeyElm = document.getElementById("accessKey");
let pipelinesElm = document.getElementById("pipelines");

accessKeyElm.value = getAccessKey();
pipelinesElm.value = getPipelines().join("\n");

document.getElementById("config").addEventListener('submit', (event) => {
  event.preventDefault();
  setAccessKey(accessKeyElm.value);
  setPipelines(pipelinesElm.value.split("\n"));
  window.location = "popup.html";
});
