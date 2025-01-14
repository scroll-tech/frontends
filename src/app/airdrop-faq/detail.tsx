"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { Box } from "@mui/material"
import { styled } from "@mui/system"

import LoadingPage from "@/components/LoadingPage"

import TOC from "./components/tableOfContents"

const AirdropFaqContainer = styled(Box)(
  ({ theme }) => `
    max-width: 140rem;
    padding: 6rem 4rem 14rem;
    overflow: visible;
    display: flex;
  ${theme.breakpoints.down("md")} {
    padding: 4rem 2rem;
    display: block;
    overflow: hidden;
  };
  `,
)

const AirdropFaqNavbar = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: "14rem",
  maxWidth: "32vw",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const AirdropFaqDetail = () => {
  const [airdropFaqContent, setAirdropFaqContent] = useState<null | string>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const airdropFaqPath = "/files/airdrop/scroll-airdrop-faq.md"
    setLoading(true)
    fetch(airdropFaqPath)
      .then(response => response.text())
      .then(text => {
        setLoading(false)
        setAirdropFaqContent(text)
      })
  }, [])

  return (
    <Box>
      {loading ? (
        <LoadingPage height="80vh"></LoadingPage>
      ) : (
        <Box>
          <AirdropFaqContainer className="wrapper">
            <Box sx={{ width: "32rem", flexShrink: 0, position: "relative" }}>
              <AirdropFaqNavbar>
                <TOC />
              </AirdropFaqNavbar>
            </Box>
            <ReactMarkdown
              children={airdropFaqContent as string}
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              className="markdown-body"
            />
          </AirdropFaqContainer>
        </Box>
      )}
    </Box>
  )
}

export default AirdropFaqDetail
