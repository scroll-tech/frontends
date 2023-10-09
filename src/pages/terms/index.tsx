import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Link from "@/components/Link"

const Container = styled(Box)(({ theme }) => ({
  padding: "14rem 6rem",
  "& *": {
    fontSize: "2rem",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  "& h2": {
    fontSize: "2.4rem",
    fontWeight: "bold",
    margin: "4rem 0 1.6rem 0",
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
    padding: "8rem 1.6rem",
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
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}))

const TitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: "2rem",
}))

const Terms = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">Terms of Service</TitleTypography>
      <p>Last updated: October 9, 2023</p>
      <p>
        Scroll Foundation (“Scroll Foundation”, “we,” “us,” or “our”), currently provides a website-hosted user interface that can be accessed at
        <LinkStyled href="/bridge"> https://scroll.io/bridge</LinkStyled> (the “Interface”) for accessing, and certain information about, Scroll
        network, a layer-2 protocol that scales Ethereum (“Scroll”), as well as related content about Scroll and functionality through websites
        located at <LinkStyled href="/"> https://scroll.io</LinkStyled>, which includes{" "}
        <LinkStyled href="/bridge"> https://scroll.io/bridge</LinkStyled>, <LinkStyled href="/portal"> https://scroll.io/portal</LinkStyled> (each, a
        “Site” and collectively, the “Sites”). We also currently provide access and information about Scroll through our related technologies,
        including all of our existing and any updated or new features, functionalities and technologies (the Interface and all such features,
        functionalities and technologies, collectively, the “Service”).
      </p>

      <p>
        Scroll and the suite of open source software underlying it are contributed, used, and supported by a wide variety of participants. Scroll
        Foundation is one of these many participants and contributes to the Scroll ecosystem. To facilitate the early-stage development of the Scroll
        ecosystem, Scroll Foundation currently operates the Sites. Scroll Foundation may transition the maintenance and operation of certain Sites to
        one or more separate entities that are part of the Scroll community in the future.
      </p>

      <p>
        These Website Terms and Conditions (these “Terms”) set forth the legally binding terms and conditions that govern your use of the Service and
        Sites. Please note that certain parts and features of the Service or Site may be subject to additional guidelines, terms, or rules, which will
        be posted on the Site in connection with such parts and features. All such additional terms, guidelines, and rules, including but not limited
        to the Privacy Policy and the Cookies Policy, are incorporated by reference into these Terms. By accessing or using the Service or any Sites,
        you are accepting these Terms (on behalf of yourself or the entity that you represent), and you represent and warrant that you have the
        willingness, right, authority, and capacity to enter into these Terms (on behalf of yourself or the entity that you represent).
      </p>

      <p>
        We reserve the right to change these Terms at any time. All changes are effective immediately when we post them. Your continued use of the
        Service or any Site following the posting of revised Terms means that you accept and agree to the changes. Please check this page frequently
        so you are aware of any changes, as they are binding on you.
      </p>

      <p>
        SECTION 14 CONTAINS AN ARBITRATION AGREEMENT WHICH WILL, WITH LIMITED EXCEPTIONS, REQUIRE DISPUTES BETWEEN YOU AND US TO BE SUBMITTED TO
        BINDING AND FINAL ARBITRATION.{" "}
        <strong>
          YOU ARE AGREEING TO MANDATORY ARBITRATION FOR THE RESOLUTION OF DISPUTES AND WAIVING YOUR RIGHT TO A JURY TRIAL ON YOUR CLAIMS.
        </strong>{" "}
        BY ACCESSING OR USING THE SERVICE OR ANY OF THE SITES, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS,
        INCLUDING THE BINDING ARBITRATION AGREEMENT. IF YOU DO NOT AGREE TO ALL OF THESE TERMS IN THEIR ENTIRETY, PLEASE DO NOT USE THE SERVICE OR ANY
        OF THE SITES IN ANY MANNER.
      </p>

      <p>
        <strong>DISCLAIMERS</strong>
      </p>
      <ul>
        <li>
          <p>
            THE SERVICE AND EACH SITE IS PROVIDED BY SCROLL FOUNDATION ON AN “AS-IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
            INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT
            AVAILABILITY, ACCESSIBILITY, OR USE OF THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE.
          </p>
        </li>
        <li>
          <p>
            We make no representation, warranty, guarantee, or undertaking regarding Scroll or any of its products, services, or activities, or
            regarding the Service or any Site, whether express or implied, including but not limited to warranties of compliance, accuracy,
            reliability, validity, merchantability, fitness for a particular purpose, quality, availability, durability, and noninfringement, or as to
            any of it being uninterrupted, error free, free of harmful components, or secure.
          </p>
        </li>
        <li>
          <p>
            We are not liable for, or in connection with, any actions, proceedings, claims, damages, expenses or other liabilities, whether in an
            action of contract, tort or otherwise, arising from, related to or in connection with Scroll or any of its products, services, or
            activities, or the Service or any Site, or the use or dealings in or with any of them or in reliance thereon.
          </p>
        </li>
        <li>
          <p>
            We are not, do not speak for, and cannot bind, the Scroll community. The Scroll community is a collection of independent contributors to
            Scroll. Scroll Foundation is a separate, independent entity. While we currently contribute to the Scroll ecosystem, we do not speak for
            the community, and cannot contractually bind it in any manner.
          </p>
        </li>
        <li>
          <p>
            We do not endorse third parties or third party information. Any time we link to, quote or otherwise reference a third party or reproduce
            or incorporate their information, content or material, it is solely for informational purposes. You should not assume that we have
            verified the accuracy of, or endorse in any way, such information, content or materials.
          </p>
        </li>
        <li>
          <p>
            When we talk about future ideas or prospects, we are expressing our vision and hopes, and there is no commitment or guarantee that it will
            come true, that we will implement any of it, or that it will work.
          </p>
          <ul>
            <li>
              <p>
                <strong>Access to the Service and Sites; Your Apps. </strong> You may only access or use the Service and Sites or accept the Terms if
                you are an individual of legal age to form a binding contract (or if not, you have received your parent’s or guardian’s permission to
                use the Service or Site and have gotten your parent or guardian to agree to the Terms on your behalf). If you are agreeing to the
                Terms on behalf of an organization or entity, you represent and warrant that you are authorized to agree to the Terms on that
                organization’s or entity’s behalf and bind them to the Terms (in which case, the references to “you” and “your” in the Terms, except
                for in this sentence and in the paragraph directly above, refer to that organization or entity). You are responsible for maintaining
                the confidentiality of your credentials and are fully responsible for any and all activities that occur under your credentials.
              </p>
              <p>
                As between Scroll Foundation and you, you will be solely responsible for your applications (“Your Apps”), including their development,
                operation, maintenance and all related content and materials.
              </p>
            </li>
            <li>
              <p>
                <strong>License; Open Source Components. </strong>
                Subject to these Terms, you are hereby granted a non-transferable, non-exclusive, revocable, limited license to use and access the
                Sites and the Service solely for your own personal, non-commercial use, subject to the following restrictions: (a) you shall not
                license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Service or Sites, whether in
                whole or in part, or any content displayed on the Service or Sites; and (b) you shall not modify, make derivative works of,
                disassemble, reverse compile or reverse engineer any part of the Service or Sites. All copyright and other proprietary notices on the
                Service and Sites (or on any content displayed on the Service or Sites) must be retained on all copies thereof.
              </p>
              <p>
                As noted above, certain software components underlying Scroll are made available under separate open source licenses, such as the MIT
                License and other open source licenses. You agree not to violate the terms of any such open source licenses. In the event of a
                conflict between the license granted to you in these Terms and any separate licenses for any software components underlying Scroll,
                the separate license will prevail with respect to the software that is the subject of the separate license.
              </p>
            </li>
            <li>
              <p>
                <strong>The Interface. </strong>
                The Interface facilitates your ability to access Scroll, but the Interface is distinct from Scroll. It provides one, but not the
                exclusive, means of accessing Scroll. Scroll is public, permissionless, and runs on open-source self-executing smart contracts. Scroll
                enables people to do various things, such as processing Ethereum transactions more efficiently and interacting with smart
                contract-based applications (“dApps”). The Interface, on the other hand, enables you to initiate messages to Scroll to bridge digital
                assets between the Ethereum and Scroll public blockchains.
              </p>
            </li>
            <li>
              <p>
                <strong> Your Use of Wallets. </strong>
                To access the Interface or other components of the Service, you must use non-custodial wallet software (a “Web3 wallet”), which
                constructs and broadcasts the data (“transactions”) that allows you to interact with Scroll. By using your Web3 wallet in connection
                with accessing the Interface or other components of the Service, you agree that you are using the Web3 wallet under the terms and
                conditions of the applicable provider of the Web3 wallet. No Web3 wallet is created by, operated by, maintained by, or affiliated with
                us. Accordingly, we do not have custody or control over the contents of your Web3 wallet and we have no ability to retrieve or
                transfer its contents. Your relationship with any given Web3 wallet provider is governed by the applicable terms of service of that
                third party, not these Terms.
              </p>
            </li>
            <li>
              <p>
                <strong>Assumption of risk. </strong>
                By using the Service or any Sites, you (a) represent that you are sophisticated enough to understand the various inherent risks of
                using cryptographic and public blockchain-based systems, including but not limited to the Interface and other components of the
                Service, Scroll, and digital assets, and (b) acknowledge and accept all such risks, and agree that we make no representations or
                warranties (expressly or implicitly) regarding, and that you will not hold us liable for those risks, including but not limited to the
                risks described below, any or all of which could lead to losses and damages, including the total and irrevocable loss of your assets.
                These risks include, but are not limited to:
                <ul>
                  <li>
                    <p>
                      <strong>Wallet security and safekeeping. </strong>
                      You are solely responsible for the safeguarding and security of your Web3 wallets. If you lose your wallet seed phrase, private
                      keys, or password, you may be forever unable to access your digital assets. Any unauthorized access to your wallet by third
                      parties could result in the loss or theft of your digital assets. We have no involvement in, or responsibility for, storing,
                      retaining, securing or recovering your Web3 wallet seed phrases, private keys, or passwords, or for any unauthorized access to
                      your Web3 wallet.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Blockchain technology. </strong>
                      Public blockchains, and the technology underlying and interacting with cryptographic and public blockchain-based systems, are
                      experimental, inherently risky, and subject to change. Among other risks, bugs, malfunctions, cyberattacks, or changes to a
                      particular public blockchain (e.g., via forks) could disrupt these technologies irreparably. There is no guarantee that any of
                      these technologies will not become unavailable, degraded, or subject to hardware or software errors, operational or technical
                      difficulties, denial-of-service attacks, other cyberattacks, or other problems requiring maintenance, interruptions, delays, or
                      errors.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Network cost and performance. </strong>
                      The cost, speed, and availability of transacting on public blockchain systems are subject to significant variability. There is
                      no guarantee that any transfer will be confirmed or transferred successfully.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Blockchain transactions and smart contract execution. </strong>
                      Public blockchain-based transactions (including but not limited to transactions automatically executed by smart contracts) are
                      generally considered irreversible when confirmed. Any transaction that will interact with smart contracts or be recorded on a
                      public blockchain must be recorded with extreme caution.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Digital assets. </strong>
                      The markets for digital assets are nascent and highly volatile due to various risk factors including (but not limited to)
                      adoption, speculation, technology, security, and regulation. Digital assets and their underlying blockchain networks are complex
                      emerging technologies that may be subject to delays, halts or go offline as a result of errors, forks, attacks or other
                      unforeseeable reasons. Anyone can create a digital asset, including fake versions of existing digital assets and digital assets
                      that falsely claim to represent projects. So-called stablecoins may not be as stable as they purport to be, may not be fully or
                      adequately collateralized, and may be subject to panics and runs. You are solely responsible for understanding the risks
                      specific to each digital asset that is relevant to you.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Cyber Security. </strong>
                      In addition to being an especially novel and untested implementation of blockchain technology in general, cross-blockchain
                      bridging technology and other blockchain related technology has historically been, and may in the future be, the subject of
                      numerous cyberattacks and exploits, including without limitation hacks that exploit a vulnerability in the associated software,
                      hardware, systems or other equipment or social engineering to gain control of the any bridge or other blockchain-related
                      components, wallets, smart contracts or other related systems.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Control of Scroll. </strong>
                      Scroll is subject to periodic upgrades, which may introduce other risks, bugs, malfunctions, cyberattack vectors, or other
                      changes to Scroll that could disrupt the operation of the Interface or other components of the Service, the functionality of
                      bridging, your ability to access bridged digital assets, or otherwise cause you damage or loss.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Third Party Risks. </strong>
                      Third-party products (including dApps) carry their own individual, often times highly significant risks. When you use the
                      Interface to interact with any third-party products, you are subject to all of those risks. We disclaim all risk arising from
                      the acts and omissions of any third party, including any third party with whom you transact or interact with using the Service.
                      We are not responsible for confirming the identity of or overseeing any third party with whom you may interact using the
                      Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Legal Process. </strong>
                      We may suspend or terminate your use of the Service if you or any of your assets are subject to legal process or other
                      encumbrance restricting any transaction or your use of the Service, and to address and investigate any suspicious activity we
                      identify in connection with your use of the Service. We may comply with any such legal process. We may, but are not required to,
                      request that you provide information and documentation regarding your identity and assets in order to use the Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Legislative and regulatory risks. </strong>
                      Digital assets, blockchain technology, and any related software and services are subject to legal and regulatory uncertainty in
                      many jurisdictions. Legislative and regulatory changes or actions may adversely affect the usage, transferability,
                      transactability and accessibility of digital assets, bridging, Scroll, or the Interface or other components of the Service.
                    </p>
                  </li>
                </ul>
              </p>
            </li>
            <li>
              <p>
                <strong>Intellectual Property Rights. </strong>
                The Service and the Sites and their entire contents, features, and functionality (including but not limited to all information,
                software, text, displays, images, video and audio, and the design, selection, and arrangement thereof), are owned by us, our licensors
                or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property
                or proprietary rights laws. Neither these Terms (nor your access to the Service or any Sites) transfers to you or any third party any
                rights, title or interest in or to such intellectual property rights, except as indicated otherwise.
              </p>
            </li>
            <li>
              <p>
                <strong>Feedback. </strong>
                If you provide us with any feedback or suggestions regarding the Service or any Sites (“Feedback”), you hereby assign to us all rights
                in such Feedback and agree that we have the right to use and fully exploit such Feedback and related information in any manner we deem
                appropriate. Any Feedback you provide will be treated as non-confidential and non-proprietary, and we will be entitled to the
                unrestricted use and dissemination of such Feedback for any purpose, commercial or otherwise, without acknowledgment, attribution, or
                compensation to you.
              </p>
            </li>
            <li>
              <p>
                <strong>Third-Party Materials. </strong>
                The Service and Sites contain references, links, and enables you to connect to third-party resources including (but not limited to)
                Web3 wallets, non-standard bridges, applications (including dApps), and other information, materials, products, or services, which we
                do not own or control (collectively, “third-party products”). We do not approve, monitor, endorse, make any representations or
                warranties (expressly or implicitly) or assume any responsibility for any third-party products, any component thereof, or the manner
                in which those products or components interact with the Service or any Sites. When you use or rely on any third-party products, you do
                so at your own risk. You understand that you are solely responsible for any fees or costs associated with using third-party products
                and that, unless stated herein, the Terms do not otherwise apply to your dealings or relationships with any third parties or
                third-party products.
              </p>
            </li>
            <li>
              <p>
                <strong>Prohibited Uses; Legal Compliance. </strong>
                You may use the Service or any Sites only for lawful purposes and in accordance with these Terms. The following are examples of the
                kinds of content and/or uses that are prohibited. Scroll Foundation reserves the right to investigate and take appropriate legal
                action against anyone who, in Scroll Foundation’s sole discretion, violates this provision, including reporting the violator to law
                enforcement authorities.
              </p>
              <p>You agree not to:</p>
              <ul>
                <li>
                  <p>
                    use Scroll, the Service or any Sites (including Your Apps) in any way that violates any applicable federal, state, local, or
                    international law or regulation, including, without limitation, any applicable sanctions laws, export control laws, securities
                    laws, anti-money laundering laws, privacy laws;
                  </p>
                </li>
                <li>
                  <p>use any device, software or routine that interferes with the proper working of Scroll, the Service or any Site;</p>
                </li>
                <li>
                  <p>
                    use any data mining tools, robots, crawlers, or similar data gathering and extraction tools to scrape or otherwise remove data
                    from the Service or any Site or harvest or otherwise collect information from the Service or any Site for any unauthorized
                    purpose;
                  </p>
                </li>
                <li>
                  <p>
                    use any manual process to monitor or copy any of the material on the Service or any Site or for any other unauthorized purpose
                    without our prior written consent;
                  </p>
                </li>
                <li>
                  <p>
                    attempt to probe, scan or test the vulnerability of Scroll, the Service or any Site, or otherwise seek to interfere with or
                    compromise the integrity, security, or proper functioning of Scroll, the Service or any Site;
                  </p>
                </li>
                <li>
                  <p>
                    attempt to interfere with the proper working of Scroll, the Service or any Site, or interfere with, damage, or disrupt any parts
                    of Scroll, the Service or any Site, the server(s) on which any of them are stored, or any server, computer or database connected
                    to any of them;
                  </p>
                </li>
                <li>
                  <p>further or promote any criminal activity or enterprise or provide instructional information about illegal activities;</p>
                </li>
                <li>
                  <p>
                    engage in any activity that seeks to defraud us or any other person or entity, including providing any false, inaccurate, or
                    misleading information in order to unlawfully obtain the property of another;
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    engage in any activity for which you do not possess the required permits, licenses, registrations, authorizations, or other
                    qualifications required by applicable law.
                  </p>
                </li>
                <li>
                  <p>
                    reverse engineer, disassemble, or decompile the Service or any Site or apply any other process or procedure to derive the source
                    code of any software included in Service or any Site except to the extent applicable law does not allow this restriction or such
                    rights have been expressly granted to you under a separate license;
                  </p>
                </li>
                <li>
                  <p>sublicense, sell, or otherwise distribute the Service or any Site, or any portion thereof;</p>
                </li>
                <li>
                  <p>
                    use the Service or any Site to distribute any content that (i) infringes any intellectual property or other proprietary rights of
                    any party; (ii) you do not have a right to upload under any law or under contractual or fiduciary relationships; (iii) contains
                    software viruses or any other computer code, files or programs designed to interrupt, destroy, or limit the functionality of any
                    computer software or hardware or telecommunications equipment; (iv) poses or creates a privacy or security risk to any person; (v)
                    constitutes unsolicited or unauthorized advertising, promotional materials, commercial activities and/or sales; (vi) is unlawful,
                    harmful, threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous,
                    invasive of another’s privacy, hateful or discriminatory; or (vii) may expose Scroll Foundation or its users to any harm or
                    liability of any type
                  </p>
                </li>
                <li>
                  <p>
                    attack Scroll, the Service or Site via a denial-of-service attack or a distributed denial-of-service attack or otherwise attempt
                    to interfere with the proper working of Scroll, the Service or any Site; or
                  </p>
                </li>
                <li>
                  <p>encourage or enable any other person to do any of the foregoing.</p>
                </li>
              </ul>
              <p>
                If you are blocked by Scroll Foundation from accessing the Service or any Sites (including by blocking your IP address), you agree not
                to implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address or virtual private
                network).
              </p>
              <p>
                You represent and warrant that you will comply with all laws that apply to you, your use of the Service and Sites, and your actions
                and omissions that relate to the Service and Sites. If your use of the Service or any of the Sites is prohibited by applicable laws,
                then you are not authorized to use the Service or the Site and you must immediately cease using the Service or the Site. We will not
                be responsible for your using the Service or any of the Sites in a way that is a violation of any law.
              </p>
            </li>
            <li>
              <p>
                <strong>Export Controls and Sanctions Laws. </strong>
                By using the Service or any Sites, you represent, warrant, and covenant that:
              </p>
              <ul>
                <li>
                  <p>
                    neither you, nor any of your affiliates, nor, as applicable, any director, officer, employee, shareholder, agent, or
                    representative of you or any of your affiliates is or shall become a Prohibited Person;
                  </p>
                </li>
                <li>
                  <p>
                    you, your affiliates, and, as applicable, your directors, officers, employees, agents, and representatives and those of your
                    affiliates are and have been in full compliance with Export Controls and Sanctions Laws, and shall not directly or indirectly
                    engage in or facilitate any transaction, act, dealing, or practice in the use of the Service or Sites or otherwise in connection
                    with these Terms that could cause any party to these Terms, including Scroll Foundation to violate or be subject to penalty or any
                    other adverse consequences under any Export Controls and Sanctions Laws;
                  </p>
                </li>
                <li>
                  <p>
                    you shall immediately cease using the Service or the Site (i) in the event that you, any of your affiliates, or, as applicable,
                    any of your directors, officers, employees, shareholders, agents, or representatives or those of your affiliates becomes a
                    Prohibited Person; or (ii) of any other changes to or noncompliance with any representation, warranty, or covenant provided
                    herein; and
                  </p>
                </li>
                <li>
                  <p>
                    you shall fully cooperate with Scroll Foundation in responding to any internal or government inquiry, investigation, or audit
                    concerning compliance with Export Controls and Sanctions Laws in connection with these Terms.
                  </p>
                </li>
              </ul>
              <p>
                Notwithstanding anything to the contrary in these Terms, if you, your affiliates, or, as applicable, any of your directors, officers,
                employees, shareholders, agents, or representatives or those of your affiliates becomes a Prohibited Person at any time in which you
                are using the Service or Sites, or if performance under these Terms otherwise becomes unlawful or may, in Scroll Foundation’s sole
                discretion, subject Scroll Foundation to negative consequences under Export Controls and Sanctions Laws, then Scroll Foundation may,
                in its sole discretion, reject and block any transaction or your access to the Service and Sites and any interests in property, or
                terminate, cancel, or suspend in whole or in part the Service, without any liability of Scroll Foundation to you.
              </p>
              <p>For purposes of this Section:</p>
              <ul>
                <li>
                  <p>
                    “Export Controls and Sanctions Laws” means all applicable export control and economic sanctions laws and regulations imposed,
                    administered, or enforced from time to time by (i) the U.S. government, including the Export Administration Regulations, the
                    International Traffic in Arms Regulations, and the trade and economic sanctions regulations administered by the U.S. Department of
                    Treasury’s Office of Foreign Assets Control (“OFAC”); and (ii) the United Nations Security Council, the European Union, any
                    European Union member state, the United Kingdom, and any other applicable governmental authority;
                  </p>
                </li>
                <li>
                  <p>
                    “Prohibited Person” means (i) any individual, entity, or wallet address that has been determined by competent authority to be the
                    subject or target of any prohibition or restriction under Export Controls and Sanctions Laws; (ii) the government, including any
                    political subdivision, agency, or instrumentality thereof, of any Sanctioned Jurisdiction or Venezuela; (iii) any individual or
                    entity located, organized, operating, or residing in any Sanctioned Jurisdiction; (iv) any individual, entity, or wallet address
                    that has been identified on the OFAC Specially Designated Nationals and Blocked Persons List or Consolidated Sanctions List, or
                    designated on any similar list or order published by the U.S. government or any other applicable governmental authority,
                    including, without limitation, the Denied Persons List, Entity List, Unverified List, or Military End User List of the U.S.
                    Department of Commerce, or the Debarred List or Nonproliferation Sanctions List of the U.S. Department of State; and (v) any
                    individual, entity, or wallet address owned or controlled by, or that acts for or on behalf of, any of the foregoing; and
                  </p>
                </li>
                <li>
                  <p>
                    “Sanctioned Jurisdiction” means, at any time, any country, region or territory which is itself the subject or target of
                    comprehensive economic sanctions or embargoes under Export Controls and Sanctions Laws, including, without limitation, Cuba, Iran,
                    North Korea, Syria, the Crimea region of Ukraine, and the so-called Donetsk People’s Republic and Luhansk People’s Republic
                    regions of Ukraine.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <strong>Indemnification; Release. </strong>
                To the fullest extent permitted by applicable laws, you agree to indemnify, defend and hold harmless Scroll Foundation, as well as its
                affiliates and service providers, and each of their respective past, present and future officers, directors, members, employees,
                consultants, representatives and agents, and each of their respective successors and assigns (the “Indemnified Parties”) from and
                against all actual or alleged third party claims, damages, awards, judgments, losses, liabilities, obligations, taxes, penalties,
                interest, fees, expenses (including, without limitation, attorneys’ fees and expenses) and costs (including, without limitation, court
                costs, costs of settlement and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known or
                unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or
                otherwise (collectively, “Claims”), including, but not limited to, damages to property or personal injury, that are caused by, arise
                out of or are related to: (a) your use of Scroll, the Service or any Site; (b) your violation of these Terms or applicable law; (c)
                your violation of the rights of a third party; and (d) your negligence or willful misconduct. You agree to promptly notify us of any
                third party Claims and cooperate with the Indemnified Parties in defending such Claims. You further agree that the Indemnified Parties
                shall have the right to control the defense or settlement of any third party Claims as they relate to us, if they so choose.
              </p>
              <p>
                You expressly agree that you assume all risks in connection with your use of the Service and Sites, and your interaction with the
                Protocol. You further expressly waive and release the Indemnified Parties from any and all liability, claims, causes of action, or
                damages arising from or in any way relating to your use of the Service or any Sites or your interaction with the Service or any Sites.
                If you are a California resident, you waive California Civil Code Section 1542, which says: “A general release does not extend to
                claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release
                and that, if known by him or her, would have materially affected his or her settlement with the debtor or releasing party.” If you are
                a resident of another jurisdiction, you waive any comparable statute or doctrine.
              </p>
            </li>
            <li>
              <p>
                <strong>Disclaimers. </strong>
                YOUR USE OF THE SERVICE AND SITES IS AT YOUR SOLE RISK. THE SERVICE AND SITES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. THE
                INDEMNIFIED PARTIES EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING THE IMPLIED
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. THE INDEMNIFIED PARTIES MAKE NO WARRANTY
                THAT (A) THE SERVICE AND SITES WILL MEET YOUR REQUIREMENTS; (B) THE SERVICE AND SITES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
                ERROR-FREE; (C) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE AND SITES WILL BE ACCURATE OR RELIABLE; OR (D) THE
                QUALITY OF ANY PRODUCTS, SERVICES, APPLICATIONS, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE OR
                SITES WILL MEET YOUR EXPECTATIONS.
              </p>
              <p className="uppercase">
                You agree that these Terms and any information provided by or obtained from the Service or any Sites are for informational purposes
                only, are not intended to be relied upon for professional advice of any sort, and is not a substitute for information from experts or
                professionals in the applicable area. You should not take, or refrain from taking, any action or decision based on any information
                contained in the Service or any Sites. If, and before you make any financial, legal, or other decisions involving the Interface or any
                other components of the Service, or Scroll, you should seek independent professional advice from an individual who is licensed and
                qualified in the area for which such advice would be appropriate.
              </p>
              <p className="uppercase">
                These Terms are not intended to, and do not, create or impose any fiduciary duties on us. To the fullest extent permitted by law, you
                acknowledge and agree that we owe no fiduciary duties or liabilities to you or any other party, and that to the extent any such duties
                or liabilities may exist at law or in equity, those duties and liabilities are hereby irrevocably disclaimed, waived, and eliminated.
                You further agree that the only duties and obligations that we owe you are those set out expressly in these Terms.
              </p>
            </li>
            <li>
              <p>
                <strong>Limitation of Liability. </strong>
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
              <p>
                <strong>Arbitration. </strong>
                You agree that any dispute, controversy, difference or claim arising out of or relating to these Terms or to any aspect of your
                relationship with us, including the validity, interpretation, performance, breach or termination of these Terms, or any dispute
                regarding non-contractual obligations arising out of or relating to them shall be referred to and finally resolved by arbitration
                administered by the Hong Kong International Arbitration Centre (“HKIAC”) under the HKIAC Administered Arbitration Rules in force when
                the Notice of Arbitration (as defined therein) is submitted in accordance with those rules, which rules are deemed to be incorporated
                by reference to this Section and as may be amended by this Section. The arbitration tribunal shall consist of three arbitrators. The
                official language of the arbitration shall be English and the seat of the arbitration shall be in Hong Kong. The award of the
                arbitration tribunal shall be final and binding upon the parties to the arbitration. The arbitration agreement constituted by this
                Section shall be governed by and construed in accordance with the laws of Hong Kong. Any party hereto to an award may apply to any
                court of competent jurisdiction for enforcement of such award and, for purposes of the enforcement of such award, the parties
                irrevocably and unconditionally submit to the jurisdiction of any court of competent jurisdiction and waive any defences to such
                enforcement based on lack of personal jurisdiction or inconvenient forum.
              </p>
            </li>
            <li>
              <p>
                <strong>Waiver of class or other non-individualized relief. </strong>
                ALL DISPUTES, CLAIMS, AND REQUESTS FOR RELIEF WITHIN THE SCOPE OF THIS AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON
                A CLASS OR COLLECTIVE BASIS, ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND CLAIMS OF MORE THAN ONE USER CANNOT BE ARBITRATED OR
                CONSOLIDATED WITH THOSE OF ANY OTHER USER.
              </p>
            </li>
            <li>
              <p>
                <strong>Governing Law. </strong>These Terms are governed by and will be construed under the laws of Hong Kong, excluding its body of
                law controlling conflict of laws. You agree that the Service and Sites shall be deemed to be based solely in Hong Kong, and that
                although the Service and Sites may be available in other jurisdictions, their availability does not give rise to general or specific
                personal jurisdiction in any forum outside Hong Kong. You agree that any judicial proceeding will be brought in the courts located in
                Hong Kong.
              </p>
            </li>
            <li>
              <p>
                <strong>Conflict of Provisions. </strong>In the event that there exists a conflict between any term, condition or provision contained
                within these Terms, and in any term, condition, or provision contained within any other specific part or feature, the term, condition,
                or provision contained in such specific part or feature will control.
              </p>
            </li>
            <li>
              <p>
                <strong>Severability. </strong>If any part or parts of these Terms is held by a court or other tribunal of competent jurisdiction to
                be invalid, illegal, or unenforceable for any reason, such part or parts shall be eliminated or limited to the minimum extent such
                that the remaining provisions of the Terms will continue in full force and effect.
              </p>
            </li>
            <li>
              <p>
                <strong>Entire Agreement. </strong>
                These Terms, our Privacy Policy and Cookies Policy constitute the sole and entire agreement between you and us with respect to the
                Service and Sites and supersede all prior and contemporaneous understandings, agreements, representations and warranties, both written
                and oral, with respect to any of the Service and Sites.
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </Container>
  )
}

export default Terms
