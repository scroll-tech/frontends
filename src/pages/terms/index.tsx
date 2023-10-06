import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Link from "@/components/Link"

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

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "2rem",
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
      <TitleTypography variant="h1">Website Terms of Service</TitleTypography>
      <p>
        Last updated: October 9<sup>th</sup>, 2023
      </p>
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

      <p>DISCLAIMERS</p>
      <ul>
        <li>
          THE SERVICE AND EACH SITE IS PROVIDED BY SCROLL FOUNDATION ON AN “AS-IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
          INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT
          AVAILABILITY, ACCESSIBILITY, OR USE OF THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE.
        </li>
        <li>
          We make no representation, warranty, guarantee, or undertaking regarding Scroll or any of its products, services, or activities, or
          regarding the Service or any Site, whether express or implied, including but not limited to warranties of compliance, accuracy, reliability,
          validity, merchantability, fitness for a particular purpose, quality, availability, durability, and noninfringement, or as to any of it
          being uninterrupted, error free, free of harmful components, or secure.
        </li>
        <li>
          We are not liable for, or in connection with, any actions, proceedings, claims, damages, expenses or other liabilities, whether in an action
          of contract, tort or otherwise, arising from, related to or in connection with Scroll or any of its products, services, or activities, or
          the Service or any Site, or the use or dealings in or with any of them or in reliance thereon.
        </li>
        <li>
          We are not, do not speak for, and cannot bind, the Scroll community. The Scroll community is a collection of independent contributors to
          Scroll. Scroll Foundation is a separate, independent entity. While we currently contribute to the Scroll ecosystem, we do not speak for the
          community, and cannot contractually bind it in any manner.
        </li>
        <li>
          We do not endorse third parties or third party information. Any time we link to, quote or otherwise reference a third party or reproduce or
          incorporate their information, content or material, it is solely for informational purposes. You should not assume that we have verified the
          accuracy of, or endorse in any way, such information, content or materials.
        </li>
        <li>
          When we talk about future ideas or prospects, we are expressing our vision and hopes, and there is no commitment or guarantee that it will
          come true, that we will implement any of it, or that it will work.
        </li>
      </ul>
      <TableofContents></TableofContents>
    </Container>
  )
}

export default Terms
