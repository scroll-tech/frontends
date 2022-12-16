const fs = require("fs/promises");
const fse = require("fs-extra");

function isInCI() {
  return process.env.CI === "true";
}

// netlify env for PR ci/redirect-based-on-branch -> staging
// BRANCH pull/37/head
// HEAD ci/redirect-based-on-branch
function isBranch(branchName) {
  return process.env.BRANCH === branchName;
}

// fileA string + / + fileB string write to fileC
async function concatFileABAndWriteToC(fileA, fileB, fileC) {
  const [a, b] = await Promise.all(
    [fileA, fileB].map((path) => fs.readFile(path, { encoding: "utf-8" }))
  ).catch((err) => {
    console.error(`Failed to read file ${fileA} or ${fileB}`);
    throw err;
  });

  await fse.outputFile(fileC, a + "\n" + b).catch((err) => {
    console.error(`Failed to write file to ${fileC}`);
    throw err;
  });
}

// prettier-ignore
function debugCIEnv() {
  console.debug("------DEBUG CI ENV------BEGIN");
  console.debug("CI", process.env.CI);
  console.debug("NETLIFY", process.env.NETLIFY);
  console.debug("BUILD_ID", process.env.BUILD_ID);
  console.debug("CONTEXT", process.env.CONTEXT);
  console.debug("NODE_VERSION", process.env.NODE_VERSION);
  console.debug("NODE_ENV", process.env.NODE_ENV);
  console.debug("NPM_VERSION", process.env.NPM_VERSION);
  console.debug("NPM_FLAGS", process.env.NPM_FLAGS);
  console.debug("NPM_TOKEN", process.env.NPM_TOKEN);
  console.debug("NETLIFY_USE_YARN", process.env.NETLIFY_USE_YARN);
  console.debug("YARN_VERSION", process.env.YARN_VERSION);
  console.debug("YARN_FLAGS", process.env.YARN_FLAGS);
  console.debug("RUBY_VERSION", process.env.RUBY_VERSION);
  console.debug("PHP_VERSION", process.env.PHP_VERSION);
  console.debug("PNPM_FLAGS", process.env.PNPM_FLAGS);
  console.debug("PYTHON_VERSION", process.env.PYTHON_VERSION);
  console.debug("HUGO_VERSION", process.env.HUGO_VERSION);
  console.debug("SWIFT_VERSION", process.env.SWIFT_VERSION);
  console.debug("GO_VERSION", process.env.GO_VERSION);
  console.debug("NETLIFY_NEXT_PLUGIN_SKIP", process.env.NETLIFY_NEXT_PLUGIN_SKIP);
  console.debug("DISABLE_IPX", process.env.DISABLE_IPX);
  console.debug("NETLIFY_SKIP_GATSBY_FUNCTIONS", process.env.NETLIFY_SKIP_GATSBY_FUNCTIONS);
  console.debug("GATSBY_CLOUD_IMAGE_CDN", process.env.GATSBY_CLOUD_IMAGE_CDN);
  console.debug("GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE", process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE);
  console.debug("AWS_LAMBDA_JS_RUNTIME", process.env.AWS_LAMBDA_JS_RUNTIME);
  console.debug("REPOSITORY_URL", process.env.REPOSITORY_URL);
  console.debug("BRANCH", process.env.BRANCH);
  console.debug("HEAD", process.env.HEAD);
  console.debug("COMMIT_REF", process.env.COMMIT_REF);
  console.debug("CACHED_COMMIT_REF", process.env.CACHED_COMMIT_REF);
  console.debug("PULL_REQUEST", process.env.PULL_REQUEST);
  console.debug("REVIEW_ID", process.env.REVIEW_ID);
  console.debug("URL", process.env.URL);
  console.debug("DEPLOY_URL", process.env.DEPLOY_URL);
  console.debug("DEPLOY_PRIME_URL", process.env.DEPLOY_PRIME_URL);
  console.debug("DEPLOY_ID", process.env.DEPLOY_ID);
  console.debug("SITE_NAME", process.env.SITE_NAME);
  console.debug("SITE_ID", process.env.SITE_ID);
  console.debug("NETLIFY_IMAGES_CDN_DOMAIN", process.env.NETLIFY_IMAGES_CDN_DOMAIN);
  console.debug("------DEBUG CI ENV------END");
}

module.exports = { isInCI, isBranch, concatFileABAndWriteToC, debugCIEnv };
