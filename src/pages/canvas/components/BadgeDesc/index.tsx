import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

import { styled } from "@mui/material/styles"

import Link from "@/components/Link"

const CustomLink = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontSize: "inherit",
  textUnderlineOffset: "2px",
  textDecorationThickness: "1px",
  fontWeight: 700,
}))

const BadgeDesc = props => {
  const { children } = props

  return (
    <ReactMarkdown
      className="badge-desc"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a(props) {
          const { href, children } = props
          return (
            <CustomLink href={href} underline="always" external>
              {children}
            </CustomLink>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default BadgeDesc
