const [ org, pipeline ] = "myOrg/myPipeline".split("/");
const access_token = localStorage.getItem("buildkite-access-key");

if (!accessToken)
  throw "No access token! Please set `buildkite-access-key` in localStorage";

const url = `https://api.buildkite.com/v2/`
  + `organizations/${org}/pipelines/${pipeline}/builds?`
  + `access_token=${accessToken}`;

function update() {
  fetch(url)
    .then((response) => { return response.json() })
    .then((json) => {
      chrome.browserAction.setIcon({path: "logo-" + json[0].state + ".png"});
    })
    .catch((ex) => { console.log('parsing failed', ex) })
}

update();
setInterval(update, 60 * 1000);

// var views = chrome.extension.getViews({
//     type: "popup"
// });
// console.log(views);
