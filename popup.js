let port = chrome.extension.connect({ name: "BuildKite Builds" });
port.onMessage.addListener((msg) => {
  document.getElementById("content").innerHTML = msg.map((build) => {
    return `
      <article class="${build.state}">
        <h2>${build.pipeline.name}</h2>
      </article>`;
  }).join("");
});
