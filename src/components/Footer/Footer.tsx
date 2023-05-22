import dayjs from "dayjs"
import { Link } from "react-router-dom"

import Logo from "@/components/Logo"
import { requireEnv } from "@/utils"

import Subscribe from "./Subscribe"

const Footer = () => {
  const links = [
    {
      category: "About Scroll",
      items: [
        {
          name: "Team",
          to: "/team",
        },
        {
          name: "Join Us",
          to: "/join-us",
        },
        {
          name: "Health Status",
          href: "https://status.scroll.io/",
        },
        {
          name: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          name: "Terms and Conditions",
          href: "/terms-and-conditions",
        },
      ],
    },
    {
      category: "Resources",
      items: [
        {
          name: "Blog",
          to: "/blog",
        },
        {
          name: "User Guide",
          href: "https://guide.scroll.io/",
        },
        {
          name: "Press Kit",
          href: "https://scrollzkp.notion.site/Scroll-Brand-Assets-PUBLIC-AREA-c4e2cca84be342aa8b00e8bda92ee4f7",
        },
      ],
    },
  ]

  const renderLinks = () => {
    return links.map((link: any) => (
      <ul key={link.category} className="mr-100px mt-20px flex-1 lg:(mt-0)">
        <li className="text-md mb-[8px] font-display font-medium">{link.category}</li>
        {link.items.map((item: any) => (
          <li key={item.name}>
            {item.to ? (
              <Link className="font-medium leading-[34px] text-body-title" to={item.to}>
                {" "}
                {item.name}
              </Link>
            ) : (
              <a
                href={item.href}
                // target="_blank"
                className="font-medium leading-[34px] text-body-title"
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    ))
  }

  return (
    <div className="footer w-full bg-[#EB71060D]">
      <footer className="text-md wrapper container box-border relative flex items-start justify-between !pt-[90px] !pb-[110px] mx-auto flex-col lg:flex-row">
        <div className="flex-1 w-full flex h-full items-center mb-[30px] lg:flex-col lg:items-start lg:justify-between">
          <a href="/" className="flex flex-1 lg:mb-[50px]">
            <Logo></Logo>
          </a>
          <div className="flex-1">
            <p className="font-display font-medium text-md text-gray-500">Version {requireEnv("REACT_APP_VERSION")}</p>
            <p className="font-display font-medium text-md text-gray-500">Scroll Ltd {dayjs().year()}</p>
          </div>
        </div>
        <div className="flex flex-[2] justify-between w-full mb-[30px]">{renderLinks()}</div>
        <div className="flex-1 w-full ">
          <Subscribe />
        </div>
      </footer>
    </div>
  )
}

export default Footer
