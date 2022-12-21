import { requireEnv } from "@/utils"
import { fetchAuthorizationCode, loginTwitterUrl } from "@/apis/faucet"

const clientId = requireEnv("REACT_APP_TWITTER_CILENT_ID")
const codeChallenge = requireEnv("REACT_APP_CODE_CHALLENGE")
const codeChallengeMethod = requireEnv("REACT_APP_CODE_CHALLENGE_METHOD")
const randomState = requireEnv("REACT_APP_STATE")

export const redirectSignInTwitter = async () => {
  const searcParams = new URLSearchParams({
    response_type: "code",
    scope: "users.read tweet.read offline.access",
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
    redirect_uri: process.env.REACT_APP_TWITTER_REDIRECT_URI || window.location.href,
    client_id: clientId,
    state: randomState,
  })
  const fetchAuthorizationCodeUrl = `${fetchAuthorizationCode}?${searcParams.toString()}`
  window.location.href = fetchAuthorizationCodeUrl
}

export const loginTwitter = async code => {
  const formData = new FormData()
  formData.append("code", code)
  formData.append("redirect_uri", process.env.REACT_APP_TWITTER_REDIRECT_URI || window.location.origin + window.location.pathname)
  const res = await fetch(process.env.REACT_APP_FAUCET_BASE_API_URL + loginTwitterUrl, {
    method: "POST",
    body: formData,
  })
  if (res.ok) {
    const user = await res.json()
    return user
  }
  const errorMsg = await res.text()
  throw new Error(errorMsg)
}
