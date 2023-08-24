import { Link } from "react-router-dom"

import { styled } from "@mui/system"

const FAQsLink = styled(Link)(({ theme }) => ({
  width: "100%",
  color: "#6D6D6D",
  fontSize: "1.4rem",
  fontWeight: 600,
  textDecoration: "underline",
  marginTop: "1rem",
}))

const BridgeFAQsLink = () => {
  return (
    <FAQsLink to="faq">
      FAQs
      <svg style={{ margin: "-2px 0 0 3px" }} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <g clip-path="url(#clip0_4136_4325)">
          <path
            d="M8 0V6.10256L6.96722 5.06977V1.74565C4.85745 3.79488 2.92927 6.02666 0.758977 8L0 7.25639C2.15588 5.28305 4.06773 3.08202 6.16308 1.0472H2.94464L1.89744 0H8Z"
            fill="#6D6D6D"
          />
        </g>
        <defs>
          <clipPath id="clip0_4136_4325">
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </FAQsLink>
  )
}

export default BridgeFAQsLink
