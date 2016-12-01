let port = chrome.extension.connect({ name: "BuildKite Builds" });
port.onMessage.addListener((msg) => {
  document.getElementById("content").innerHTML = `
    <article class="${msg[0].state}">
      <h2>${msg[0].pipeline.name}</h2>
    </article>`;
});
