import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const Container = styled(Box)<any>(({ theme, isPopup }) => ({
  padding: isPopup ? "1rem" : "14rem 6rem",
  overflow: "auto",
  "::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "& *": {
    fontSize: isPopup ? "1.8rem" : "2rem",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  "& h2": {
    fontSize: isPopup ? "2rem" : "2.4rem",
    fontWeight: "bold",
    margin: isPopup ? "1.2rem 0" : "1.6rem 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
      margin: "2.8rem 0 1.2rem 0",
    },
  },
  "& p": {
    marginBottom: isPopup ? "1rem" : "1.6rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  "& ul": {
    listStyle: "decimal",
    marginLeft: "1.6rem",
    "& ul": {
      listStyle: "lower-alpha",
      "& ul": {
        listStyle: "circle",
      },
    },
    "& li": {
      paddingLeft: isPopup ? "0.4rem" : "2rem",
      margin: "0.8rem 0",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0.4rem",
      },
    },
  },
}))

const TitleTypography = styled(Typography)<any>(({ theme, isPopup }) => ({
  textAlign: "center",
  marginBottom: "2rem",
  display: isPopup ? "none" : "block",
}))

const TOC = props => {
  const { isPopup = false } = props

  return (
    <Container className="wrapper" isPopup={isPopup}>
      <TitleTypography isPopup={props.isPopup} variant="h1">
        Scroll Sessions Program Terms of Use
      </TitleTypography>
      <p>Last updated: May 10, 2024</p>
      <p>
        Scroll Foundation, a foundation organized under the laws of the Seychelles (“<strong>Scroll Foundation</strong>”, “<strong>we</strong>”, or “
        <strong>us</strong>”) provides a website-hosted user interface (the “<strong>Interface</strong>”) for accessing and participating in Scroll
        Sessions, a loyalty rewards program in connection with the use of Scroll protocol (the “<strong>Program</strong>").&nbsp;
      </p>
      <ul>
        <li>
          <h2>Acceptance of Terms </h2>
          <ul>
            <li>
              By using the Interface and assessing and participating in the Program, you agree to be bound by these Terms of Use (these “
              <strong>Scroll Sessions Terms</strong>” or “<strong>Terms</strong>”). These Terms shall govern your access to and activities in relation
              to the Program, and supplement our Terms of Service and Privacy Policy. By participating in the Program, you agree to be bound by these
              Terms and our Terms of Service and Privacy Policy. Certain capitalized terms used but not defined in these Scroll Sessions Terms will
              have the meanings ascribed to them in our Terms of Service.
            </li>
            <li>
              We may update the Terms from time to time in our sole discretion. If we do, we will post the changes on this page and will indicate at
              the top of this page the date these Terms were last revised. If you continue to participate in the Program after we have posted updated
              Terms, it means that you accept and agree to the changes. If you don’t agree to be bound by the changes, you may not participate in the
              Program anymore. We may change or discontinue all or any part of the Program, at any time and without notice, at our sole discretion.
            </li>
          </ul>
        </li>
        <li>
          <h2>Eligibility and Participation in the Program </h2>
          <ul>
            <li>
              You agree that in order to participate in the Program, you:
              <ul style={{ listStyle: "disc" }}>
                <li>Must be at least 18 years of age;</li>
                <li>Must not be a U.S. person (defined below);</li>
                <li>
                  Must not reside in a jurisdiction where participation in this Program may be prohibited, restricted or unauthorized in any form or
                  manner, whether in full or in part, under the laws, regulatory requirements or rules in the jurisdiction in which the participant is
                  located; and
                </li>
                <li>Must not be a Prohibited Person under our Terms of Service.</li>
              </ul>
            </li>
            <li>
              We reserve the right to deny or void your participation in the Program in any manner we deem fit, including in the event we discover
              that you do not fulfill these conditions.
            </li>
            <li>
              In these Terms, a “U.S. person” shall mean the following:
              <ul style={{ listStyle: "lower-roman" }}>
                <li>Any natural person resident in the United States;</li>
                <li>Any partnership or corporation organized or incorporated under the laws of the United States;</li>
                <li>Any estate of which any executor or administrator is a U.S. person;</li>
                <li>Any trust of which any trustee is a U.S. person;</li>
                <li>Any agency or branch of a foreign entity located in the United States;</li>
                <li>
                  Any non-discretionary account or similar account (other than an estate or trust) held by a dealer or other fiduciary for the benefit
                  or account of a U.S. person;
                </li>
                <li>
                  Any discretionary account or similar account (other than an estate or trust) held by a dealer or other fiduciary organized,
                  incorporated, or (if an individual) resident in the United States; and
                </li>
                <li>
                  Any partnership or corporation if (A) organized or incorporated under the laws of any foreign jurisdiction and (B) formed by a U.S.
                  person principally for the purpose of investing in securities not registered under the Act, unless it is organized or incorporated,
                  and owned, by accredited investors (as defined in § 230.501(a)) who are not natural persons, estates or trusts.
                </li>
              </ul>
            </li>
            <li>
              This Program is only available to users in certain jurisdictions who can participate as permitted under applicable law. You agree that
              you will comply with all applicable laws (e.g., local, state, federal and other laws) when using the Services and participating in the
              Program. Without limiting the foregoing, by participating in this Program, you represent and warrant that: (a) you are not located in a
              country , region or territory against which the U.S. Government maintains comprehensive economic or financial sanctions or trade
              embargoes; and (b) you are not listed on any U.S. Government list of prohibited, sanctioned, or restricted parties or otherwise the
              subject or target of any sanctions administered or enforced the U.S. government. You are solely responsible for ensuring that your
              access and use of the Services and participation in the Program does not violate any applicable laws, including without limitation
              applicable economic and trade sanctions and export control laws and regulations, such as those administered and enforced by the EU,
              OFSI, OFAC, the U.S. Department of State, the U.S. Department of Commerce, the UN Security Council, and other relevant authorities. You
              agree that you will not use a Virtual Private Network (VPN) or similar tool, to circumvent or attempt to circumvent prohibitions under
              applicable laws or regulations. We reserve the right, but have no obligation, to monitor where participants to the Program are accessed
              from. Furthermore, we reserve the right, at any time, in our sole discretion, to block access to the Program, in whole or in part, from
              any geographic location, IP addresses and unique device identifiers or disqualify from the Program any user who we believe is in breach
              of these Terms.
            </li>
            <li>
              You shall not access the Interface or participate in the Program for any malicious or illegal purposes. We reserve the right to
              disqualify you from the Program and revoke any and all of Scroll Marks allocated to you under the Program in the event that you carry
              out malicious or illegal activities with respect to Scroll, the Service or the Program or otherwise violate these Terms (including
              without limitation the general prohibitions and restrictions set out in Section 5) or our Terms of Service.
            </li>
          </ul>
        </li>
        <li>
          <h2>Accessing the Interface and Participating in the Program</h2>
          <ul>
            <li>
              You will access and use the Interface for informational purposes only and you will participate in the Program strictly in accordance
              with these Terms. You are solely responsible for verifying the accuracy of any information obtained in connection with Scroll, the
              Service, the Interface or in relation to the Program before using or participating in any of them.
            </li>
            <li>
              You may access the Interface with a third-party cryptocurrency wallet, whether or not custodial, desktop, mobile, or “hot” or “cold”.
              These wallet services are third-party services and by using a third-party wallet, you agree that you are using that wallet under the
              terms and conditions of the applicable provider of the wallet. Third-party wallets are not operated by, maintained by, or affiliated
              with Scroll Foundation, and Scroll Foundation does not have possession, custody or control over the contents of or any digital assets in
              your wallet and has no ability to retrieve or transfer the contents or digital assets in your wallet.
            </li>
            <li>
              We accept no responsibility for, or liability to you, in connection with your use of a third-party wallet and make no representations or
              warranties regarding how the Interface, the Program or the Service will operate with any specific wallet. You are solely responsible for
              keeping your wallet secure and you should never share your wallet credentials or seed phrase with anyone. If you discover an issue
              related to your wallet, please contact the wallet provider.
            </li>
            <li>
              The Program may make reference to third party applications or protocols which provide third party services built on Scroll network (“
              <strong>Third-Party Protocols</strong>”). These Third-Party Protocols are not operated or controlled by Scroll Foundation, and your use
              of these Third-Party Protocols is entirely at your own risk. In the case where you choose to place transactions through these
              Third-Party Protocols and these transactions are not successful due to an error with the Third-Party Protocols, we accept no
              responsibility or liability to you for any such failed transactions, or any transaction or gas fees that may be incurred by you in
              connection with such failed transactions. Additionally, these Third-Party Protocols may impose a fee or charge for services. We are not
              responsible for any fees charged by a third party.
            </li>
          </ul>
        </li>
        <li>
          <h2>Reward of Scroll Marks</h2>
          <ul>
            <li>
              In your use of the Services and by participating in the Program, you may be attributed certain points, social or reputation indicators
              or other intangible rewards (“<strong>Scroll Marks</strong>”). Scroll Marks reward users’ participation and engagement in the Scroll
              ecosystem and are for tracking activities and loyalty only and do not represent any right to receive any assets or tokens in the future
              or any claim against Scroll Foundation. Scroll Foundation makes no guarantees, representations, or warranties regarding the value,
              availability, fungibility, exchangeability, or utility of Scroll Marks.
            </li>
            <li>
              Scroll Marks are not, and may never convert to, accrue to, be used as basis to calculate, or become any other tokens or virtual assets
              or distribution thereof. Scroll Marks are virtual items with no monetary value. Scroll Marks do not constitute any currency or property
              of any type and are not redeemable, refundable, or eligible for any fiat or virtual currency or anything else of value. Scroll Marks are
              not transferable between users, and you may not attempt to sell, trade, or transfer any Scroll Marks, or obtain any manner of credit
              using any Scroll Marks. Any attempt to sell, trade, or transfer any Scroll Marks or tokens redeemable for or representing any Scroll
              Marks will be null and void.
            </li>

            <li>
              The operation of the Program and allocation of Scroll Marks is dynamic, and will be based, in part, on several factors and criteria to
              be determined in the sole discretion of Scroll Foundation. Scroll Foundation makes no representation or guarantee that any user will
              receive any Scroll Marks or achieve any particular outcome as a result of holding any Scroll Marks or otherwise participating in the
              Program.
            </li>
          </ul>
        </li>
        <li>
          <h2>General Prohibitions and Restrictions</h2>
          You agree that:
          <ul>
            <li>
              you will not:
              <ul style={{ listStyle: "disc" }}>
                <li>
                  Violate any law, contract, intellectual property or other third-party right, and that you are solely responsible for your conduct
                  and content while accessing or using the Service or participating in the Program.
                </li>
                <li>
                  Distribute any content that: (i) infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret,
                  moral rights or other intellectual property rights, or rights of publicity or privacy; (ii) violates, or encourages any conduct that
                  would violate, any applicable law or regulation or would give rise to civil liability; (iii) is fraudulent, false, misleading or
                  deceptive; (iv) is defamatory, obscene, pornographic, vulgar or offensive; (v) promotes discrimination, bigotry, racism, hatred,
                  harassment or harm against any individual or group; (vi) is violent or threatening or promotes violence or actions that are
                  threatening to any person or entity; or (vii) promotes illegal or harmful activities or substances;
                </li>
                <li>
                  Use, display, mirror or frame the Services, the Program or any individual element within the Services, the Program, Scroll
                  Foundation’s name, any Scroll trademark, logo or other proprietary information, or the layout and design of any page or form
                  contained on a page, without Scroll Foundation’s express written consent;
                </li>
                <li>
                  Access, tamper with, or use non-public areas of the Services, the Interface, Scroll Foundation computer systems, or the technical
                  delivery systems of Scroll Foundation providers;
                </li>
                <li>
                  Attempt to probe, scan or test the vulnerability of any Scroll Foundation system or network or breach any security or authentication
                  measures;
                </li>
                <li>
                  Avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any technological measure implemented by Scroll
                  Foundation or any of Scroll Foundation providers or any other third party (including another user) to protect the Services or the
                  Program;
                </li>
                <li>
                  Attempt to access or search the Services or download content from the Services using any engine, software, tool, agent, device or
                  mechanism (including spiders, robots, crawlers, data mining tools or the like) other than the software and/or search agents provided
                  by Scroll Foundation or other generally available third-party web browsers;
                </li>
                <li>
                  Attempt to decipher, decompile, disassemble or reverse engineer any of the software used to provide the Services or the Program;
                </li>
                <li>
                  Interfere with, or attempt to interfere with, the access of any user, host or network, including, without limitation, sending a
                  virus, overloading, flooding, spamming, or mail-bombing the Services or the Program;
                </li>
                <li>
                  Collect or store any personally identifiable information from the Services or the Program from other users of the Services or the
                  Program without their express permission;
                </li>
                <li>
                  Engage or assist in any activity that violates any law, statute, ordinance,or regulation, including but not limited to any sanctions
                  administered or enforced by the U.S. Department of Treasury’s Office of Foreign Assets Control (“<strong>OFAC</strong>”), or that
                  involves proceeds of any unlawful activity (including but not limited to money laundering, terrorist financing or deliberately
                  engaging in activities designed to adversely affect the performance of the Services or participation in or administration of the
                  Program);
                </li>
                <li>
                  Engage in wash trading, sybil attacks, front running, pump and dump trading, ramping, cornering, or other deceptive or manipulative
                  trading activities while using the Services or participating in the Program;
                </li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
                <li>Further or promote any criminal activity or enterprise or provide instructional information about illegal activities; and</li>
              </ul>
            </li>
            <li>
              Scroll Foundation is not obligated to monitor access to or use of the Services or participation in the Program or to review or edit any
              content. However, we have the right to do so for the purpose of operating the Services and the Program, to ensure compliance with these
              Terms and our Terms of Service and to comply with applicable law or other legal requirements. We reserve the right, but are not
              obligated, to remove or disable access to any content at any time and without notice, including, but not limited to, if we, at our sole
              discretion, consider it objectionable or in violation of these Terms. We have the right to investigate violations of these Terms or our
              Terms of Service or conduct that affects the Services. We may also consult and cooperate with law enforcement authorities to prosecute
              users who violate the law.
            </li>
          </ul>
        </li>
        <li>
          <h2>Disclaimer</h2>
          YOUR USE OF THE INTERFACE, THE SERVICE AND/OR YOUR PARTICIPATION IN THE PROGRAM ARE AT YOUR SOLE RISK. THE SERVICE, INTERFACE AND PROGRAM
          ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. THE INDEMNIFIED PARTIES EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS,
          IMPLIED OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          THE INDEMNIFIED PARTIES MAKE NO WARRANTY THAT (A) THE SERVICE, THE INTERFACE OR PROGRAM WILL MEET YOUR REQUIREMENTS; (B) THE SERVICE,
          INTERFACE, OR PROGRAM WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE
          SERVICE, INTERFACE OR PROGRAM OR (D) THE QUALITY OF ANY SERVICES, APPLICATIONS, INFORMATION, OR OTHER MATERIAL OBTAINED BY YOU THROUGH THE
          SERVICE, INTERFACE OR PROGRAM WILL MEET YOUR EXPECTATIONS.
          <br />
          <br />
          YOU AGREE THAT THESE TERMS AND ANY INFORMATION PROVIDED BY OR OBTAINED FROM THE SERVICE, THE INTERFACE OR PROGRAM ARE FOR INFORMATIONAL
          PURPOSES ONLY, ARE NOT INTENDED TO BE RELIED UPON FOR PROFESSIONAL ADVICE OF ANY SORT, AND ARE NOT A SUBSTITUTE FOR INFORMATION FROM EXPERTS
          OR PROFESSIONALS IN THE APPLICABLE AREA. YOU SHOULD NOT TAKE, OR REFRAIN FROM TAKING, ANY ACTION OR DECISION BASED ON ANY INFORMATION
          CONTAINED ON OR RECEIVED IN CONNECTION WITH THE SERVICE, THE INTERFACE OR THE PROGRAM. IF, AND BEFORE YOU MAKE ANY FINANCIAL, LEGAL, OR
          OTHER DECISIONS, YOU SHOULD SEEK INDEPENDENT PROFESSIONAL ADVICE FROM AN INDIVIDUAL WHO IS LICENSED AND QUALIFIED IN THE AREA FOR WHICH SUCH
          ADVICE WOULD BE APPROPRIATE.
          <br />
          <br />
          THESE TERMS ARE NOT INTENDED TO, AND DO NOT, CREATE OR IMPOSE ANY FIDUCIARY DUTIES ON US. TO THE FULLEST EXTENT PERMITTED BY LAW, YOU
          ACKNOWLEDGE AND AGREE THAT WE OWE NO FIDUCIARY DUTIES OR LIABILITIES TO YOU OR ANY OTHER PARTY, AND THAT TO THE EXTENT ANY SUCH DUTIES OR
          LIABILITIES MAY EXIST AT LAW OR IN EQUITY, THOSE DUTIES AND LIABILITIES ARE HEREBY IRREVOCABLY DISCLAIMED, WAIVED, AND ELIMINATED. YOU
          FURTHER AGREE THAT THE ONLY DUTIES AND OBLIGATIONS THAT WE OWE YOU ARE THOSE SET OUT EXPRESSLY IN THESE TERMS.
        </li>
        <li>
          <h2>Indemnification</h2>
          You specifically agree that you will be personally responsible for your use of the Service, the Interface and your participation in the
          Program. To the fullest extent permitted by applicable laws, you agree to indemnify, defend and hold harmless Scroll, as well as its
          affiliates and service providers, and each of their respective past, present and future officers, directors, members, employees,
          consultants, representatives and agents, and each of their respective successors and assigns (the “<strong>Indemnified Parties</strong>”)
          from and against all actual or alleged third party claims, damages, awards, judgments, losses, liabilities, obligations, taxes, penalties,
          interest, fees, expenses (including, without limitation, attorneys’ fees and expenses) and costs (including, without limitation, court
          costs, costs of settlement and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known or
          unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or otherwise
          (collectively, “<strong>Claims</strong>”), including, but not limited to, damages to property or personal injury, that are caused by, arise
          out of or are related to: (a) your use of the Service, the Interface or your participation in the Program, or any site or service accessible
          as part of the Service, the Interface or the Program; (b) your violation of these Terms, our Terms of Service, or Privacy Policy, or
          applicable law; (c) your violation of the rights of a third party; (d) your negligence or willful misconduct and (e) any disputes or issues
          between you or any third party. You agree to promptly notify us of any third party Claims and cooperate with the Indemnified Parties in
          defending such Claims. You further agree that the Indemnified Parties shall have the right to control the defense or settlement of any third
          party Claims as they relate to us, if they so choose.
        </li>
        <li>
          <h2>Limitation of Liability</h2>
          TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY (INCLUDING, WITHOUT LIMITATION, TORT,
          CONTRACT, STRICT LIABILITY, OR OTHERWISE) SHALL THE INDEMNIFIED PARTIES OR ANY OF THEM BE LIABLE TO YOU OR TO ANY OTHER PERSON FOR: (A) ANY
          INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING DAMAGES FOR LOST PROFITS, BUSINESS INTERRUPTION,
          LOSS OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, ACCURACY OF RESULTS, OR COMPUTER FAILURE OR MALFUNCTION; (B) ANY SUBSTITUTE GOODS, SERVICES
          OR TECHNOLOGY; (C) ANY AMOUNT, IN THE AGGREGATE, IN EXCESS OF ONE-HUNDRED (US$100) UNITED STATES DOLLARS; OR (D) ANY MATTER BEYOND THE
          REASONABLE CONTROL OF THE INDEMNIFIED PARTIES OR ANY OF THEM. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR
          CONSEQUENTIAL OR CERTAIN OTHER DAMAGES, SO THE ABOVE LIMITATIONS AND EXCLUSIONS MAY NOT APPLY TO YOU.
        </li>
        <li>
          <h2>Representations and Warranties</h2>
          By accessing or using the Service or the Interface or participating in the Program, you represent and warrant that:
          <ul>
            <li>You have read and understood these Terms, our Terms of Service and Privacy Policy;</li>
            <li>
              You have not been identified as a specially designated national or placed on any sanctions list maintained by the U.S government,
              including OFAC, and are not otherwise the subject or target of any sanctions administered or enforced by the U.S. government, and you
              will not use our Website to conduct any illegal or illicit activity;
            </li>
            <li>You are not a U.S. person as defined above;</li>
            <li>
              You are not a resident, citizen, national or agent of, or an entity organized, incorporated or doing business in, Cuba, Iran, North
              Korea, Syria, the Crimea region of Ukraine, the so-called Donetsk People’s Republic and Luhansk People’s Republic regions of Ukraine, or
              any other country, region or territory against which the United States, the United Kingdom, the European Union or any of its member
              states or the United Nations or any of its member states maintain comprehensive economic or financial sanctions or trade embargoes;
            </li>
            <li>
              You understand and agree that you are solely responsible for maintaining the security of your wallet and your control over any
              wallet-related authentication credentials, private or public cryptocurrency keys, non-fungible tokens or cryptocurrencies that are
              stored in or are accessible through your wallet. Any unauthorized access to your cryptocurrency wallet by third parties could result in
              the loss or theft of your assets held in your wallet and any associated wallets, including any linked financial information such as bank
              account(s) or credit card(s). We are not responsible for managing and maintaining the security of your cryptocurrency wallet nor for any
              unauthorized access to or use of your cryptocurrency wallet. You will notify us immediately If you notice any unauthorized or suspicious
              activity in your cryptocurrency wallet that seems to be related to the Service or this Program;
            </li>
            <li>
              You possess adequate financial and technical knowledge to understand the inherent risks associated with using cryptographic and
              blockchain-based systems, and purchasing and holding cryptocurrency. You understand that the markets for digital assets are nascent and
              highly volatile, and that various risk factors such as adoption, speculation, technology, security, and regulation can impact their
              value;
            </li>
            <li>
              You assume full responsibility for all the risks associated with accessing and using the Service, the Interface and/or participating in
              the Program, and understand that we are not responsible for any of these variables or risks, do not own or control the protocol, and
              cannot be held liable for any losses resulting from your use of the Service, the Interface or your participation in the Program; and
            </li>
            <li>
              You understand that Scroll Foundation makes no representation or guarantee that any user will receive any Scroll Marks or achieve any
              particular outcome as a result of holding any Scroll Marks or otherwise participating in the Program.
            </li>
          </ul>
        </li>
        <li>
          <h2>Incorporation of General Terms</h2>
          You agree that you have read Clauses 14 to 19 of the Scroll Terms of Service, and that the terms therein shall apply to these Terms, mutatis
          mutandis.
        </li>
      </ul>
    </Container>
  )
}

export default TOC
