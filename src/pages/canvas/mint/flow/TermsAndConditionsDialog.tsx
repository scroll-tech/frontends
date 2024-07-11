import { Box, Stack, Typography } from "@mui/material"

import Dialog from "@/pages/canvas/components/Dialog"

const TermsAndConditionsDialog = props => {
  return (
    <Dialog {...props}>
      <Stack direction="column" sx={{ width: ["100%", "57.6rem"], height: ["100%", "54.6rem"], gap: ["0.8rem", "1.6rem"] }}>
        <Typography
          sx={{
            fontSize: ["2rem", "2.4rem"],
            fontWeight: 600,
            textAlign: "center",
            lineHeight: ["3.2rem", "3.6rem"],
            color: "primary.contrastText",
            pt: ["0.8rem", 0],
          }}
        >
          Scroll Canvas’ Terms & Conditions
        </Typography>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pl: "3rem",
            pr: "1.8rem",
            fontSize: ["1.6rem", "1.8rem"],
            lineHeight: ["2.4rem", "2.8rem"],
            color: "primary.contrastText",
            "& > ul > li": {
              listStyleType: "decimal",
              "&::marker": {
                fontWeight: 600,
              },
              "& ul": {
                paddingLeft: "2em",
                "& > li": {
                  listStyleType: "lower-alpha",
                  marginTop: "1rem",
                  "& > ul > li": {
                    listStyleType: "lower-roman",
                    marginTop: "0.4rem",
                  },
                },
              },
            },
            "& h2,b": {
              fontWeight: 600,
            },
            "& h2": {
              margin: "1.2rem 0",
            },
            "& p": {
              marginTop: "1rem",
            },
          }}
        >
          <ul>
            <li>
              <h2>Acceptance of Terms</h2>
              <p>
                These terms and conditions (the “<b>Scroll Canvas Terms</b>”) are entered into by you (“<b>you</b>”) and Scroll Foundation, a
                foundation organized under the laws of the Seychelles, and its subsidiaries and affiliates, as the case may be, from time to time
                (collectively referred to as “<b>Scroll</b>”, “<b>we</b>”, or “<b>us</b>”). These Scroll Canvas Terms shall govern your access to and
                activities in relation to the use of Scroll Canvas, as defined in Clause 2 (“<b>Canvas</b>”), our website, our technological
                platforms, and the services we provide on them (collectively, our “<b>Platform</b>”). They should also be read in conjunction with our
                [Terms of Service] and [Privacy Policy]. By using our website, you agree to be bound by all of the aforementioned agreements.
              </p>
            </li>

            <li>
              <h2>About Canvas</h2>
              <p>
                Canvas is a unique space for you to display your on-chain credentials, status and achievements issued and collected across the Scroll
                ecosystem. It highlights your presence on Scroll by offering a platform to exhibit unique, on-chain badges that signify achievements
                and traits, verified through the Ethereum Attestation Service.
              </p>
              <p>
                Users will be able to mint a non-transferrable and unique space with Canvas, where they are able to display Badges (defined below).
              </p>
              <p>
                Projects in our ecosystem may from time to time issue badges, which may provide users with additional functionalities on their
                respective platforms (“<b>Badges</b>”). These Badges are minted by projects on the Scroll ecosystem, or Scroll itself.
              </p>
              <p>Canvas also operates a referral rewards mechanism, which is elaborated on in Clause 5.</p>
              <p>You confirm that you have read and understood this Section on Canvas and its purpose.</p>
            </li>
            <li>
              <h2>Eligibility and Participating in Canvas</h2>
              <ul>
                <li>
                  <h6>You agree that in order to participate in Canvas, you:</h6>
                  <ul>
                    <li>Must be at least 18 years of age;</li>
                    <li>Must not be a U.S. person (defined below);</li>
                    <li>
                      Must not reside in a jurisdiction where participation in Canvas may be prohibited, restricted or unauthorized in any form or
                      manner, whether in full or in part, under the laws, regulatory requirements or rules in the jurisdiction in which the
                      participant is located; and
                    </li>
                    <li>Must not be a Prohibited Person under our Terms of Service.</li>
                  </ul>
                </li>
                <li>
                  <h6>
                    We reserve the right to deny or void your participation in Canvas in any manner we deem fit, including in the event we discover
                    that you do not fulfill these conditions.
                  </h6>
                </li>
                <li>
                  <h6>In these Terms, a “U.S. person” shall mean the following:</h6>
                  <ul>
                    <li>Any natural person resident in the United States;</li>
                    <li>Any partnership or corporation organized or incorporated under the laws of the United States;</li>
                    <li>Any estate of which any executor or administrator is a U.S. person;</li>
                    <li>Any trust of which any trustee is a U.S. person;</li>
                    <li>Any agency or branch of a foreign entity located in the United States;</li>
                    <li>
                      Any non-discretionary account or similar account (other than an estate or trust) held by a dealer or other fiduciary for the
                      benefit or account of a U.S. person;
                    </li>
                    <li>
                      Any discretionary account or similar account (other than an estate or trust) held by a dealer or other fiduciary organized,
                      incorporated, or (if an individual) resident in the United States; and
                    </li>
                    <li>
                      Any partnership or corporation if (A) organized or incorporated under the laws of any foreign jurisdiction and (B) formed by a
                      U.S. person principally for the purpose of investing in securities not registered under the Act, unless it is organized or
                      incorporated, and owned, by accredited investors (as defined in § 230.501(a)) who are not natural persons, estates or trusts.
                    </li>
                  </ul>
                </li>
                <li>
                  Canvas is only available to users in certain jurisdictions who can participate as permitted under applicable law. You agree that you
                  will comply with all applicable laws (e.g., local, state, federal and other laws) when using the Services and participating in
                  Canvas. Without limiting the foregoing, by participating in Canvas, you represent and warrant that: (a) you are not located in a
                  country , region or territory against which the U.S. Government maintains comprehensive economic or financial sanctions or trade
                  embargoes; and (b) you are not listed on any U.S. Government list of prohibited, sanctioned, or restricted parties or otherwise the
                  subject or target of any sanctions administered or enforced the U.S. government. You are solely responsible for ensuring that your
                  access and use of the Services and participation in Canvas does not violate any applicable laws, including without limitation
                  applicable economic and trade sanctions and export control laws and regulations, such as those administered and enforced by the EU,
                  OFSI, OFAC, the U.S. Department of State, the U.S. Department of Commerce, the UN Security Council, and other relevant authorities.
                  You agree that you will not use a Virtual Private Network (VPN) or similar tool, to circumvent or attempt to circumvent prohibitions
                  under applicable laws or regulations. We reserve the right, but have no obligation, to monitor where participants to Canvas are
                  accessed from. Furthermore, we reserve the right, at any time, in our sole discretion, to block access to Canvas, in whole or in
                  part, from any geographic location, IP addresses and unique device identifiers or disqualify from Canvas any user who we believe is
                  in breach of these Terms.
                </li>
                <li>
                  You shall not access or participate in Canvas for any malicious or illegal purposes. We reserve the right to disqualify you from
                  Canvas and revoke any and all of Scroll Marks allocated to you under Canvas in the event that you carry out malicious or illegal
                  activities with respect to Scroll, the Service or Canvas or otherwise violate these Terms (including without limitation the general
                  prohibitions and restrictions set out in Section 5) or our Terms of Service.
                </li>
              </ul>
            </li>
            <li>
              <h2>Accessing and Participating in Canvas</h2>
              <ul>
                <li>
                  You will access and use the Platform for informational purposes only and you will participate in Canvas strictly in accordance with
                  these Terms. You are solely responsible for verifying the accuracy of any information obtained in connection with Scroll, Canvas,
                  the Platform, or in relation to Canvas before using or participating in any of them.
                </li>
                <li>
                  You may access the Canvas interface (the “<b>Interface</b>”) with a third-party cryptocurrency wallet, whether or not custodial,
                  desktop, mobile, or “hot” or “cold”. These wallet services are third-party services and by using a third-party wallet, you agree
                  that you are using that wallet under the terms and conditions of the applicable provider of the wallet. Third-party wallets are not
                  operated by, maintained by, or affiliated with Scroll, and Scroll does not have possession, custody or control over the contents of
                  or any digital assets in your wallet and has no ability to retrieve or transfer the contents or digital assets in your wallet.
                </li>
                <li>
                  We accept no responsibility for, or liability to you, in connection with your use of a third-party wallet and make no
                  representations or warranties regarding how the Interface, Canvas or the Service will operate with any specific wallet. You are
                  solely responsible for keeping your wallet secure and you should never share your wallet credentials or seed phrase with anyone. If
                  you discover an issue related to your wallet, please contact the wallet provider.
                </li>
                <li>
                  Canvas may make reference to third party applications or protocols which provide third party services built on Scroll network (“
                  <b>Third-Party Protocols</b>”). These Third-Party Protocols are not operated or controlled by Scroll, and your use of these
                  Third-Party Protocols is entirely at your own risk. In the case where you choose to place transactions through these Third-Party
                  Protocols and these transactions are not successful due to an error with the Third-Party Protocols, we accept no responsibility or
                  liability to you for any such failed transactions, or any transaction or gas fees that may be incurred by you in connection with
                  such failed transactions. Additionally, these Third-Party Protocols may impose a fee or charge for services. We are not responsible
                  for any fees charged by a third party.
                </li>
              </ul>
            </li>
            <li>
              <h2>Collecting Badges</h2>
              <ul>
                <li>
                  In your use of the Services and by participating in Canvas, you may be attributed Badges. These are to be seen as social or
                  reputation indicators, and as an intangible reward. These are to document your activities on the Scroll ecosystem, and do not
                  represent any right to receive any asset or tokens in the future, or any claim against Scroll. Badges do not represent any value,
                  availability, fungibility, exchangeability or utility.
                </li>
                <li>
                  Badges will not and will never convert to, accrue to, or become any other tokens or virtual assets or distribution thereof. Badges
                  are virtual items with no monetary value, and do not constitute any currency or property of any type and are not redeemable,
                  refundable, or eligible for any fiat or virtual currency or anything else of value.
                </li>
                <li>
                  Scroll makes no representation or guarantee that any user will receive any property or outcome of value, as a result of holding any
                  Badge, or otherwise participating in Canvas.
                </li>
              </ul>
            </li>

            <li>
              <h2>Referrals and Rewards</h2>
              <ul>
                <li>
                  <h6>You may receive a reward in the form of ETH for every unique wallet address that:</h6>
                  <ul>
                    <li>Mints a space on our platform in conjunction with Canvas; and</li>
                    <li>Inputs your unique invitation code when prompted, while minting a space.</li>
                  </ul>
                </li>
                <li>
                  <h6>
                    Each wallet address that mints a space in the manner described in Clause 5(a) shall also be eligible for a 50% reduction of their
                    minting fee. This will be reflected in the Canvas interface.
                  </h6>
                </li>
              </ul>
            </li>
            <li>
              <h2>Disclaimer</h2>
              <p>
                YOUR USE OF THE INTERFACE, THE SERVICE AND/OR YOUR PARTICIPATION IN CANVAS ARE AT YOUR SOLE RISK. THE SERVICE, INTERFACE AND CANVAS
                ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. THE INDEMNIFIED PARTIES EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER
                EXPRESS, IMPLIED OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
                NON-INFRINGEMENT. THE INDEMNIFIED PARTIES MAKE NO WARRANTY THAT (A) THE SERVICE, THE INTERFACE OR CANVAS WILL MEET YOUR REQUIREMENTS;
                (B) THE SERVICE, INTERFACE, OR CANVAS WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) THE RESULTS THAT MAY BE OBTAINED FROM
                THE USE OF THE SERVICE, INTERFACE OR CANVAS OR (D) THE QUALITY OF ANY SERVICES, APPLICATIONS, INFORMATION, OR OTHER MATERIAL OBTAINED
                BY YOU THROUGH CANVAS, THE SERVICE, INTERFACE OR CANVAS WILL MEET YOUR EXPECTATIONS.
              </p>

              <p>
                YOU AGREE THAT THESE TERMS AND ANY INFORMATION PROVIDED BY OR OBTAINED FROM THE SERVICE, THE INTERFACE OR CANVAS ARE FOR INFORMATIONAL
                PURPOSES ONLY, ARE NOT INTENDED TO BE RELIED UPON FOR PROFESSIONAL ADVICE OF ANY SORT, AND ARE NOT A SUBSTITUTE FOR INFORMATION FROM
                EXPERTS OR PROFESSIONALS IN THE APPLICABLE AREA. YOU SHOULD NOT TAKE, OR REFRAIN FROM TAKING, ANY ACTION OR DECISION BASED ON ANY
                INFORMATION CONTAINED ON OR RECEIVED IN CONNECTION WITH THE SERVICE, THE INTERFACE OR CANVAS. IF, AND BEFORE YOU MAKE ANY FINANCIAL,
                LEGAL, OR OTHER DECISIONS, YOU SHOULD SEEK INDEPENDENT PROFESSIONAL ADVICE FROM AN INDIVIDUAL WHO IS LICENSED AND QUALIFIED IN THE
                AREA FOR WHICH SUCH ADVICE WOULD BE APPROPRIATE.
              </p>
              <p>
                THESE TERMS ARE NOT INTENDED TO, AND DO NOT, CREATE OR IMPOSE ANY FIDUCIARY DUTIES ON US. TO THE FULLEST EXTENT PERMITTED BY LAW, YOU
                ACKNOWLEDGE AND AGREE THAT WE OWE NO FIDUCIARY DUTIES OR LIABILITIES TO YOU OR ANY OTHER PARTY, AND THAT TO THE EXTENT ANY SUCH DUTIES
                OR LIABILITIES MAY EXIST AT LAW OR IN EQUITY, THOSE DUTIES AND LIABILITIES ARE HEREBY IRREVOCABLY DISCLAIMED, WAIVED, AND ELIMINATED.
                YOU FURTHER AGREE THAT THE ONLY DUTIES AND OBLIGATIONS THAT WE OWE YOU ARE THOSE SET OUT EXPRESSLY IN THESE TERMS.
              </p>
            </li>
            <li>
              <h2>Indemnification</h2>
              <p>
                You specifically agree that you will be personally responsible for your use of the Service, the Interface and your participation in
                Canvas. To the fullest extent permitted by applicable laws, you agree to indemnify, defend and hold harmless Scroll, as well as its
                affiliates and service providers, and each of their respective past, present and future officers, directors, members, employees,
                consultants, representatives and agents, and each of their respective successors and assigns (the “Indemnified Parties”) from and
                against all actual or alleged third party claims, damages, awards, judgments, losses, liabilities, obligations, taxes, penalties,
                interest, fees, expenses (including, without limitation, attorneys’ fees and expenses) and costs (including, without limitation, court
                costs, costs of settlement and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known or
                unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or
                otherwise (collectively, “Claims”), including, but not limited to, damages to property or personal injury, that are caused by, arise
                out of or are related to: (a) your use of the Service, the Interface or your participation in Canvas or any site or service accessible
                as part of the Service, the Interface or Canvas; (b) your violation of these Terms, our Terms of Service, or Privacy Policy, or
                applicable law; (c) your violation of the rights of a third party; (d) your negligence or willful misconduct and (e) any disputes or
                issues between you or any third party. You agree to promptly notify us of any third party Claims and cooperate with the Indemnified
                Parties in defending such Claims. You further agree that the Indemnified Parties shall have the right to control the defense or
                settlement of any third party Claims as they relate to us, if they so choose.
              </p>
            </li>
            <li>
              <h2>Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY (INCLUDING, WITHOUT LIMITATION,
                TORT, CONTRACT, STRICT LIABILITY, OR OTHERWISE) SHALL THE INDEMNIFIED PARTIES OR ANY OF THEM BE LIABLE TO YOU OR TO ANY OTHER PERSON
                FOR: (A) ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING DAMAGES FOR LOST PROFITS,
                BUSINESS INTERRUPTION, LOSS OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, ACCURACY OF RESULTS, OR COMPUTER FAILURE OR MALFUNCTION; (B) ANY
                SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY; (C) ANY AMOUNT, IN THE AGGREGATE, IN EXCESS OF ONE-HUNDRED (US$100) UNITED STATES DOLLARS;
                OR (D) ANY MATTER BEYOND THE REASONABLE CONTROL OF THE INDEMNIFIED PARTIES OR ANY OF THEM. SOME JURISDICTIONS DO NOT ALLOW THE
                EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL OR CERTAIN OTHER DAMAGES, SO THE ABOVE LIMITATIONS AND EXCLUSIONS MAY NOT APPLY
                TO YOU.
              </p>
            </li>
            <li>
              <h2>Incorporation of General Terms</h2>
              <p>
                You agree that you have read Clauses 14 to 19 of the Scroll Terms of Service, and that the terms therein shall apply to these Terms,
                mutatis mutandis.
              </p>
            </li>
          </ul>
        </Box>
      </Stack>
    </Dialog>
  )
}

export default TermsAndConditionsDialog
