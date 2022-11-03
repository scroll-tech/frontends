import { requireEnv } from "@/utils";
import { fetchAuthorizationCode } from "@/apis/faucet";

const clientId = requireEnv("REACT_APP_TWITTER_CILENT_ID");
const codeChallenge = requireEnv("REACT_APP_CODE_CHALLENGE");
const codeChallengeMethod = requireEnv("REACT_APP_CODE_CHALLENGE_METHOD");

export const signInTwitter = async () => {
  const searcParams = new URLSearchParams({
    response_type: "code",
    scope: "users.read tweet.read",
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
    redirect_uri: window.location.href,
    client_id: clientId,
    state: "WpfJ7RU8ICP68JYj28sNJKeUTqV8YmP",
  });
  const fetchAuthorizationCodeUrl = `${fetchAuthorizationCode}?${searcParams.toString()}`;
  window.location.href = fetchAuthorizationCodeUrl;
};
