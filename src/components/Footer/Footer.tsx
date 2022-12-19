import { Link, Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import dayjs from "dayjs"
import "./Footer.less"
import Subscribe from "./Subscribe"

const Footer = () => {
  const links = [
    {
      category: "About Scroll",
      items: [
        {
          name: "Scroll.io",
          to: "/",
        },
        {
          name: "Team",
          to: "/team",
        },
        {
          name: "Join Us",
          to: "/join-us",
        },
      ],
    },
    {
      category: "Community/Help",
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
          href: "https://scrollzkp.notion.site/Scroll-Brand-Assets-PUBLIC-8522d7dbe4c745579d3e3b14f3bbecc0",
        },
      ],
    },
  ]

  const renderLinks = () => {
    return links.map((link: any) => (
      <ul key={link.category} className="mr-100px mt-20px flex-1 lg:(mt-0)">
        <li className="text-md mb-[8px] font-display">{link.category}</li>
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
          <a href="/" className="flex flex-1 lg:mb-[80px]">
            <Logo></Logo>
          </a>
          <p className="font-display text-md flex-1">© Scroll Ltd {dayjs().year()}</p>
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
