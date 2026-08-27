"use client"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import Link from "@/components/Link"

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
  "& h2": {
    fontSize: "2.2rem",
    fontFamily: "var(--font-instrument-serif)",
    fontWeight: 400,
    color: "#000",
    margin: "3.2rem 0 1.6rem 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
      margin: "2.8rem 0 1.2rem 0",
    },
  },
  "& p": {
    marginBottom: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  "& ul": {
    listStyle: "disc",
    marginLeft: "1.6rem",
    "& ul": {
      listStyle: "decimal",
      "& ul": {
        listStyle: "circle",
      },
    },
    "& li": {
      paddingLeft: "2rem",
      margin: "0.8rem 0",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0.4rem",
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: "2rem 0 0",
    "& ul": {
      li: {
        paddingLeft: "0",
      },
      width: "calc(100vw - 4.8rem) !important",
      "& ul": {
        marginLeft: "0",
      },
    },
  },
})) as typeof Box

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
}))

const TitleTypography = styled(Typography)(() => ({
  textAlign: "center",
  fontFamily: "var(--font-instrument-serif) !important",
  fontSize: "3.6rem !important",
  fontWeight: "400 !important",
  marginBottom: "4rem",
}))

const Terms = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">Terms of Service</TitleTypography>
      <p>Last updated: March 25, 2026</p>
      <p>
        Scroll Foundation (&ldquo;Scroll&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) provides several website-hosted user
        interfaces. These currently include but are not limited to interfaces that can be accessed at{" "}
        <LinkStyled href="https://swap.scroll.io/">https://swap.scroll.io/</LinkStyled>,{" "}
        <LinkStyled href="/bridge">https://scroll.io/bridge</LinkStyled>, and <LinkStyled href="/portal">https://scroll.io/portal</LinkStyled> (each a
        &ldquo;Website&rdquo;, and collectively the &ldquo;Websites&rdquo;), and other subdomains associated with it or any other products and
        services that link to it. These Terms of Service (&ldquo;Terms&rdquo;) explain the terms and conditions by which you may access and use the
        Website and the other subdomains and products associated with it.
      </p>

      <p>
        You must read these Terms carefully as it governs your use of the Websites. By accessing or using the Websites, you signify that you have
        read, understand, and agree to be bound by these Terms in its entirety. If you do not agree, you are not authorized to access or use the
        Websites and should not use the Websites.
      </p>

      <p className="uppercase">
        BY USING THE WEBSITES, INCLUDING BUT NOT LIMITED TO BY CONNECTING A WALLET (AS DEFINED BELOW) PURSUANT TO THE TERMS AND PROCESSES DESCRIBED
        HEREIN, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO THESE TERMS IN ITS ENTIRETY. YOU ARE RESPONSIBLE FOR MAKING YOUR OWN
        DECISION REGARDING YOUR USE OF THE WEBSITES. ANY USE OF ANY OF THE WEBSITES IS SOLELY AT YOUR OWN RISK AND IT IS YOUR SOLE RESPONSIBILITY TO
        SEEK APPROPRIATE PROFESSIONAL, LEGAL, TAX, AND OTHER ADVICE WHERE APPLICABLE.
      </p>

      <p className="uppercase">
        BY USING ANY OF THE WEBSITES, YOU EXPRESSLY ACKNOWLEDGE AND ASSUME ALL RISKS RELATED THERETO, INCLUDING (WITHOUT LIMITATION) THE RISKS SET OUT
        IN THESE TERMS. IN NO EVENT SHALL SCROLL OR ANY OF OUR CONTRACTORS, AGENTS, OR ANY INDIVIDUALS ACTING UNDER SCROLL&rsquo;S INSTRUCTIONS BE
        HELD LIABLE IN CONNECTION WITH OR FOR ANY CLAIMS, LOSSES, DAMAGES, OR OTHER LIABILITIES, WHETHER IN CONTRACT, TORT, OR OTHERWISE, ARISING OUT
        OF OR IN CONNECTION WITH THE USE OF THE WEBSITE.
      </p>

      <h2>1. Eligibility and Restrictions</h2>
      <p>
        To access or use the Website, you must be able to form a legally binding contract with Scroll. Accordingly, you represent that you are at
        least the age of majority in your jurisdiction (e.g., 18 years old) and have the full right, power, and authority to enter into and comply
        with these Terms on behalf of yourself and any company or legal entity for which you may access or use the Website.
      </p>
      <p>
        You further represent that you are not (a) the subject of economic or trade sanctions administered or enforced by any governmental authority
        or otherwise designated on any list of prohibited or restricted parties (including but not limited to the list maintained by the Office of
        Foreign Assets Control of the U.S. Department of the Treasury) or (b) a citizen, resident, or organized in a jurisdiction or territory that is
        the subject of comprehensive country-wide, territory-wide, or regional economic sanctions by the United States. Finally, you represent that
        your access and use of the Website will fully comply with all applicable laws and regulations, and that you will not access or use the Website
        to conduct, promote, or otherwise facilitate any illegal activity.
      </p>
      <p>
        You are solely responsible for ensuring that your use of the Website complies with all applicable laws, regulations, and restrictions in your
        jurisdiction. We do not guarantee the availability or legality of the Website or its functionalities in all jurisdictions. We reserve the sole
        and absolute right to prevent any person from accessing it, based on its determination that such person may be ineligible or may be engaged in
        any conduct that Scroll considers harmful, unlawful, inappropriate, or unacceptable.
      </p>

      <h2>2. Changes to the Terms of Use</h2>
      <p>
        We reserve the right, in our sole discretion, to modify these Terms from time to time. If we make any material modifications, we will notify
        you by updating the date at the top of the Agreement and by maintaining a current version of the Terms at{" "}
        <LinkStyled href="/terms-of-service">https://scroll.io/terms-of-service</LinkStyled>. All modifications will be effective when they are
        posted, and your continued accessing or use of any of the Websites will serve as confirmation of your acceptance of those modifications. If
        you do not agree with any modifications to these Terms, you must immediately stop accessing and using the Websites.
      </p>

      <h2>3. Description of the Websites</h2>
      <p>Each of the Websites provides access to a set of decentralized smart contracts available on the Scroll blockchain:</p>
      <ul>
        <li>
          <p>
            <LinkStyled href="https://swap.scroll.io/">https://swap.scroll.io/</LinkStyled> allows users to trade certain digital assets
            (&ldquo;Scroll Swap&rdquo;);
          </p>
        </li>
        <li>
          <p>
            <LinkStyled href="/bridge">https://scroll.io/bridge</LinkStyled> allows users to bridge certain assets to the Scroll blockchain for the
            purpose of using dApps and executing transactions on the chain (&ldquo;Bridge&rdquo;); and
          </p>
        </li>
        <li>
          <p>
            <LinkStyled href="/portal">https://scroll.io/portal</LinkStyled>.
          </p>
        </li>
      </ul>
      <p>(collectively, the &ldquo;Protocols&rdquo;).</p>
      <p>
        Please note that this list may be updated from time to time. The Websites are distinct from each of the Protocols named here, and are one of
        but not the exclusive means of accessing these Protocols.
      </p>
      <p>
        By using the Websites, you understand that you are not buying or selling digital assets from Scroll, and that we do not control trade
        execution on any of the Protocols named above.
      </p>
      <p>
        To access any of the Websites, you must use a non-custodial wallet software, which allows you to interact with public blockchains. Your
        relationship with that non-custodial wallet provider is governed by the applicable terms of service with respect to the applicable terms of
        service of such third party. We do not have custody or control over the contents of your wallet and have no ability to retrieve or transfer
        its contents. By connecting your wallet to any of our Websites, you agree to be bound by these Terms and all of the terms incorporated herein
        by reference.
      </p>

      <h2>4. Third Party Services and Content</h2>
      <p>
        The Website may include integrations, links or other access to third party services, sites, technology, content and resources (each a
        &ldquo;Third-Party Service&rdquo;). Your access and use of the Third-Party Services may also be subject to additional terms and conditions,
        privacy policies, or other agreements with such third party, and you may be required to authenticate to or create separate accounts to use
        Third-Party Services on the websites or via the technology platforms of their respective providers. You will be responsible for any and all
        costs and charges associated with your use of any Third-Party Services. Scroll enables these Third-Party Services merely as a convenience and
        the integration or inclusion of such Third-Party Services does not imply an endorsement or recommendation. Any dealings you have with third
        parties while using the Website are between you and the third party. Scroll will not be responsible or liable, directly or indirectly, for any
        damage or loss caused or alleged to be caused by or in connection with use of or reliance on any Third-Party Services.
      </p>
      <p>
        We have no control over and are not responsible for such Third-Party Services, including for the accuracy, availability, reliability, or
        completeness of information shared by or available through Third-Party Services, or on the privacy practices of Third-Party Services. We
        encourage you to review the respective policies of the third parties providing Third-Party Services prior to using such services.
      </p>

      <h2>5. Third Party Resources and Promotions</h2>
      <p>
        The Website may contain references or links to third-party resources, including, but not limited to, information, materials, products, or
        services, that we do not own or control. In addition, third parties may offer promotions related to your access and use of our Website. We do
        not approve, monitor, endorse, warrant or assume any responsibility for any such resources or promotions. If you access any such resources or
        participate in any such promotions, you do so at your own risk, and you understand that these Terms do not apply to your dealings or
        relationships with any third parties. You expressly relieve us of any and all liability arising from your use of any such resources or
        participation in any such promotions.
      </p>

      <h2>6. Modification of our Website</h2>
      <p>
        We reserve the following rights, which do not constitute obligations of ours: (a) with or without notice to you, to modify, substitute,
        eliminate or add to the Website or any of its functionalities and products; (b) to review, modify, filter, disable, delete and remove any and
        all content and information from the Website or any of its functionalities and products.
      </p>

      <h2>7. Additional Rights</h2>
      <p>
        We reserve the right to cooperate with any law enforcement, court or government investigation or order or third party requesting or directing
        that we disclose information or content or information that you provide.
      </p>

      <h2>8. Prohibited Behavior</h2>
      <p>
        You agree not to engage in, or attempt to engage in, any of the following categories of prohibited activity in relation to your access and use
        of the Website:
      </p>
      <ul>
        <li>
          <p>
            <strong>Intellectual Property Infringement.</strong> Activity that infringes on or violates any copyright, trademark, service mark,
            patent, right of publicity, right of privacy, or other proprietary or intellectual property rights under the law.
          </p>
        </li>
        <li>
          <p>
            <strong>Cyberattack.</strong> Activity that seeks to interfere with or compromise the integrity, security, or proper functioning of any
            computer, server, network, personal device, or other information technology system, including, but not limited to, the deployment of
            viruses and denial of service attacks.
          </p>
        </li>
        <li>
          <p>
            <strong>Fraud and Misrepresentation.</strong> Activity that seeks to defraud us or any other person or entity, including, but not limited
            to, providing any false, inaccurate, or misleading information in order to unlawfully obtain the property of another.
          </p>
        </li>
        <li>
          <p>
            <strong>Market Manipulation.</strong> Activity that violates any applicable law, rule, or regulation concerning the integrity of trading
            markets, including, but not limited to, the manipulative tactics commonly known as &ldquo;rug pulls&rdquo;, pumping and dumping, and wash
            trading.
          </p>
        </li>
        <li>
          <p>
            <strong>Securities and Derivatives Violations.</strong> Activity that violates any applicable law, rule, or regulation concerning the
            trading of securities or derivatives, including, but not limited to, the unregistered offering of securities and the offering of leveraged
            and margined commodity products to retail customers in your jurisdiction of residence.
          </p>
        </li>
        <li>
          <p>
            <strong>Sale of Stolen Property.</strong> Buying, selling, or transferring of stolen items, fraudulently obtained items, items taken
            without authorization, and/or any other illegally obtained items.
          </p>
        </li>
        <li>
          <p>
            <strong>Data Mining or Scraping.</strong> Activity that involves data mining, robots, scraping, or similar data gathering or extraction
            methods of content or information from any of our Products.
          </p>
        </li>
        <li>
          <p>
            <strong>Objectionable Content.</strong> Activity that involves soliciting information from anyone under the age of 18 or that is otherwise
            harmful, threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, invasive of
            another&rsquo;s privacy, hateful, discriminatory, or otherwise objectionable.
          </p>
        </li>
        <li>
          <p>
            <strong>Any Other Unlawful Conduct.</strong> Activity that violates any applicable law, rule, or regulation of the United States or
            another relevant jurisdiction, including, but not limited to, the restrictions and regulatory requirements imposed by your jurisdiction of
            residence.
          </p>
        </li>
      </ul>

      <h2>9. Your Obligations</h2>

      <p>
        <strong>9.1 Trading</strong>
      </p>
      <p>
        You agree and understand that: (a) all trades you submit through the Website are considered unsolicited, which means that they are solely
        initiated by you; (b) you have not received any investment advice from us in connection with any trades; and (c) we do not conduct a
        suitability review of any trades you submit.
      </p>

      <p>
        <strong>9.2 Non-Custodial and No Fiduciary Duties</strong>
      </p>
      <p>
        The Website is purely non-custodial, meaning we do not ever have custody, take possession, or have control of your digital assets at any time.
        It further means you are solely responsible for the custody of the cryptographic private keys to the digital asset wallets you hold and you
        should never share your Wallet credentials or seed phrase with anyone. We accept no responsibility for, or liability to you, in connection
        with your use of a wallet and makes no representations or warranties regarding how the Website will operate with any specific wallet.
        Likewise, you are solely responsible for any associated wallet you use and we are not liable for any acts or omissions by you in connection
        with or as a result of your wallet being compromised.
      </p>
      <p>
        These Terms are not intended to, and does not, create or impose any fiduciary duties on Scroll. To the fullest extent permitted by law, you
        acknowledge and agree that we owe no fiduciary duties or liabilities to you or any other party, and that to the extent any such duties or
        liabilities may exist at law or in equity, those duties and liabilities are hereby irrevocably disclaimed, waived, and eliminated. You further
        agree that the only duties and obligations that we owe you are those set out expressly in these Terms.
      </p>

      <p>
        <strong>9.3 Compliance and Tax Obligations</strong>
      </p>
      <p>
        The Website (and certain functionalities) may not be available or appropriate for use in your jurisdiction. By accessing or using the Website,
        you agree that you are solely and entirely responsible for compliance with all laws and regulations that may apply to you. Specifically, your
        use of our Website or the Protocol may result in various tax consequences, such as income or capital gains tax, value-added tax, goods and
        services tax, or sales tax in certain jurisdictions. It is your responsibility to determine whether taxes apply to any transactions you
        initiate or receive and, if so, to report and/or remit the correct tax to the appropriate tax authority.
      </p>

      <p>
        <strong>9.4 Platform Fee and Gas Fees</strong>
      </p>
      <p>
        A platform fee may be charged for use of the Website, which will be disclosed on the Website. In addition, blockchain transactions require the
        payment of transaction fees to the appropriate network, including Scroll network (&ldquo;Gas Fees&rdquo;). Except as otherwise expressly set
        forth in the terms of another offer, you will be solely responsible to pay the applicable platform fee and Gas Fees for any transaction that
        you initiate via the Website.
      </p>

      <p>
        <strong>9.5 Release of Claims</strong>
      </p>
      <p>
        You expressly agree that you assume all risks in connection with your access and use of the Website. You further expressly waive and release
        us from any and all liability, claims, causes of action, or damages arising from or in any way relating to your use of the Website. If you are
        a California resident, you waive the benefits and protections of California Civil Code &sect; 1542, which provides: &ldquo;[a] general release
        does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing
        the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party.&rdquo;
      </p>

      <h2>10. ASSUMPTION OF RISK</h2>
      <p className="uppercase">
        BY ACCESSING AND USING THE WEBSITE, YOU REPRESENT THAT YOU ARE FINANCIALLY AND TECHNICALLY SOPHISTICATED ENOUGH TO UNDERSTAND THE INHERENT
        RISKS ASSOCIATED WITH USING CRYPTOGRAPHIC AND BLOCKCHAIN-BASED SYSTEMS, AND THAT YOU HAVE A WORKING KNOWLEDGE OF THE USAGE AND INTRICACIES OF
        DIGITAL ASSETS SUCH AS ETHER (ETH), SO-CALLED STABLECOINS, AND OTHER DIGITAL TOKENS SUCH AS THOSE FOLLOWING THE ETHEREUM TOKEN STANDARD
        (ERC-20).
      </p>
      <p className="uppercase">
        IN PARTICULAR, YOU UNDERSTAND THAT THE MARKETS FOR THESE DIGITAL ASSETS ARE NASCENT AND HIGHLY VOLATILE DUE TO RISK FACTORS INCLUDING, BUT NOT
        LIMITED TO, ADOPTION, SPECULATION, TECHNOLOGY, SECURITY, AND REGULATION. YOU UNDERSTAND THAT ANYONE CAN CREATE A TOKEN, INCLUDING FAKE
        VERSIONS OF EXISTING TOKENS AND TOKENS THAT FALSELY CLAIM TO REPRESENT PROJECTS, AND ACKNOWLEDGE AND ACCEPT THE RISK THAT YOU MAY MISTAKENLY
        TRADE THOSE OR OTHER TOKENS. SO-CALLED STABLECOINS MAY NOT BE AS STABLE AS THEY PURPORT TO BE, MAY NOT BE FULLY OR ADEQUATELY COLLATERALIZED,
        AND MAY BE SUBJECT TO PANICS AND RUNS.
      </p>
      <p className="uppercase">
        FURTHER, YOU UNDERSTAND THAT SMART CONTRACT TRANSACTIONS AUTOMATICALLY EXECUTE AND SETTLE, AND THAT BLOCKCHAIN-BASED TRANSACTIONS ARE
        IRREVERSIBLE WHEN CONFIRMED. YOU ACKNOWLEDGE AND ACCEPT THAT THE COST AND SPEED OF TRANSACTING WITH CRYPTOGRAPHIC AND BLOCKCHAIN-BASED SYSTEMS
        SUCH AS ETHEREUM ARE VARIABLE AND MAY INCREASE DRAMATICALLY AT ANY TIME. YOU FURTHER ACKNOWLEDGE AND ACCEPT THE RISK OF SELECTING TO TRADE IN
        EXPERT MODES, WHICH CAN EXPOSE YOU TO POTENTIALLY SIGNIFICANT PRICE SLIPPAGE AND HIGHER COSTS.
      </p>
      <p className="uppercase">
        IF YOU ACT AS A LIQUIDITY PROVIDER TO THE PROTOCOL THROUGH THE WEBSITE, YOU UNDERSTAND THAT YOUR DIGITAL ASSETS MAY LOSE SOME OR ALL OF THEIR
        VALUE WHILE THEY ARE SUPPLIED TO THE PROTOCOL THROUGH THE WEBSITE DUE TO THE FLUCTUATION OF PRICES OF TOKENS IN A TRADING PAIR OR LIQUIDITY
        POOL.
      </p>
      <p className="uppercase">
        FINALLY, YOU UNDERSTAND THAT WE DO NOT CREATE, OWN, OR OPERATE CROSS-CHAIN BRIDGES AND WE DO NOT MAKE ANY REPRESENTATION OR WARRANTY ABOUT THE
        SAFETY OR SOUNDNESS OF ANY CROSS-CHAIN BRIDGE.
      </p>
      <p className="uppercase">
        IN SUMMARY, YOU ACKNOWLEDGE THAT WE ARE NOT RESPONSIBLE FOR ANY OF THESE VARIABLES OR RISKS, DO NOT OWN OR CONTROL THE PROTOCOL, AND CANNOT BE
        HELD LIABLE FOR ANY RESULTING LOSSES THAT YOU EXPERIENCE WHILE ACCESSING OR USING ANY OF OUR PRODUCTS. ACCORDINGLY, YOU UNDERSTAND AND AGREE
        TO ASSUME FULL RESPONSIBILITY FOR ALL OF THE RISKS OF ACCESSING AND USING THE WEBSITE TO INTERACT WITH THE PROTOCOL.
      </p>

      <h2>11. NO WARRANTIES</h2>
      <p className="uppercase">
        THE WEBSITE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM
        ANY REPRESENTATIONS AND WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF
        MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. YOU ACKNOWLEDGE AND AGREE THAT YOUR USE OF THE WEBSITE IS AT YOUR OWN RISK. WE DO NOT
        REPRESENT OR WARRANT THAT ACCESS TO THE WEBSITE OR ANY OF ITS FUNCTIONALITIES WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY, OR SECURE; THAT THE
        INFORMATION CONTAINED WILL BE ACCURATE, RELIABLE, COMPLETE, OR CURRENT; OR THAT THE WEBSITE WILL BE FREE FROM ERRORS, DEFECTS, VIRUSES, OR
        OTHER HARMFUL ELEMENTS. NO ADVICE, INFORMATION, OR STATEMENT THAT WE MAKE SHOULD BE TREATED AS CREATING ANY WARRANTY CONCERNING THE WEBSITE OR
        ANY OF ITS FUNCTIONALITIES. WE DO NOT ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY ADVERTISEMENTS, OFFERS, OR STATEMENTS MADE BY THIRD
        PARTIES CONCERNING SCROLL.
      </p>
      <p className="uppercase">
        SIMILARLY, THE PROTOCOL IS PROVIDED &ldquo;AS IS&rdquo;, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. ALTHOUGH WE CONTRIBUTED TO THE
        INITIAL CODE FOR THE PROTOCOL, WE DO NOT PROVIDE, OWN, OR CONTROL THE PROTOCOL, WHICH IS RUN AUTONOMOUSLY WITHOUT ANY HEADCOUNT BY SMART
        CONTRACTS DEPLOYED ON BLOCKCHAIN(S). NO DEVELOPER OR ENTITY INVOLVED IN CREATING THE PROTOCOL WILL BE LIABLE FOR ANY CLAIMS OR DAMAGES
        WHATSOEVER ASSOCIATED WITH YOUR USE, INABILITY TO USE, OR YOUR INTERACTION WITH OTHER USERS OF, THE PROTOCOL, INCLUDING ANY DIRECT, INDIRECT,
        INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES, OR LOSS OF PROFITS, CRYPTOCURRENCIES, TOKENS, OR ANYTHING ELSE OF VALUE. WE
        DO NOT ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY ADVERTISEMENTS, OFFERS, OR STATEMENTS MADE BY THIRD PARTIES CONCERNING THE WEBSITE
        OR ANY OF ITS FUNCTIONALITIES.
      </p>
      <p className="uppercase">
        ANY TRANSACTIONS THAT YOU ENGAGE IN WILL BE PROCESSED VIA AUTOMATED SMART CONTRACTS. ONCE EXECUTED, WE HAVE NO CONTROL OVER THESE
        TRANSACTIONS, NOR DO WE HAVE THE ABILITY TO REVERSE ANY TRANSACTIONS.
      </p>

      <h2>12. NO INVESTMENT ADVICE</h2>
      <p className="uppercase">
        WE MAY PROVIDE INFORMATION ABOUT TOKENS SOURCED FROM THIRD-PARTY DATA PARTNERS THROUGH FEATURES SUCH AS RARITY SCORES, TOKEN EXPLORER OR TOKEN
        LISTS. WE MAY ALSO PROVIDE WARNING LABELS FOR CERTAIN TOKENS. THE PROVISION OF INFORMATIONAL MATERIALS DOES NOT MAKE TRADES IN THOSE TOKENS
        SOLICITED; WE ARE NOT ATTEMPTING TO INDUCE YOU TO MAKE ANY PURCHASE AS A RESULT OF INFORMATION PROVIDED. ALL SUCH INFORMATION PROVIDED ON THE
        WEBSITE IS FOR INFORMATIONAL PURPOSES ONLY AND SHOULD NOT BE CONSTRUED AS INVESTMENT ADVICE OR A RECOMMENDATION THAT A PARTICULAR TOKEN IS A
        SAFE OR SOUND INVESTMENT. YOU SHOULD NOT TAKE, OR REFRAIN FROM TAKING, ANY ACTION BASED ON ANY INFORMATION CONTAINED ON THE WEBSITE. BY
        PROVIDING TOKEN INFORMATION FOR YOUR CONVENIENCE, WE DO NOT MAKE ANY INVESTMENT RECOMMENDATIONS TO YOU OR OPINE ON THE MERITS OF ANY
        TRANSACTION OR OPPORTUNITY. YOU ALONE ARE RESPONSIBLE FOR DETERMINING WHETHER ANY INVESTMENT, INVESTMENT STRATEGY OR RELATED TRANSACTION IS
        APPROPRIATE FOR YOU BASED ON YOUR PERSONAL INVESTMENT OBJECTIVES, FINANCIAL CIRCUMSTANCES, AND RISK TOLERANCE.
      </p>

      <h2>13. Indemnification and Limitation of Liability</h2>
      <p>
        You agree to hold harmless, release, defend, and indemnify Scroll, our affiliates and our affiliates&rsquo; respective officers, directors,
        employees, contractors, agents, service providers, representatives (collectively, the &ldquo;Scroll Parties&rdquo;) from and against all
        claims, damages, obligations, losses, liabilities, costs, and expenses arising from: (a) your access and use of the Website; (b) your
        violation of any term or condition of these Terms, the right of any third party, or any other applicable law, rule, or regulation; and (c) any
        other party&rsquo;s access and use of the Website with your assistance or using any device or account that you own or control; and (d) any
        dispute between you and (i) any other user of the Website or (ii) any of your own customers or users. We will provide notice to you of any
        such claim, suit, or proceeding. We reserve the right to assume the exclusive defense and control of any matter which is subject to
        indemnification under this section, and you agree to cooperate with any reasonable requests assisting our defense of such matter. You may not
        settle or compromise any claim against any Scroll Party without our written consent.
      </p>
      <p className="uppercase">
        UNDER NO CIRCUMSTANCES WILL SCROLL OR ANY SCROLL PARTY BE LIABLE TO YOU FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
        EXEMPLARY DAMAGES, INCLUDING (BUT NOT LIMITED TO) DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE PROPERTY, ARISING OUT
        OF OR RELATING TO ANY ACCESS OR USE OF THE WEBSITE, NOR WILL WE BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM HACKING,
        TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR USE OF THE WEBSITE OR THE INFORMATION CONTAINED WITHIN IT. WE ASSUME NO LIABILITY OR RESPONSIBILITY
        FOR ANY: (A) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (B) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM
        ANY ACCESS OR USE OF THE WEBSITE; (C) UNAUTHORIZED ACCESS OR USE OF ANY SECURE SERVER OR DATABASE IN OUR CONTROL, OR THE USE OF ANY
        INFORMATION OR DATA STORED THEREIN; (D) INTERRUPTION OR CESSATION OF FUNCTION RELATED TO THE WEBSITE; (E) BUGS, VIRUSES, TROJAN HORSES, OR THE
        LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE WEBSITE; (F) ERRORS OR OMISSIONS IN, OR LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF, ANY
        CONTENT MADE AVAILABLE THROUGH THE WEBSITE; AND (G) THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY.
      </p>
      <p className="uppercase">
        WE HAVE NO LIABILITY TO YOU OR TO ANY THIRD PARTY FOR ANY CLAIMS OR DAMAGES THAT MAY ARISE AS A RESULT OF ANY TRANSACTIONS THAT YOU ENGAGE IN
        VIA THE WEBSITE. EXCEPT AS EXPRESSLY PROVIDED FOR HEREIN, WE DO NOT PROVIDE REFUNDS FOR ANY PURCHASES THAT YOU MIGHT MAKE ON OR THROUGH THE
        WEBSITE.
      </p>
      <p className="uppercase">
        WE MAKE NO WARRANTIES OR REPRESENTATIONS, EXPRESS OR IMPLIED, ABOUT LINKED THIRD PARTY SERVICES, THE THIRD PARTIES THEY ARE OWNED AND OPERATED
        BY, THE INFORMATION CONTAINED ON THEM, ASSETS AVAILABLE THROUGH THEM, OR THE SUITABILITY, PRIVACY, OR SECURITY OF THEIR PRODUCTS OR SERVICES.
        YOU ACKNOWLEDGE SOLE RESPONSIBILITY FOR AND ASSUME ALL RISK ARISING FROM YOUR USE OF THIRD-PARTY SERVICES, THIRD-PARTY WEBSITES, APPLICATIONS,
        OR RESOURCES. WE SHALL NOT BE LIABLE UNDER ANY CIRCUMSTANCES FOR DAMAGES ARISING OUT OF OR IN ANY WAY RELATED TO SOFTWARE, PRODUCTS, SERVICES,
        AND/OR INFORMATION OFFERED OR PROVIDED BY THIRD-PARTIES AND ACCESSED THROUGH THE WEBSITE.
      </p>
      <p className="uppercase">
        SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR PERSONAL INJURY, OR OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS LIMITATION
        MAY NOT APPLY TO YOU. IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES (OTHER THAN AS MAY BE REQUIRED BY APPLICABLE LAW IN CASES
        INVOLVING PERSONAL INJURY) EXCEED THE AMOUNT OF ONE HUNDRED U.S. DOLLARS ($100.00 USD) OR ITS EQUIVALENT IN THE LOCAL CURRENCY OF THE
        APPLICABLE JURISDICTION.
      </p>
      <p className="uppercase">THE FOREGOING DISCLAIMER WILL NOT APPLY TO THE EXTENT PROHIBITED BY LAW.</p>

      <h2>14. Governing Law and Dispute Resolution</h2>
      <p>
        You agree that the laws of Hong Kong, without regard to principles of conflict of laws, govern these Terms and any dispute between you and us.
      </p>
      <p>
        Any dispute, controversy, difference or claim arising out of or relating to these Terms, including the existence, validity, interpretation,
        performance, breach or termination thereof or any dispute regarding non-contractual obligations arising out of or relating to it, shall be
        submitted to and finally resolved by arbitration administered by the Hong Kong International Arbitration Centre under its arbitration rules in
        force when the arbitration is submitted to it. The seat of arbitration shall be Hong Kong. The number of arbitrators shall be one. The
        arbitration proceedings shall be conducted in English.
      </p>
      <p>
        You must bring any and all disputes against us in your individual capacity and not as a plaintiff in or member of any purported class action,
        collective action, private attorney general action, or other representative proceeding. This provision applies to class arbitration. You and
        we both agree to waive the right to demand a trial by jury.
      </p>

      <h2>15. Entire Agreement</h2>
      <p>
        These Terms constitute the entire agreement between you and us with respect to the subject matter hereof. This Agreement supersedes any and
        all prior or contemporaneous written and oral agreements, communications and other understandings (if any) relating to the subject matter of
        the terms.
      </p>
    </Container>
  )
}

export default Terms
