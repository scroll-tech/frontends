import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

const Container = styled(Box)(({ theme }) => ({
  padding: "14rem 6rem",
  [theme.breakpoints.down("md")]: {
    padding: "8rem 2rem",
  },
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
    listStyle: "inside",
    "& li": {
      margin: "0.8rem 0",
    },
  },
}))

const TitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: "2rem",
}))

const TableofContents = styled("ul")(({ theme }) => ({
  listStyle: "decimal !important",
  paddingLeft: "4rem",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "2.8rem",
  },
  "& p": {
    textAlign: "center",
    lineHeight: "6rem",
    [theme.breakpoints.down("md")]: {
      lineHeight: "4rem",
    },
  },
  "& li": {
    margin: "0.4rem 0 !important",
    fontSize: "1.6rem !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem !important",
    },
  },
  "& a": {
    textTransform: "uppercase",
    fontSize: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
}))

const Terms = () => {
  return (
    <Container className="wrapper">
      <TitleTypography variant="h1">Website Terms and Conditions [Archived on Oct 9, 2023]</TitleTypography>
      <p>
        Scroll has updated the Website Terms and Conditions effective 8th March 2023. For existing Users, these updates will apply beginning on 8th
        March 2023. For new Users, these updates apply immediately.
      </p>
      <TableofContents>
        <p className="text-center">Table of Contents</p>
        <li>
          <a href="#Acknowledgment">Acknowledgment</a>
        </li>
        <li>
          <a href="#Privacy">Privacy</a>
        </li>
        <li>
          <a href="#Restrictions on Your Use of the Website">Restrictions on Your Use of the Website</a>
        </li>
        <li>
          <a href="#Accounts">Accounts</a>
        </li>
        <li>
          <a href="#Copyright Notice">Copyright Notice</a>
        </li>
        <li>
          <a href="#Intellectual Property">Intellectual Property</a>
        </li>
        <li>
          <a href="#Your Content">Your Content</a>
        </li>
        <li>
          <a href="#Feedback">Feedback</a>
        </li>
        <li>
          <a href="#Links to Other Websites">Links to Other Websites</a>
        </li>
        <li>
          <a href="#Links to Our Websites">Links to Our Websites</a>
        </li>
        <li>
          <a href="#Termination of Use">Termination of Use</a>
        </li>
        <li>
          <a href="#Indemnifications">Indemnifications</a>
        </li>
        <li>
          <a href="#Limitations and Exclusions of Liability">Limitations and Exclusions of Liability</a>
        </li>
        <li>
          <a href="#Force Majeure">Force Majeure</a>
        </li>
        <li>
          <a href="#Disclaimer">Disclaimer</a>
        </li>
        <li>
          <a href="#Limited Warranties">Limited Warranties</a>
        </li>
        <li>
          <a href="#Assignment">Assignment</a>
        </li>
        <li>
          <a href="#Third Party Rights">Third Party Rights</a>
        </li>
        <li>
          <a href="#Variations">Variations</a>
        </li>
        <li>
          <a href="#Waiver">Waiver</a>
        </li>
        <li>
          <a href="#Severability">Severability</a>
        </li>
        <li>
          <a href="#Entire Agreement">Entire Agreement</a>
        </li>
        <li>
          <a href="#Applicable Law and Dispute Resolution">Applicable Law and Dispute Resolution</a>
        </li>
        <li>
          <a href="#Contact Us">Contact Us</a>
        </li>
      </TableofContents>

      <h2>
        <a id="Acknowledgment">Acknowledgment</a>
      </h2>
      <p>
        Please read these terms and conditions carefully before using Scroll.io (hereinafter referred to as “Website”) operated by Scroll. The
        following terminology applies to our Website Terms and Conditions, Privacy Policy, Cookies Policy and Disclaimer Notice and any or all
        Agreements: "Client", “You” and “Your” refers to you, the person accessing this website and accepting the Company’s Terms and Conditions. "The
        Company", “Ourselves”, “We” and "Us", refers to Scroll. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the
        Client or ourselves. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken
        as interchangeable and therefore as referring to same.
      </p>
      <p>
        By accessing and/or using this Website you acknowledge to have read, understood and agreed to be legally bound by these Website Terms and
        Conditions that shall govern your use of the Website and our Service. Your access to and use of the Website is conditioned on your acceptance
        of and compliance with these Website Terms and Conditions. All visitors, users and others who access to the website or use our Service shall
        comply with these Website Terms and Conditions. If you disagree with any part of these Website Terms and Conditions, then you shall not access
        to the website or use our Service.
      </p>
      <p>
        Your access to and use of the Website is also conditioned on your acceptance of and compliance with our Privacy Policy and Cookies Policy.
        Please make sure to read our Privacy Policy and Cookies Policy carefully before using our Website or Service. If you disagree with any part of
        our Privacy Policy or Cookies Policy, then you shall not access to the website or use our Service.
      </p>
      <h2>
        <a id="Privacy">Privacy</a>
      </h2>
      <p>
        We are committed to protecting your privacy. We have complied, and are presently in compliance, with our Privacy Policy and with all
        obligations under applicable laws and regulations regarding the collection, use, transfer, storage, protection, disposal or disclosure of
        personally identifiable information or any other information collected from or provided by you. Please carefully read our Privacy Policy. We
        regularly review our systems and data to ensure the reasonably possible service to our customers. We will investigate any unauthorized actions
        with a view to prosecuting and/or taking civil proceedings to recover punitive and/or compensatory damages against those responsible.
      </p>
      <h2>
        <a id="Restrictions on Your Use of the Website">Restrictions on Your Use of the Website</a>
      </h2>
      <p>
        You may view, download and copy information and materials available on this Website solely for your personal and non-commercial use.
        <strong>No unauthorized commercial transaction can be made at the Website without our prior written consent.</strong>
      </p>
      <p>Except as expressly permitted by these Website Terms and Conditions, you must not do any of the following:</p>
      <ul>
        <li>Edit or otherwise modify any material on our Website;</li>
        <li>
          Use our Website in any way that causes, or may cause, damage to the Website or impairment of the operation, accessibility, or availability
          of the Website;
        </li>
        <li>Use data collected from our Website to contact any third party;</li>
        <li>
          Use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or
          harmful purpose or activity;
        </li>
        <li>
          Use our Website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any
          spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software;
        </li>
        <li>
          Conduct any systematic or automated data collection activities, including but not limited to, scraping, data mining, data extraction and
          data harvesting) on or in relation to our Website without our prior written consent.
        </li>
      </ul>
      <p>
        We reserve the right to restrict access to any areas of our Website, at our discretion. You must not circumvent or bypass, or attempt to
        circumvent or bypass, any access restriction measures on our Website.
      </p>
      <h2>
        <a id="Accounts">Accounts</a>
      </h2>
      <p>
        You may register for an account with our Website by completing and submitting the account registration form on our Website. If you register
        for an account with our Website, we will provide you with or you will be asked to choose a user ID and password. You must not use any other
        person's account to access the Website without that person's prior permission.
      </p>
      <p>
        You are responsible for maintaining the confidentiality of your user ID and password, including but not limited to the restriction of access
        to your computer and/or user ID. Sharing of your user ID or password is prohibited. You must not allow any other person to use your account to
        access the Website.
        <strong>
          You accept responsibility for any and all activities or actions that occur under your account. You accept responsibility for any losses
          arising out of any and all activities or actions that occur under your account.{" "}
        </strong>
        You must notify us in writing immediately if you become aware of any unauthorized use of your account or any breach of security.
      </p>
      <h2>
        <a id="Copyright Notice">Copyright Notice</a>
      </h2>
      <p>Copyright (c) [2023] Scroll.</p>
      <p>
        All text, graphics, design, content, feature and other works are copyrighted works of Scroll or third parties. We, together with our
        licensors, own and control all the copyright and other relevant intellectual property rights in the content and the material on our website.
        All the copyright and other intellectual property rights in the content and the material on our website are reserved.
      </p>
      <h2>
        <a id="Intellectual Property">Intellectual Property</a>
      </h2>
      <p>
        The Website and its related software are the intellectual property of and are owned by Scroll. The structure, organization, and code of the
        website and its related software comprise valuable trade secrets and confidential information of Scroll. All intellectual property rights
        relating to the Website or its related software are and will remain the exclusive property of Scroll.
      </p>
      <p>
        Unless otherwise expressly stated in writing, your accessing or using the Website or Service does not grant you any intellectual property
        rights whatsoever in the Website and its related software and all rights are reserved by Scroll. All the intellectual property rights in the
        Website and its related software are protected by copyright, trademark, and other laws. Our trademarks and trade dress, or any other content
        protected by any intellectual property rights, may not be used by you without our prior written consent. Our trademarks and trade dress, or
        any other content protected by any intellectual property rights, may not be used in or in connection with any product or service without our
        prior written consent.
      </p>
      <h2>
        <a id="Your Content">Your Content</a>
      </h2>
      <p>
        In these Website Terms and Conditions, "your content" means all works and materials, including but not limited to, text, graphics, images,
        audio material, video material, audio-visual material, scripts, software and files that you submit to us or our Website for storage or
        publication on, processing by, or transmission via, our Website.
      </p>
      <p>
        By using our Website, you warrant and represent that your content must not be illegal or unlawful, must not infringe any person's legal
        rights, must not be libelous or maliciously false, must not be obscene or indecent, must not constitute an incitement to commit a crime or
        instructions for the commission of a crime or the promotion of criminal activity, must not be pornographic, must not depict violence, and must
        not be capable of giving rise to legal action against any person (in each case in any jurisdiction and under any applicable law).
      </p>
      <p>
        <strong>
          You grant to us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, store and publish your content on and in
          relation to this Website and any successor website. You grant to us the right to sub-license your content and the right to bring an action
          based on the rights licensed to us.
        </strong>
      </p>
      <p>
        <strong>
          You hereby waive all your moral rights in your content to the maximum extent permitted by applicable law. You warrant and represent that all
          other moral rights in your content have been waived to the maximum extent permitted by applicable law.
        </strong>
      </p>
      <h2>
        <a id="Feedback">Feedback</a>
      </h2>
      <p>
        By submitting comments, feedback, information or materials (hereinafter referred as “Feedback”) to us, you acknowledge and expressly agree the
        following:
      </p>
      <ul>
        <li>All Feedback you submitted to Scroll.io through or in association with this Website are non-confidential;</li>
        <li>
          Any contribution of Feedback does not and will not give or grant you any right, title or interest in the Website or in any such Feedback;
        </li>
        <li>
          All Feedback becomes the sole and exclusive property of Scroll. Scroll may use and disclose Feedback in any manner and for any purpose
          whatsoever without further notice or compensation to you and without retention by you of any proprietary or other right or claim;
        </li>
        <li>
          You hereby assign to Scroll any and all rights, title and interest in any Feedback you provide us. If for any reason such assignment is
          ineffective, you agree to grant us a non-exclusive, perpetual, irrevocable, royalty free, worldwide right and license to use, copy, display,
          reproduce, disclose, sub-license, distribute, modify and exploit such Feedback in any way we choose in an unrestricted basis.
        </li>
      </ul>
      <h2>
        <a id="Links to Other Websites">Links to Other Websites</a>
      </h2>
      <p>
        Our Website may contain links to third-party sites that we do not own or operate. A third-party site link is not an indication that we endorse
        such sites, or are in a manner affiliated to them. These third-party sites are owned, operated and controlled by third parties. We strongly
        advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit. You should evaluate
        the security and trustworthiness of any other site connected to this site or accessed through this site yourself, before deciding to disclose
        any personal information to them.
      </p>
      <p>
        Links to third-party sites do not imply that Scroll is legally authorized to use any trademark, trade name, logo or copyright material
        displayed on the sites. With respect to any trademark, logo or copyrighted material displayed on the third-party sites, ownership of which
        belongs to third parties, Scroll gives full credit of ownership to respective third parties.
      </p>
      <p>
        We have no role to play in their control or operation. We assume no responsibility for the privacy policy and/or content of such third-party
        sites.
        <strong>
          We disclaim liability for any and all forms of loss or damage arising out of your use of such third-party sites. We are not liable for any
          fraud, theft, financial misdemeanor or illegal activities that may occur as a result of your transactions on third-party websites that may
          be connected or displayed at the Website. You further acknowledge and agree that Scroll shall not be responsible or liable, directly or
          indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods
          or services available on or through any such third-party sites or services.
        </strong>
      </p>
      <h2>
        <a id="Links to Our Websites">Links to Our Websites</a>
      </h2>
      <p>
        You may not create a link to any page of this Website without our prior written consent. If you do create a link to a page of this Website,
        you do so at your sole risk. By linking or creating a link to any page of this Website, you acknowledge and agree that the Website Terms and
        Conditions will apply to your use of or link to this Website through the link you create.
      </p>
      <h2>
        <a id="Termination of Use">Termination of Use</a>
      </h2>
      <p>
        We may terminate or suspend your account or access to our Website immediately, without prior notice or liability, under our sole discretion,
        for any reason whatsoever and without limitation, including but not limited to your breach of any provisions in the Website Terms and
        Conditions.
      </p>
      <p>
        Upon termination, your right to use the Website will cease immediately. If you wish to terminate unilaterally from your end, you may simply
        discontinue using the Website.
      </p>
      <h2>
        <a id="Indemnifications">Indemnifications</a>
      </h2>
      <p>
        <strong>
          You agree to defend, indemnify and hold harmless Scroll, its affiliates, directors, officers, employees, agents, members, third party
          information providers and independent contractors against any and all claims, actions, suits, damages, costs, fees, losses, liabilities,
          obligations and expenses (including, but not limited to, reasonable attorneys fees) arising out of or related to any user content that you
          use, or otherwise transmit on or through the Website, your use or inability to use the Website, your breach or alleged breach of the Website
          Terms and Conditions or of any representation or warranty contained herein, your violation of any rights or activities or actions that occur
          under your account.
        </strong>
      </p>
      <h2>
        <a id="Limitations and Exclusions of Liability">Limitations and Exclusions of Liability</a>
      </h2>
      <p>
        <strong>
          Notwithstanding any damages that you might incur, the entire liability under any provision of this Website Terms and Conditions and your
          exclusive remedy for all of the foregoing shall be limited to the greater of (1) the amount actually paid by you to the Website in the
          preceding 12 month period, or (2) 100 USD.
        </strong>
        To the extent that our Website and the information and services on our website are provided free of charge, we will not be liable for any loss
        or damage of any nature.
      </p>
      <p>
        To the maximum extent permitted by applicable law, in no event shall we be liable for any special, incidental, indirect, or consequential loss
        or damages whatsoever (including, but not limited to, damages for loss of profits, loss or corruption of any data, database or other
        information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability
        to use the Website, third-party software and/or third-party hardware used with the Website, or otherwise in connection with any provision of
        this Website Terms and Conditions), even if we have been advised of the possibility of such damages and even if the remedy fails of its
        essential purpose. We will not be liable to you in respect of any business losses, including (without limitation) loss of or damage to
        profits, income, revenue, use, production, anticipated savings, business, contracts, commercial opportunities or goodwill. We will not be
        liable to you in respect of any loss or damages arising out of any event beyond our reasonable control.
      </p>
      <p>
        You acknowledge and agree that Scroll does not have possession, custody, or control over any asset on the Website (other than assets that
        Scroll holds); Scroll does not have possession, custody, or control over any of your crypto assets or funds as when you interact with Website
        or any third-party sites; you retain complete control over your assets at all times. Scroll cannot and does not guarantee the functionality,
        security, or availability of the Website.
      </p>
      <p>
        You accept that we have an interest in limiting the personal liability of our directors, officers and employees and, having regard to that
        interest, you acknowledge that we are a limited liability entity. You agree that you will not bring any claim personally against our
        directors, officers or employees in respect of any losses you suffer in connection with the Website or these Website Terms and Conditions.
      </p>
      <p>
        These Limitations and Exclusions of Liabilities clause shall govern all liabilities arising under these Website Terms and Conditions or
        relating to the subject matter of these Website Terms and Conditions, including liabilities arising in contract, in tort (including
        negligence) and for breach of statutory duty, except to the extent expressly provided otherwise in these Website Terms and Conditions.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which
        means that some of the above limitations may not apply. In these jurisdictions, each party's liability will be limited to the greatest extent
        permitted by law.
      </p>
      <h2>
        <a id="Force Majeure">Force Majeure</a>
      </h2>
      <p>
        In no event shall any party be liable or responsible to the other for any failure or delay to perform any obligation under any agreement of
        these Website Terms and Conditions due to an event beyond the control of such party (including but not limited to strikes, work stoppages,
        accidents, act of god, acts of terrorism or war, political insurgence, insurrection, riot, civil unrest, act of civil or military authority,
        uprising, earthquake, flood or any other natural or man-made eventuality outside of our control, which causes the termination of an agreement
        or contract entered into, nor which could have been reasonably foreseen). Any party affected by such event shall forthwith inform the other
        party of the same and shall use all reasonable endeavors to comply with the Website Terms and Conditions.
      </p>
      <h2>
        <a id="Disclaimer">Disclaimer</a>
      </h2>
      <p>
        The website and its service is provided to you on an "as is" and “as available” basis and with all faults and defects without warranty of any
        kind. To the fullest extent permitted by applicable laws and regulations, we, on our own behalf and on behalf of our affiliates and our
        respective licensors and service providers, expressly excludes and disclaims all representations and warranties relating to this Website and
        its contents or which is or may be provided by any affiliates or any other third party, including in relation to any inaccuracies or omissions
        in this Website and/or the Company’s literature. Without limitation to the foregoing, we provide no warranty or undertaking, and make no
        representation of any kind that our Website or Service will meet your requirements, achieve any intended results, be compatible or work with
        any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error
        free or that any errors or defects can or be corrected. We do not warrant or represent the accuracy of the information published on our
        Website, or that the content on the Website is up to date, or that the Website or any service on the Website will remain available.
      </p>
      <p>
        <strong>
          We expressly exclude and disclaim all liability for damages arising out of or in connection with the use of this website. This includes,
          without limitation, direct loss, loss of business or profits (whether or not the loss of such profits was foreseeable, arose in the normal
          course of things or you have advised this Company of the possibility of such potential loss), damage caused to your computer, computer
          software, systems and programs and the data thereon or any other direct or indirect, consequential and incidental damages.
        </strong>
      </p>
      <p>
        Some jurisdictions do not allow the exclusion of certain warranties or limitations, so such exclusions and limitations may not apply to You.
        But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under
        applicable laws and regulations.
      </p>
      <h2>
        <a id="Limited Warranties">Limited Warranties</a>
      </h2>
      <p>
        We reserve the right to discontinue or alter any or all of our Website, and to stop publishing our Website, at any time in our sole discretion
        without notice or explanation. <strong>We also reserve the right to save to the extent expressly provided otherwise in these </strong>Website
        <strong>
          Terms and Conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any Website
          services, or if we stop publishing the Website.
        </strong>
      </p>
      <p>
        To the maximum extent permitted by applicable laws and regulations, we exclude and disclaim all representations and warranties relating to the
        subject matter of these Website Terms and Conditions, our Website and the use of our Website.
      </p>
      <h2>
        <a id="Assignment">Assignment</a>
      </h2>
      <p>
        You hereby agree that we may assign, transfer, sub-contract or otherwise deal with all rights, interests, and/or obligations under these
        Website Terms and Conditions without your prior written consent.
      </p>
      <p>
        You may not without our prior written consent assign, transfer, sub-contract or otherwise deal with any of your rights, interests, and/or
        obligations under these Website Terms and Conditions.
      </p>
      <h2>
        <a id="Third Party Rights">Third Party Rights</a>
      </h2>
      <p>
        A contract under these Website Terms and Conditions is for our benefit and your benefit, and is not intended to benefit or be enforceable by
        any third party. A person who is not a party to this contract under these Website Terms and Conditions has no right to enforce or to enjoy the
        benefit of any term under these Website Terms and Conditions. The exercise of the parties' rights under a contract under these Website Terms
        and Conditions is not subject to the consent of any third party.
      </p>
      <h2>
        <a id="Variations">Variations</a>
      </h2>
      <p>
        We may revise these Website Terms and Conditions from time to time at our sole discretion. The revised Website Terms and Conditions shall
        apply to the use and users of our Website from the date of publication of the revised Website Terms and Conditions on the Website. You hereby
        waive any right you may otherwise have to be notified of, or to consent to, revisions of these Website Terms and Conditions.
      </p>
      <h2>
        <a id="Waiver">Waiver</a>
      </h2>
      <p>
        Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Website Terms and Conditions
        shall not be considered a waiver of those rights, shall not affect our ability to exercise such right or require such performance at any time
        thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
      </p>
      <h2>
        <a id="Severability">Severability</a>
      </h2>
      <p>
        If any provision of these Website Terms and Conditions is held by any court or other competent authority to be invalid, unlawful and/or
        unenforceable, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent under
        applicable laws and regulations, and the remaining provisions will continue in full force and effect.
      </p>
      <h2>
        <a id="Entire Agreement">Entire Agreement</a>
      </h2>
      <p>
        Subject to the Limitation and Exclusions of Liabilities clause, these Website Terms and Conditions, together with our Privacy Policy and
        Cookies Policy, shall constitute the entire agreement between you and us in relation to your use of our Website and shall supersede all
        previous agreements between you and us in relation to your use of our Website.
      </p>
      <h2>
        <a id="Applicable Law and Dispute Resolution">Applicable Law and Dispute Resolution</a>
      </h2>
      <p>
        These Website Terms and Conditions shall be governed by and construed in accordance with the laws of California, United States, without regard
        to its conflict of law provisions. Any disputes relating to these Website Terms and Conditions shall be resolved by arbitration in California
        before one arbitrator. The arbitration shall be administered by JAMS pursuant to JAMS' Streamlined Arbitration Rules and Procedures.
      </p>
      <p>
        <strong>For European Union (EU) Users</strong>
      </p>
      <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the European Union.</p>
      <p>
        <strong>United States Legal Compliance</strong>
      </p>
      <p>
        You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been
        designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government
        list of prohibited or restricted parties.
      </p>
      <h2>
        <a id="Contact Us">Contact Us</a>
      </h2>
      <p>This website is owned and operated by Scroll.</p>
      <p>
        If you have any questions about these Website Terms and Conditions, You can contact us by sending us an email:{" "}
        <a className="underline" href="mailto:hi@scroll.io">
          hi@scroll.io
        </a>
      </p>
    </Container>
  )
}

export default Terms
