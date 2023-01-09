export const onPreBuild = function ({ netlifyConfig, packageJson }) {
  netlifyConfig.build.environment.REACT_APP_NAME = packageJson.name
  netlifyConfig.build.environment.REACT_APP_VERSION = packageJson.version
}
