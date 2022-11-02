import { requireEnv } from "@/utils";
import { fetchAuthorizationCode, fetchAccessToken } from "@/apis/faucet";
import qs from "qs";

const clientId = requireEnv("REACT_APP_TWITTER_CILENT_ID");
const clientSecret = requireEnv("REACT_APP_TWITTER_CILENT_SECRET");
const codeChallenge = requireEnv("REACT_APP_CODE_CHALLENGE");
const codeChallengeMethod = requireEnv("REACT_APP_CODE_CHALLENGE_METHOD");
const codeVerifier = requireEnv("REACT_APP_CODE_VERIFIER");

export const signInTwitter = async () => {
  const searcParams = new URLSearchParams({
    response_type: "code",
    scope: "users.read tweet.read offline.access",
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
    redirect_uri: window.location.href,
    client_id: clientId,
    state: "WpfJ7RU8ICP68JYj28sNJKeUTqV8YmP",
  });
  const fetchAuthorizationCodeUrl = `${fetchAuthorizationCode}?${searcParams.toString()}`;
  window.location.href = fetchAuthorizationCodeUrl;
};

export const requestAccessToken = async (code) => {
  const data = new URLSearchParams({
    code: code,
    scope: "users.read offline.access",
    grant_type: "authorization_code",
    code_verifier: codeVerifier,
    redirect_uri: window.location.origin + window.location.pathname,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const basicAuthorization = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    Authorization: `Basic ${basicAuthorization}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const result = await fetch(fetchAccessToken, {
    method: "post",
    body: data,
    headers,
  });
  if (result.ok) {
    const { access_token } = await result.json();
    return access_token;
  }
  throw new Error("Something wrong with Twitter API");
};

export const testFetchUserInfo = async (token) => {
  const result = await fetch(
    "https://api.twitter.com/2/users/me?user.fields=created_at,public_metrics",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await result.json();
  console.log(data);
};
