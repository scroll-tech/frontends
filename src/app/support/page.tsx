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
    // the questions sit close to their answers, so each pair reads as one; the legal
    // pages give their sub-headings the section heads' 2.8rem
    marginBottom: "1.2rem",
  },
  "& h1, & h2, & h3": {
    fontFamily: "var(--font-instrument-serif)",
    fontWeight: 400,
    color: "#000",
  },
  "& h1, & h2": {
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

// Tommy Thomas, Slack 2026-09-17 (C0BRZ8G1V50): "create a /support sublink (hyperlink should
// be in footer) with this text" — the Compass iOS app's support page. Copy is his message
// verbatim: the three section lines are h2, his bold questions h3, his other bold runs
// <strong>. Same shell and type as the legal pages next to it.
const Support = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">Compass Support</TitleTypography>
      <p>
        Compass is an AI assistant for iPhone. Ask anything with Claude, GPT, Gemini, Grok and more, or download Compass Mini and get answers with no
        signal.
      </p>

      <h2>Contact us</h2>
      <p>
        Email{" "}
        <strong>
          <a className="underline" href="mailto:tommy@scroll.io">
            tommy@scroll.io
          </a>
        </strong>{" "}
        and we’ll reply within 2 business days. It helps to include:
      </p>
      <ul>
        <li>your iPhone model and iOS version</li>
        <li>the Compass version (Settings, bottom of the screen)</li>
        <li>what happened, with a screenshot if you can</li>
      </ul>
      <p>
        You can also send feedback in the app: tap your avatar, then <strong>Send feedback</strong>.
      </p>

      <h2>Common questions</h2>
      <h3>Do I need an account?</h3>
      <p>No. You can start as a guest. Creating a free account gives you a larger cloud AI allowance and lets you subscribe.</p>

      <h3>What’s the difference between cloud models and Compass Mini?</h3>
      <p>
        Cloud models (Claude, GPT, Gemini, Grok and others) give the best answers and need a connection. Compass Mini is an on-device model you
        download once. It works offline, and nothing you ask it leaves your iPhone.
      </p>

      <h3>Why did I run out of allowance?</h3>
      <p>
        Models cost different amounts to run, so the same number of messages can use a little or a lot. Tap your avatar, then <strong>Usage</strong>,
        to see how much you’ve used and when it resets. Everyday models use the least. On-device answers don’t use any allowance.
      </p>

      <h3>What do Plus and Premium include?</h3>
      <ul>
        <li>
          <strong>Compass Plus:</strong> every cloud model with a much larger allowance.
        </li>
        <li>
          <strong>Compass Premium:</strong> everything in Plus, plus a built-in VPN and a 2GB global eSIM every month.
        </li>
        <li>
          <strong>Top-ups:</strong> extra allowance that never expires.
        </li>
      </ul>

      <h3>How do I cancel or manage my subscription?</h3>
      <p>
        Subscriptions are billed by Apple. Go to iPhone <strong>Settings → your name → Subscriptions → Compass</strong>. Cancel at least 24 hours
        before renewal to avoid the next charge.
      </p>

      <h3>How do I get a refund?</h3>
      <p>
        Refunds are handled by Apple. Request one at{" "}
        <a className="underline" href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">
          reportaproblem.apple.com
        </a>
        .
      </p>

      <h3>I subscribed on another iPhone. How do I get it back?</h3>
      <p>
        Sign in to the same account, then go to <strong>Settings → Restore purchases</strong>.
      </p>

      <h3>How do I set up the eSIM or VPN?</h3>
      <p>
        Premium subscribers can tap <strong>eSIM</strong> or <strong>VPN</strong> above the text box and follow the steps. The eSIM needs an
        eSIM-compatible, carrier-unlocked iPhone.
      </p>

      <h3>How do I delete my account or data?</h3>
      <p>
        In the app, go to <strong>Settings → Delete account</strong> (or <strong>Delete my data</strong> as a guest).
      </p>

      <h2>Privacy</h2>
      <p>
        See our Privacy Policy:{" "}
        <Link className="underline" href="/app-privacy-policy">
          scroll.io/app-privacy-policy
        </Link>
      </p>
    </Container>
  )
}

export default Support
