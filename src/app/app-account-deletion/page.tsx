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
  "& ul, & ol": {
    marginBottom: "1.6rem",
    paddingLeft: "3rem",
  },
  "& ul": {
    listStyle: "disc",
  },
  // the in-app steps are numbered
  "& ol": {
    listStyle: "decimal",
  },
})) as typeof Box

const TitleTypography = styled(Typography)(() => ({
  textAlign: "center",
  fontFamily: "var(--font-instrument-serif) !important",
  fontSize: "3.6rem !important",
  fontWeight: "400 !important",
  marginBottom: "4rem",
}))

// Tommy Thomas, Slack 2026-10-12 (C0BRZ8G1V50): the page the terms' "Delete your Compass
// account" link goes to — the account-deletion URL a Google Play listing has to give. Copy is
// his message verbatim; his headings are h2, his bold runs <strong>. "Last updated: [publish
// date]" is filled in with the day this went up. Its Privacy Policy link is the Android one
// (Tommy, same day).
const AppAccountDeletion = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">Delete your Compass account</TitleTypography>
      <p>Last updated: October 12, 2026</p>
      <p>This page explains how to delete your Compass account and the data linked to it. Compass is operated by Up Labs Limited.</p>

      <h2>Delete in the app (fastest)</h2>
      <ol>
        <li>Open Compass and tap your avatar.</li>
        <li>
          Go to <strong>Settings › Privacy</strong>.
        </li>
        <li>
          Tap <strong>Delete account</strong>. If you use Compass without signing in, tap <strong>Delete my data</strong> instead.
        </li>
        <li>Confirm.</li>
      </ol>
      <p>Deletion happens straight away and can't be undone.</p>
      <p>
        <strong>Cancel any subscription first.</strong> Deleting your account does not stop billing. Subscriptions bought through Google Play or Apple
        keep renewing until you cancel them in Google Play (Payments & subscriptions › Subscriptions) or in your Apple ID settings.
      </p>

      <h2>Delete without the app</h2>
      <p>
        If you can't use the app, email{" "}
        <strong>
          <a className="underline" href="mailto:tommy@scroll.io">
            tommy@scroll.io
          </a>
        </strong>{" "}
        from the email address you sign in to Compass with, using the subject "Delete my Compass account". We may ask you to confirm the request from
        that address. We delete the account within 30 days and email you when it's done.
      </p>
      <p>
        If you use Compass without signing in, there's no email address linked to your data, so we can't verify a request by email. Use{" "}
        <strong>Delete my data</strong> in the app, as described above.
      </p>

      <h2>What we delete</h2>
      <ul>
        <li>Your account and sign-in details (email address, and your Google or Apple sign-in link)</li>
        <li>Your profile (name, "about you", and avatar)</li>
        <li>Your subscription, top-up, and AI usage records</li>
        <li>Your VPN account, VPN consent records, and eSIM orders. We also close the VPN account at our VPN provider.</li>
      </ul>
      <p>
        Chat history is stored only on your device. Deleting your account in the app clears it from that device. Uninstalling the app also removes it.
      </p>

      <h2>What we keep</h2>
      <ul>
        <li>
          <strong>Feedback you sent:</strong> kept so we can act on it, but no longer linked to your account. Feedback includes the email address you
          typed in, if you gave one.
        </li>
        <li>
          <strong>"Notify me" sign-ups:</strong> if you asked to be emailed when a feature launches, that email address is kept, unlinked from your
          account, until you ask us to remove it.
        </li>
        <li>
          <strong>Refund records:</strong> we keep the transaction IDs of refunded purchases, unlinked from your account, to prevent refund fraud.
        </li>
      </ul>
      <p>
        We also keep anything we're required to keep for legal, security, fraud-prevention, or dispute reasons, as described in our{" "}
        <Link className="underline" href="/app-privacy-policy-android">
          Privacy Policy
        </Link>
        . Google and Apple keep their own purchase records under their own policies.
      </p>

      <h2>Questions</h2>
      <p>
        Email{" "}
        <strong>
          <a className="underline" href="mailto:tommy@scroll.io">
            tommy@scroll.io
          </a>
        </strong>
        .
      </p>
    </Container>
  )
}

export default AppAccountDeletion
