"use client"

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

// Tommy Thomas, Slack 2026-09-14 (C0BRZ8G1V50): the Compass privacy policy replaces the
// PocketPal one that stood here. Copy is his Google Doc, verbatim; numbered sections are
// h2 and their sub-headings h3, his bold runs are <strong>. The doc says "Last updated:
// [publish date]" — filled in with the day this went up.
const AppPrivacyPolicy = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">Compass Privacy Policy</TitleTypography>
      <p>Last updated: September 15, 2026</p>
      <p>
        Compass is an AI assistant app for iPhone. This policy explains what information Compass collects, how we use it, who we share it with, and
        the choices you have.
      </p>
      <p>It applies to the Compass iOS app and its supporting services, operated by Up Labs Limited ("Compass", "we", "us", or "our").</p>

      <h2>1. Information we collect</h2>
      <h3>Account information</h3>
      <p>
        You can use Compass without creating an account. When you start, we create an anonymous guest account so the app can work, identified only by
        an internal user ID. No email or name is attached to it.
      </p>
      <p>If you create an account, we also collect:</p>
      <ul>
        <li>Your email address</li>
        <li>How you signed in: Sign in with Apple, Google Sign-In, or email and password</li>
        <li>Your display name, if you or your sign-in provider supply one</li>
      </ul>

      <h3>Profile</h3>
      <p>If you choose to fill them in, we store:</p>
      <ul>
        <li>Your display name</li>
        <li>An avatar emoji</li>
        <li>A short "About you" note</li>
      </ul>
      <p>Your name and About you note are used to personalise answers. They are sent to the AI provider only when you use cloud AI (see below).</p>

      <h3>Chat and AI providers</h3>
      <p>Compass answers with either a cloud model or an on-device model.</p>
      <p>
        <strong>Cloud models.</strong> Cloud AI is off until you turn it on. When it's on and you send a message, Compass sends the following to our
        backend on Supabase, which forwards it to OpenRouter:
      </p>
      <ul>
        <li>Your message and recent messages from the conversation</li>
        <li>Your display name and About you note, if provided</li>
        <li>Your current country</li>
        <li>Instructions that tell the model how to answer</li>
      </ul>
      <p>
        OpenRouter routes the request to the provider of the model that answers — for example Anthropic (Claude), OpenAI (GPT), Google (Gemini), xAI
        (Grok), DeepSeek, Meta (Llama), or Alibaba (Qwen). If you pick a model yourself, it goes to that model's provider. If you use Auto, Compass
        chooses the model. Each reply shows which model answered.
      </p>
      <p>
        We do not store your chat messages on our servers. They pass through our backend to reach the AI provider and are not saved there. AI
        providers process them under their own terms and privacy policies.
      </p>
      <p>
        <strong>On-device models.</strong> If you download an on-device model, messages answered by it are processed entirely on your iPhone and are
        not sent to us or to any AI provider. You can use Compass with on-device models only, with cloud AI turned off.
      </p>
      <p>
        <strong>Chat history</strong> is stored only on your device. It is not synced to your account.
      </p>
      <p>Please avoid sharing highly sensitive information in chat unless you need to.</p>

      <h3>Usage and allowance</h3>
      <p>Cloud AI use is metered so we can apply each plan's allowance. For your account we store:</p>
      <ul>
        <li>The cost of the cloud AI you've used in the current allowance period, and when that period resets</li>
        <li>Your allowance limit</li>
        <li>The most recent cloud model that answered you</li>
        <li>Your remaining top-up credit, and the Apple transaction IDs of top-ups you've bought</li>
      </ul>
      <p>We do not store message content as part of this.</p>

      <h3>Purchases and subscriptions</h3>
      <p>
        Subscriptions (Compass Plus, Compass Premium) and top-ups are bought through Apple. Apple handles payment; we never receive your card details.
        We receive and store the product you bought, its status and renewal dates, and Apple's transaction identifiers, so we can give you what you
        paid for.
      </p>

      <h3>VPN (Premium)</h3>
      <p>
        If you use the built-in VPN, we create a VPN account for you with our VPN infrastructure provider and store the account identifier and
        connection configuration needed to connect you. We do not log the websites you visit or the traffic that passes through the VPN.
      </p>

      <h3>eSIM (Premium)</h3>
      <p>
        If you claim the eSIM included with Premium, we order it from our eSIM provider and store the order details needed to deliver and support it,
        such as the plan, order status, and the identifiers needed to install and check your data balance.
      </p>

      <h3>Voice</h3>
      <p>
        If you use voice mode, Compass uses your microphone, and Apple's speech recognition turns what you say into text. When on-device recognition
        isn't available, Apple may process the audio on its servers. The transcript is then handled like a typed message. Compass does not store voice
        recordings.
      </p>

      <h3>Location and country</h3>
      <p>Compass uses your country to make answers more relevant to where you are.</p>
      <p>
        By default, your country comes from your iPhone's region setting, which doesn't require location permission. You can change it in Settings. If
        you allow location access, Compass may use your approximate location, at country-level accuracy, to update your country when you travel. We
        don't collect your precise location or build a location history.
      </p>
      <p>Your country is sent to the AI provider with cloud AI messages, as described above.</p>

      <h3>Feedback</h3>
      <p>
        If you send feedback, we collect the category, your message, your email address if you provide one, your user ID, and your app and iOS
        versions.
      </p>

      <h3>Analytics</h3>
      <p>
        To understand how Compass is used and to fix problems, we collect product analytics through PostHog. This includes app launches, which
        features are used, sign-in events, message and conversation length, the models and plans involved, voice and on-device model events, purchase
        events, and error details, along with your app version and device's operating system. Analytics are linked to your internal user ID, not your
        email address.
      </p>
      <p>We do not send chat message content, your email address, or your location to analytics.</p>
      <p>You can turn analytics off in Settings under "Share product analytics".</p>

      <h3>On-device model downloads</h3>
      <p>
        On-device models are downloaded from Hugging Face. The download request goes directly from your iPhone to Hugging Face, which sees your IP
        address as part of it. Downloaded models are stored on your device.
      </p>

      <h2>2. How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Provide the assistant, including cloud and on-device answers</li>
        <li>Personalise answers using your profile and country</li>
        <li>Create and secure your account</li>
        <li>Apply plan allowances and deliver subscriptions, top-ups, the VPN, and eSIMs</li>
        <li>Provide voice input</li>
        <li>Respond to feedback and support requests</li>
        <li>Understand usage and improve reliability</li>
        <li>Prevent abuse, fraud, and security problems</li>
        <li>Meet legal obligations</li>
      </ul>

      <h2>3. How we share information</h2>
      <p>We do not sell your personal information.</p>
      <p>We share information only with providers that help run Compass:</p>
      <ul>
        <li>
          <strong>Supabase</strong> — authentication, database, and backend functions
        </li>
        <li>
          <strong>OpenRouter</strong> and the <strong>AI model providers</strong> it routes to — when you use cloud AI
        </li>
        <li>
          <strong>Apple</strong> — Sign in with Apple, payments and subscriptions, speech recognition, and location services
        </li>
        <li>
          <strong>Google</strong> — if you sign in with Google
        </li>
        <li>
          <strong>PostHog</strong> — product analytics, if you leave it on
        </li>
        <li>
          <strong>Our VPN infrastructure provider</strong> — if you use the VPN
        </li>
        <li>
          <strong>Our eSIM provider</strong> — if you claim an eSIM
        </li>
        <li>
          <strong>Hugging Face</strong> — when you download an on-device model
        </li>
      </ul>
      <p>
        We may also disclose information if the law requires it, or to protect the rights and safety of our users or others, or to investigate fraud,
        abuse, or security issues.
      </p>

      <h2>4. Information stored on your device</h2>
      <p>
        The following stays on your device: chat history, downloaded on-device models, your model choice, and app settings. It's removed when you
        clear chat history, delete your data or account, or uninstall the app.
      </p>

      <h2>5. How long we keep information</h2>
      <ul>
        <li>Account, profile, subscription, and usage data: while your account exists</li>
        <li>Feedback: as long as we need to respond and improve the app</li>
        <li>Analytics: as long as needed for analysis and reliability, then deleted or aggregated</li>
      </ul>
      <p>
        When you delete your account, or delete your data as a guest, we delete the associated data from our active systems, except where we must keep
        something for legal, security, fraud-prevention, or dispute reasons.
      </p>

      <h2>6. Your choices</h2>
      <ul>
        <li>
          <strong>Cloud AI:</strong> off until you turn it on, and you can turn it off again in Settings
        </li>
        <li>
          <strong>On-device only:</strong> answer only with on-device models from the model list
        </li>
        <li>
          <strong>Analytics:</strong> turn off "Share product analytics" in Settings
        </li>
        <li>
          <strong>Location, microphone, and speech recognition:</strong> change or revoke permission in iOS Settings
        </li>
        <li>
          <strong>Country:</strong> change it in Settings
        </li>
        <li>
          <strong>Chat history:</strong> clear it in Settings
        </li>
        <li>
          <strong>Profile:</strong> edit it in the app
        </li>
        <li>
          <strong>Delete your account or data:</strong> in Settings
        </li>
      </ul>
      <p>
        Depending on where you live, you may also have the right to access, correct, export, or delete your personal information, or to object to how
        it's used. Contact us to make a request.
      </p>

      <h2>7. Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect information, including encrypted connections and access controls. No method
        of transmission or storage is completely secure, so we can't guarantee absolute security.
      </p>

      <h2>8. Children</h2>
      <p>
        Compass is not intended for children under 13, or under the minimum age in your country. We don't knowingly collect personal information from
        children. If you believe a child has given us personal information, contact us and we'll take appropriate action.
      </p>

      <h2>9. International processing</h2>
      <p>Compass and its providers may process information in countries other than yours, where privacy laws may differ.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy. If we make material changes, we'll update the date above and give additional notice where the law requires it.</p>

      <h2>11. Contact us</h2>
      <p>For privacy questions or requests, contact:</p>
      <p>Up Labs Limited</p>
      <p>tommy@scroll.io</p>
    </Container>
  )
}

export default AppPrivacyPolicy
