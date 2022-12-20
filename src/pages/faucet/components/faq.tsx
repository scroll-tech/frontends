import * as React from "react"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { NavLink } from "react-router-dom"

import { Addresses, ChainId, SiteMap, TESTNET_NAME, l1ExplorerUrl, l2ExplorerUrl } from "@/constants"

const addToMetaMask = async (autoconnect: any) => {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [autoconnect],
  })
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: "transparent",
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon />} {...props} />)(
  ({ theme }) => ({
    backgroundColor: "transparent",
    padding: 0,
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(270deg)",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      transform: "rotate(90deg)",
      color: "#333",
    },
  }),
)

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}))

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("")

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className="max-w-[920px] mx-auto mb-[20vh] text-left">
      <p className="font-display text-[#333] text-[28px] leading-[32px] md:text-[34px]">FAQs</p>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <h2 className="h-[56px] font-medium flex  items-center leading-[26px] border-[#C9CBCE] border-bottom-[1px] text-[18px] text-[#333]  md:text-[20px] md:h-[96px]">
            How do I get started?
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-[16px] leading-[26px] pb-[40px] text-[#595959]">
            Welcome to Scroll's Pre-Alpha Testnet. <br />
            Here is how to explore the platform: <br />
            <ul className="pl-[20px] list-decimal">
              <li>
                Receive test tokens from the{" "}
                <NavLink className="link-button" to={SiteMap.Faucet}>
                  Faucet
                </NavLink>
                , to the Scroll L1 {TESTNET_NAME} network.
              </li>
              <li>
                Transfer and withdraw test tokens in{" "}
                <NavLink className="link-button" to={SiteMap.Bridge}>
                  Bridge
                </NavLink>
                .
              </li>
              <li>
                Swap test tokens or provide liquidity in{" "}
                <NavLink className="link-button" to={SiteMap.Swap}>
                  Swap
                </NavLink>
                .
              </li>
              <li>
                View transactions’ and blocks’ statuses in the{" "}
                <a className="link-button" href={l1ExplorerUrl}>
                  Scroll L1
                </a>
                ,{" "}
                <a className="link-button" href={l2ExplorerUrl}>
                  Scroll L2
                </a>{" "}
                Block Explorers and the{" "}
                <NavLink className="link-button" to={SiteMap.RollupExplorer}>
                  Rollup Explorer
                </NavLink>
                .
              </li>
            </ul>
            More instructions
            <NavLink className="link-button" to={SiteMap.Home}>
              {" "}
              here
            </NavLink>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <h2 className="h-[56px] font-medium flex  items-center leading-[26px] border-[#C9CBCE] border-bottom-[1px] text-[18px] text-[#333]  md:text-[20px] md:h-[96px]">
            What is a testnet faucet?
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <p className="text-[16px] leading-[26px] pb-[40px] text-[#595959] max-w-[680px]">
            Testnets act like a sandbox, where developers can test out features before the mainnet launch. Users provide their wallet address and in
            exchange receive ‘’test tokens’’ (no real world value), to interact with the testnet and share feedback.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <h2 className="h-[56px] font-medium flex  items-center leading-[26px] border-[#C9CBCE] border-bottom-[1px] text-[18px] text-[#333]  md:text-[20px] md:h-[96px]">
            How do I use the faucet?
          </h2>{" "}
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-[16px] leading-[26px] pb-[40px] text-[#595959]">
            <ul className="pl-[20px] list-decimal">
              <li>
                <span onClick={() => addToMetaMask(Addresses[ChainId.SCROLL_LAYER_1].autoconnect)} className="link-button cursor-pointer">
                  Add Scroll L1 network
                </span>{" "}
                and the USDC token to Metamask.
              </li>
              <li>
                Transfer and withdraw test tokens in{" "}
                <NavLink className="link-button" to={SiteMap.Bridge}>
                  Bridge
                </NavLink>
                .
              </li>
              <li>
                <span onClick={() => addToMetaMask(Addresses[ChainId.SCROLL_LAYER_2].autoconnect)} className="link-button cursor-pointer">
                  Add Scroll L2 network
                </span>{" "}
                and the USDC token to Metamask.
              </li>
              <li>
                Click on the button ‘’Request Testnet Scroll tokens’’ and receive your testnet Scroll tokens (1ETH & 100 USDC) within a few seconds.
              </li>
              <li>
                Check the transaction status in your wallet or on the{" "}
                <a className="link-button" href={l1ExplorerUrl}>
                  Scroll L1 Block Explorer
                </a>
                .
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <h2 className="h-[56px] font-medium flex  items-center leading-[26px] border-[#C9CBCE] border-bottom-[1px] text-[18px] text-[#333]  md:text-[20px] md:h-[96px]">
            Where can I find Scroll architecture overview?
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <p className="text-[16px] leading-[26px] pb-[40px] text-[#595959] max-w-680px">
            Click{" "}
            <a className="link-button" href="https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k">
              here
            </a>{" "}
            for Scroll architecture overview
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
