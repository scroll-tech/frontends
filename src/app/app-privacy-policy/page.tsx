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

const AppPrivacyPolicy = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">PocketPal Privacy Policy</TitleTypography>
      <p>Last updated: June 30, 2026</p>
      <p>
        PocketPal is a travel assistant app for digital nomads and travelers. This Privacy Policy explains what information PocketPal collects, how we
        use it, when we share it, and what choices you have.
      </p>
      <p>This policy applies to the PocketPal iOS app and related services operated by Up Labs Limited (“PocketPal,” “we,” “us,” or “our”).</p>
      <h2>1. Information We Collect</h2>
      <h2>Account information</h2>
      <p>When you create or use an account, we may collect:</p>
      <ul>
        <li>Your email address</li>
        <li>Your authentication provider, such as Sign in with Apple, Google Sign-In, or email/password</li>
        <li>Your display name, if provided by you or your sign-in provider</li>
        <li>Your internal user ID</li>
        <li>Your profile settings, such as avatar emoji</li>
        <li>Your passport country, if you choose to add it</li>
      </ul>
      <p>
        We use this information to create and secure your account, sync your profile, personalize travel answers, and provide account recovery or
        support.
      </p>
      <p>
        Your passport country may be used to give more relevant travel, visa, entry, and local-context answers. Because this may reveal
        nationality-related information, you should only provide it if you are comfortable doing so.
      </p>
      <h2>Chat and third-party AI providers</h2>
      <p>When you chat with PocketPal, we process your messages and the assistant’s responses to provide the AI travel assistant experience.</p>
      <p>PocketPal supports both cloud AI and local AI:</p>
      <ul>
        <li>
          In cloud AI mode, your current message, recent chat context needed to answer, selected or current country, optional name and passport
          country you provide, and system instructions may be sent to PocketPal's backend on Supabase. PocketPal's backend may then send that request
          to OpenRouter and Anthropic's Claude to generate a response.
        </li>
        <li>
          In local AI mode, prompts and responses are processed locally on your device and are not sent to our cloud AI provider for generation.
        </li>
      </ul>
      <p>
        PocketPal asks for your permission before sending chat content or travel context to third-party AI providers. If you do not allow cloud AI,
        you can use local AI where available and your chat content is not sent to OpenRouter or Anthropic's Claude.
      </p>
      <p>
        PocketPal stores chat history locally on your device so your conversation can continue between app sessions. Chat history is not designed to
        be synced as part of your cloud account. However, recent chat messages may be sent to the cloud AI service when you use cloud AI mode after
        giving permission.
      </p>
      <p>You should avoid entering highly sensitive information into chat unless it is necessary for your use of the app.</p>
      <h2>Voice input and speech recognition</h2>
      <p>If you use voice mode, PocketPal may access your microphone so you can speak to the travel assistant.</p>
      <p>
        Your speech is converted into text using Apple speech recognition technology. When local recognition is not available, Apple may process the
        audio on its servers. The resulting transcript is then handled like a normal chat message.
      </p>
      <p>PocketPal does not intentionally store raw voice recordings.</p>
      <h2>Location and country information</h2>
      <p>PocketPal may use location-related information to provide travel features, including:</p>
      <ul>
        <li>Detecting your current country</li>
        <li>Suggesting relevant eSIM plans</li>
        <li>Showing nearby places</li>
        <li>Showing your position on a map</li>
        <li>Calculating routes</li>
        <li>Improving travel and local recommendations</li>
      </ul>
      <p>Depending on the feature, PocketPal may process:</p>
      <ul>
        <li>Your device region or locale</li>
        <li>A manually selected country</li>
        <li>Approximate location</li>
        <li>Current coordinates when using maps, nearby search, or routing features</li>
      </ul>
      <p>
        Some map, search, location, and routing features may send location, route, or search information to service providers such as Apple Maps,
        Supabase, or other map/routing infrastructure used by the app.
      </p>
      <p>
        PocketPal does not intentionally build a persistent location history. If you save a place, the saved place may include its name, category,
        coordinates, notes, phone number, website, or other details you choose to save.
      </p>
      <p>You can control location access at any time in iOS Settings.</p>
      <h2>Saved places and lists</h2>
      <p>If you use saved places or travel lists, we may collect and store:</p>
      <ul>
        <li>List names and descriptions</li>
        <li>Place names</li>
        <li>Place coordinates</li>
        <li>Place categories</li>
        <li>Place subtitles or notes</li>
        <li>Phone numbers or website URLs attached to saved places</li>
        <li>Source information, such as whether the place came from a map search or manual entry</li>
        <li>Creation and update timestamps</li>
      </ul>
      <p>Saved places may be stored locally on your device and synced to your PocketPal account so they are available across sessions.</p>
      <h2>User content</h2>
      <p>
        Content you create in PocketPal, such as saved place lists, notes, feedback messages, and chat messages, may contain personal information
        depending on what you choose to enter. Saved places and lists may sync to your PocketPal account through Supabase. Chat messages are stored
        locally, except when sent for cloud AI after permission.
      </p>
      <h2>Feedback and support</h2>
      <p>If you submit feedback, we may collect:</p>
      <ul>
        <li>Feedback category</li>
        <li>Feedback message</li>
        <li>Your optional email address</li>
        <li>Your user ID, if signed in</li>
        <li>App version</li>
        <li>iOS version</li>
        <li>Submission timestamp</li>
      </ul>
      <p>We use feedback to respond to you, debug issues, improve the app, and prioritize product improvements.</p>
      <h2>Analytics and diagnostics</h2>
      <p>PocketPal may collect product analytics and diagnostic information to understand how the app is used and to improve reliability.</p>
      <p>This may include:</p>
      <ul>
        <li>App lifecycle events</li>
        <li>Feature usage events</li>
        <li>Sign-in method events</li>
        <li>Message length and thread length</li>
        <li>Voice feature events</li>
        <li>Map feature usage</li>
        <li>Local model download status</li>
        <li>Error messages and diagnostic details</li>
        <li>App version and operating system information</li>
      </ul>
      <p>
        PocketPal does not intentionally send chat message content, email address, exact location, raw search text, saved place names, phone numbers,
        or saved place URLs to analytics.
      </p>
      <p>
        Analytics may be associated with an internal user ID so we can understand app usage and reliability without using your email address or chat
        content.
      </p>
      <p>You can turn off analytics in the app settings by disabling Share product analytics.</p>
      <h2>eSIM purchase links</h2>
      <p>PocketPal may show eSIM plans and purchase links for third-party eSIM providers.</p>
      <p>
        If you choose to buy an eSIM, you may be taken to a third-party website, such as Breeze or another eSIM provider. That provider is responsible
        for collecting and processing information needed for the transaction, such as payment details, account details, order information, and
        customer support information.
      </p>
      <p>PocketPal does not collect or store your payment card details for third-party eSIM purchases.</p>
      <p>
        Some links may include an affiliate or referral identifier. This may allow the third-party provider to attribute a purchase or visit to
        PocketPal.
      </p>
      <h2>Local model and offline map downloads</h2>
      <p>PocketPal may let you download optional on-device AI models or offline map files.</p>
      <p>When you download these files, the app may process:</p>
      <ul>
        <li>Selected model or region</li>
        <li>Download status</li>
        <li>File storage status</li>
        <li>Error or diagnostic information</li>
      </ul>
      <p>Downloaded models and offline map files are stored on your device.</p>
      <h2>2. How We Use Information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Create, authenticate, and secure your account</li>
        <li>Provide the AI travel assistant</li>
        <li>Personalize travel answers based on your profile and country context</li>
        <li>Provide voice input</li>
        <li>Provide map, nearby search, saved places, and routing features</li>
        <li>Suggest relevant eSIM plans</li>
        <li>Sync your profile and saved places</li>
        <li>Respond to feedback and support requests</li>
        <li>Improve app performance, reliability, and usability</li>
        <li>Detect, prevent, and investigate abuse, security issues, or technical problems</li>
        <li>Comply with legal obligations</li>
      </ul>
      <h2>3. How We Share Information</h2>
      <p>We do not sell your personal information.</p>
      <p>We may share information with service providers only as needed to operate PocketPal, including:</p>
      <ul>
        <li>Supabase, for authentication, database storage, backend functions, and storage</li>
        <li>PostHog, for product analytics and diagnostics</li>
        <li>Apple, for Sign in with Apple, location services, maps, routing, geocoding, and speech recognition</li>
        <li>Google, if you choose to sign in with Google</li>
        <li>OpenRouter and Anthropic's Claude, when you use cloud AI mode after giving permission</li>
        <li>Breeze, eSIMgo, or other eSIM providers, when you open or purchase through third-party eSIM links</li>
        <li>Model or file hosting providers, when you download optional local AI models or offline resources</li>
      </ul>
      <p>
        These providers may process information according to their own privacy policies and contractual obligations. We use service providers to help
        deliver app functionality and require them to protect information in a manner consistent with this Privacy Policy and applicable privacy and
        security obligations.
      </p>
      <p>
        We may also disclose information if required to comply with law, enforce our terms, protect the rights and safety of users or others, or
        investigate fraud, abuse, or security issues.
      </p>
      <h2>4. Data Stored Locally on Your Device</h2>
      <p>Some PocketPal data is stored locally on your device, including:</p>
      <ul>
        <li>Chat history</li>
        <li>Profile cache</li>
        <li>Saved places cache</li>
        <li>Offline maps</li>
        <li>Downloaded local AI models</li>
        <li>App settings</li>
      </ul>
      <p>
        Local data may be removed if you clear it in the app, sign out, delete your account, uninstall the app, or delete app data from your device.
      </p>
      <h2>5. Data Retention</h2>
      <p>
        We keep information only as long as needed for the purposes described in this policy, unless a longer retention period is required or
        permitted by law.
      </p>
      <p>In general:</p>
      <ul>
        <li>Account and profile data are kept while your account is active.</li>
        <li>Saved places and lists are kept until you delete them or delete your account.</li>
        <li>
          Chat history is stored locally on your device until you clear it, sign out, delete your account, uninstall the app, or delete app data.
        </li>
        <li>Feedback may be kept as long as needed to respond to the request, improve the app, or maintain support records.</li>
        <li>
          Analytics and diagnostic data are kept as needed for product analytics, reliability, security, and debugging, then deleted or aggregated
          according to our analytics retention settings.
        </li>
      </ul>
      <p>
        When you delete your account, PocketPal will delete your account and associated account data from our active systems, subject to limited
        exceptions such as legal obligations, security, fraud prevention, dispute resolution, or backup retention.
      </p>
      <h2>6. Your Choices and Controls</h2>
      <p>You can control your information in several ways:</p>
      <ul>
        <li>Analytics: Disable analytics in PocketPal settings.</li>
        <li>Cloud AI: Allow or decline cloud AI before chat content is sent to third-party AI providers.</li>
        <li>Location: Change or revoke location permission in iOS Settings.</li>
        <li>Microphone: Change or revoke microphone permission in iOS Settings.</li>
        <li>Speech recognition: Change or revoke speech recognition permission in iOS Settings.</li>
        <li>Chat history: Clear chat history in the app.</li>
        <li>Saved places: Delete saved places or lists in the app.</li>
        <li>Profile: Update your profile information in the app.</li>
        <li>Account deletion: Delete your account in the app settings.</li>
        <li>Sign out: Sign out of your account at any time.</li>
      </ul>
      <p>
        You may also contact us to request access, correction, deletion, export, or restriction of your personal information, depending on your
        location and applicable law.
      </p>
      <h2>7. Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect information, including secure transport, authentication, access controls,
        and service-level protections.
      </p>
      <p>However, no method of transmission or storage is completely secure. We cannot guarantee that information will always remain secure.</p>
      <h2>8. Children’s Privacy</h2>
      <p>
        PocketPal is not intended for children under 13, or the minimum age required in your jurisdiction. We do not knowingly collect personal
        information from children. If you believe a child has provided personal information to us, please contact us so we can take appropriate
        action.
      </p>
      <h2>9. International Processing</h2>
      <p>
        PocketPal and its service providers may process information in countries other than where you live. These countries may have privacy laws that
        differ from those in your jurisdiction.
      </p>
      <p>By using PocketPal, you understand that your information may be processed and transferred internationally as needed to provide the app.</p>
      <h2>10. Third-Party Links and Services</h2>
      <p>
        PocketPal may contain links to third-party websites or services, including eSIM purchase pages. We are not responsible for the privacy
        practices of third-party websites or services. You should review their privacy policies before providing information to them.
      </p>
      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. If we make material changes, we will update the “Last updated” date and provide
        additional notice if required by law.
      </p>
      <h2>12. Contact Us</h2>
      <p>For privacy questions, requests, or concerns, contact us at:</p>
      <p>tommy@scroll.io</p>
      <p>Tommy Thomas, Up Labs Limited</p>
    </Container>
  )
}

export default AppPrivacyPolicy
