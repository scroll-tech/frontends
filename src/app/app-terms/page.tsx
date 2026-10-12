"use client"

import Link from "next/link"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

const Container = styled(Box)(({ theme }) => ({
  padding: "2rem 0 0",
  color: "#3D3D3D",
  "& *": {
    fontSize: "1.5rem",
    lineHeight: 1.7,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  "& h1": {
    fontSize: "2.6rem",
    marginTop: "3.6rem",
  },
  "& h2": {
    fontSize: "2.2rem",
    marginTop: "3.2rem",
  },
  "& h3": {
    fontSize: "1.8rem",
    marginTop: "2.8rem",
  },
  "& h1, & h2, & h3": {
    fontFamily: "var(--font-instrument-serif)",
    fontWeight: 400,
    color: "#000",
    marginBottom: "2.8rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem",
    },
  },
  "& p": {
    marginBottom: "1.6rem",
    "+ h1, + h2, + h3": {
      marginTop: "2.8rem",
      [theme.breakpoints.down("md")]: {
        marginTop: "2rem",
      },
    },
  },
  "& ul": {
    marginBottom: "1.6rem",
    paddingLeft: "3rem",
    listStyle: "disc",
  },
})) as typeof Box

const TitleTypography = styled(Typography)(() => ({
  textAlign: "center",
  fontFamily: "var(--font-instrument-serif) !important",
  fontSize: "3.6rem !important",
  fontWeight: "400 !important",
  marginBottom: "4rem",
}))

// Tommy Thomas, Slack 2026-10-12 (C0BRZ8G1V50): "make a scroll.io/app-terms in the footer" —
// the terms of use for the Compass apps, next to the app privacy policy. Copy is his message
// verbatim; numbered sections are h2, run-in labels are <strong>. "Last updated: [publish
// date]" is filled in with the day this went up, and its "[jurisdiction]" with Hong Kong
// (Tommy, same day).
const AppTerms = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">Compass Terms of Use</TitleTypography>
      <p>Last updated: October 12, 2026</p>
      <p>
        These terms apply to the Compass apps for iPhone and Android and their supporting services ("Compass"), operated by Up Labs Limited ("we",
        "us", or "our"). By using Compass you agree to these terms. If you don't agree, don't use Compass.
      </p>
      <p>
        Our{" "}
        <Link className="underline" href="/app-privacy-policy">
          Privacy Policy
        </Link>{" "}
        explains how we handle your information.
      </p>

      <h2>1. Who can use Compass</h2>
      <p>
        You must be at least 13, or the minimum age in your country, to use Compass. You must be old enough to enter a contract where you live to buy
        a subscription. Otherwise a parent or guardian must agree to these terms for you.
      </p>

      <h2>2. Your account</h2>
      <p>
        You can use Compass as a guest, or create an account with Apple, Google, or an email address. You're responsible for activity on your account
        and for keeping your sign-in details secure.
      </p>
      <p>
        You can delete your account at any time in Settings. See{" "}
        <Link className="underline" href="/app-account-deletion">
          Delete your Compass account
        </Link>{" "}
        for details.
      </p>

      <h2>3. AI answers</h2>
      <p>Compass answers questions using AI models: cloud models from third-party providers, or models that run on your device.</p>
      <ul>
        <li>
          <strong>AI answers can be wrong.</strong> They may be incomplete, out of date, or simply incorrect, even when they sound confident. This
          includes information about visas, entry rules, health, safety, laws, and prices.
        </li>
        <li>
          <strong>Check before you rely on an answer.</strong> Confirm anything important with an official or authoritative source, such as a
          government website, embassy, airline, or a qualified professional.
        </li>
        <li>
          <strong>Compass is not professional advice.</strong> It does not give legal, medical, financial, or immigration advice, and it is not an
          emergency service. In an emergency, contact local emergency services.
        </li>
      </ul>
      <p>Subject to these terms, you may use what Compass produces for you. You're responsible for how you use it.</p>

      <h2>4. Acceptable use</h2>
      <p>Don't use Compass to:</p>
      <ul>
        <li>Break the law or encourage others to</li>
        <li>Harm, harass, threaten, or exploit others, including children</li>
        <li>Create content that infringes someone else's rights</li>
        <li>
          Attempt to get around plan allowances, the guest limit, or security measures, including by creating accounts or guest sessions to get extra
          free use
        </li>
        <li>Reverse engineer, scrape, overload, or interfere with Compass or its backend, except where the law allows this</li>
        <li>Resell or provide Compass to others as a service</li>
      </ul>
      <p>Cloud AI requests are also subject to the usage policies of the AI providers that answer them.</p>

      <h2>5. Subscriptions and top-ups</h2>
      <p>
        Compass offers paid subscriptions (Compass Plus and Compass Premium) and one-time top-ups of cloud AI credit. What each includes, along with
        its price, is shown in the app before you buy.
      </p>
      <ul>
        <li>
          <strong>Billing:</strong> purchases are made through the Apple App Store or Google Play, and billed and managed by them under their terms.
          We never receive your payment card details.
        </li>
        <li>
          <strong>Auto-renewal:</strong> subscriptions renew automatically at the end of each period unless you cancel at least 24 hours before it
          ends.
        </li>
        <li>
          <strong>Cancelling:</strong> cancel in your Apple ID subscription settings or in Google Play › Payments & subscriptions. Deleting your
          Compass account or the app does not cancel a subscription. You keep access until the end of the period you've paid for.
        </li>
        <li>
          <strong>Refunds:</strong> refunds are handled by Apple or Google under their policies. If a purchase is refunded, we remove what it gave
          you, such as plan access or top-up credit.
        </li>
        <li>
          <strong>Allowances:</strong> cloud AI use is metered against your plan's allowance, which resets each period. Top-up credit is used once
          your allowance runs out and does not expire while your account exists. Unused allowance does not carry over.
        </li>
        <li>
          <strong>Changes:</strong> we may change plans, prices, or what's included. A price change for an existing subscription takes effect only as
          Apple's or Google's rules allow, including any notice or consent they require.
        </li>
      </ul>

      <h2>6. VPN (Premium)</h2>
      <p>
        The VPN included with Premium is run with our VPN infrastructure provider. It is set up only after you agree to the VPN data terms in the app.
      </p>
      <ul>
        <li>
          Use the VPN only for lawful purposes, and only where VPN use is legal. Some countries restrict or ban VPNs, and you are responsible for
          checking local law.
        </li>
        <li>Don't use it to send spam, attack or scan networks, distribute malware, or infringe copyright.</li>
        <li>We may suspend the VPN for abuse, or when your Premium subscription ends.</li>
        <li>
          Server locations, speeds, and availability can change and aren't guaranteed. The VPN improves privacy on untrusted networks but doesn't make
          you anonymous.
        </li>
      </ul>

      <h2>7. eSIM (Premium)</h2>
      <p>
        The eSIM included with Premium is provided through our eSIM provider. It needs a compatible, carrier-unlocked device. Coverage, speeds, and
        networks vary by country and aren't guaranteed. Data allowances are shown in the app, and unused data doesn't carry over unless the app says
        otherwise.
      </p>

      <h2>8. On-device models and third-party software</h2>
      <p>
        On-device models are downloaded from Hugging Face and are licensed by their creators (for example, Qwen models under Apache 2.0). Compass
        includes open-source software, and the licences are listed in Settings. Those licences apply to those components.
      </p>

      <h2>9. Our rights</h2>
      <p>
        We (and our licensors) own Compass, including the apps, design, and brand. We give you a personal, non-exclusive, non-transferable, revocable
        licence to use Compass under these terms. On iPhone, Apple's standard licence terms for App Store apps also apply, but where they conflict
        with these terms, these terms apply to the extent allowed.
      </p>

      <h2>10. Changes and ending your use</h2>
      <p>
        We may update Compass, add or remove features, or stop offering it. We may suspend or close accounts that break these terms, and where
        reasonable we'll tell you first.
      </p>
      <p>You can stop using Compass and delete your account at any time.</p>

      <h2>11. Disclaimers and liability</h2>
      <p>
        Compass is provided "as is" and "as available". To the extent the law allows, we make no warranties that it will be uninterrupted, error-free,
        or that answers will be accurate or fit for a particular purpose.
      </p>
      <p>
        To the extent the law allows, we are not liable for indirect or consequential losses, or for decisions made based on AI answers. Our total
        liability to you for any claim is limited to the amount you paid us in the 12 months before the claim. Nothing in these terms limits liability
        that can't be limited by law, or your rights as a consumer under the law where you live.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of Hong Kong, and disputes go to the courts of Hong Kong, unless the consumer law where you live gives
        you the right to bring a claim there.
      </p>

      <h2>13. Changes to these terms</h2>
      <p>
        We may update these terms. If we make material changes, we'll update the date above and give notice in the app where appropriate. If you keep
        using Compass after a change takes effect, you accept the updated terms.
      </p>

      <h2>14. Contact us</h2>
      <p>Up Labs Limited</p>
      <p>tommy@scroll.io</p>
    </Container>
  )
}

export default AppTerms
