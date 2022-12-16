// file to run pre-build tasks in netlify ci
const ciUtils = require("./ci-utils.js");
const path = require("path");

ciUtils.debugCIEnv();

const projectRoot = path.resolve(__dirname, "..");

async function mainBranch() {
  // prepend content of netlify-redirect-main.toml into netlify.toml
  await ciUtils
    .concatFileABAndWriteToC(
      path.resolve(projectRoot, "netlify-redirect-main.toml"),
      path.resolve(projectRoot, "netlify.toml"),
      path.resolve(projectRoot, "netlify.toml")
    )
    .catch((err) => {
      console.error(
        "Failed to concat netlify.toml and netlify-redirect-main.toml",
        err
      );
      throw err;
    });
}

async function otherBranch() {
  // prepend content of netlify-redirect-not-main.toml into netlify.toml
  await ciUtils
    .concatFileABAndWriteToC(
      path.resolve(projectRoot, "netlify-redirect-not-main.toml"),
      path.resolve(projectRoot, "netlify.toml"),
      path.resolve(projectRoot, "netlify.toml")
    )
    .catch((err) => {
      console.error(
        "Failed to concat netlify.toml and netlify-redirect-not-main.toml",
        err
      );
      throw err;
    });
}

async function run() {
  // check if in CI
  if (!ciUtils.isInCI()) return;

  // after code MERGED into main
  if (ciUtils.isBranch("main")) {
    await mainBranch();
    return;
  }

  // when on any other branch
  // e.g.
  // commit on any branch other than main
  // pull request FROM ANY BRANCH TO ANY BRANCH
  await otherBranch();
}

(async function () {
  await run();
})();
