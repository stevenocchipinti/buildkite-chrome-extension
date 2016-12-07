const expect = require("chai").expect;

function overallState(builds) {
  // Possible states and how I'll probably categorize them:
  //   Yellow:  running, scheduled
  //   Green:   passed, finished
  //   Red:     failed, canceled, canceling, blocked
  //   Grey:    skipped, not_run
  const yellow = build => {
    return ["running", "scheduled"].includes(build.state)
  }
  const red = build => {
    return ["failed", "canceled", "canceling", "blocked"].includes(build.state)
  }
  const green = build => {
    return ["passed", "finished"].includes(build.state)
  };

  if (builds.some(yellow)) return "running";
  if (builds.some(red)) return "failed";
  if (builds.every(green)) return "passed";
  return "disabled";
}

describe("overallState", () => {

  const testCases = [
    {
      input:  [{state: "failed"}, {state: "passed"}, {state: "running"}],
      output: "running"
    },
    {
      input:  [{state: "failed"}, {state: "passed"}],
      output: "failed"
    },
    {
      input:  [{state: "passed"}, {state: "passed"}],
      output: "passed"
    },
    {
      input:  [{state: "passed"}, {state: "passed"}, {state: "not_run"}],
      output: "disabled"
    },
  ];

  testCases.forEach(testCase => {
    let inputStr = testCase.input.map(b => { return `{state: ${b.state}}` });
    context(`given [${inputStr}]`, () => {
      it(`returns '${testCase.output}'`, () => {
        expect(overallState(testCase.input)).to.equal(testCase.output);
      });
    });
  });
});
