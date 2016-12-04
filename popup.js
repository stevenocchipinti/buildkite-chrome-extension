function showLoadingBar() {
  document.getElementById("loading-bar").style.display = "block";
}

function hideLoadingBar() {
  document.getElementById("loading-bar").style.display = "none";
}

function showBuilds() {
  document.getElementById("builds").style.display = "block";
}


let port = chrome.extension.connect({ name: "BuildKite Builds" });
port.onMessage.addListener(msg => {
  if (msg.action === "UPDATE_PENDING") {
    showLoadingBar();

  } else if (msg.action === "UPDATE_SUCCESSFUL") {
    showBuilds();
    const builds = getBuilds();
    const html = Object.keys(builds).reduce((result, buildName) => {
      const build = builds[buildName];
      return result.concat(`
        <article class="${build.state}">
          <h2>${build.pipeline.name}</h2>
        </article>`
      );
    }, "");
    document.getElementById("builds").innerHTML = html;

  } else if (msg.action === "UPDATE_COMPLETE") {
    hideLoadingBar();
  }
});
