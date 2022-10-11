import React from "react";
import { navigation as nav } from "@/constants";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_TYPE_MAP = {
  subdomain: "subdomain",
  path: "path",
  custom: "custom",
};
export interface HeaderProps {
  activeTab?: string;
  backgroundColor?: string;
  type?: "subdomain" | "path" | "custom";
  customNav?: any[];
}

const Header = (props: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [navigation] = useState(
    props.type === NAV_TYPE_MAP.custom ? props.customNav : nav
  );

  const getHyperlink = (tab: any) => {
    const { type } = props;
    switch (type) {
      case NAV_TYPE_MAP.subdomain:
        const subdomain = tab.subdomainOrPath;
        return `https://${subdomain}.scroll.io/`;
      case NAV_TYPE_MAP.path:
        const path = tab.subdomainOrPath;
        return `/${path}`;
      case NAV_TYPE_MAP.custom:
        return tab.link;
      default:
        return;
    }
  };

  return (
    <div
      className="w-full scroll-component"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <nav className="container box-border relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
          <a
            href="/"
            className="flex items-center space-x-2 text-2xl font-medium text-gray-800"
          >
            <img
              src="https://scroll.io/img/logo_with_text.png"
              alt="logo"
              width={96}
              height={39}
              className="cursor-pointer"
            />
          </a>
          <svg
            className="w-6 h-6 fill-curren lg:hidden"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open && (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            )}
            {!open && (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
          {open ? (
            <div className="flex flex-wrap w-full my-5 lg:hidden ">
              {(navigation as any).map((item: any) => (
                <a
                  key={item.name}
                  href={getHyperlink(item)}
                  target={item.isExternal ? "_blank" : "_self"}
                  className={`${
                    props.activeTab === item.name &&
                    "text-indigo-500 bg-indigo-100"
                  } flex items-center w-full px-2 xl:px-4 py-2 -ml-4 text-gray-500 rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none `}
                >
                  {item.name}{" "}
                  {item.isExternal && (
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="OpenInNewIcon"
                      className="fill-current"
                      width={"1.2em"}
                      height={"1.2em"}
                    >
                      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {(navigation as any).map((tab: any) => (
              <li className=" nav__item xl:mr-3 " key={tab.name}>
                {tab.isExternal ? (
                  <a
                    target="_blank"
                    href={getHyperlink(tab)}
                    className={`${
                      props.activeTab === tab.name &&
                      "bg-indigo-100 text-indigo-500"
                    } flex inline-block px-2 xl:px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500  focus:outline-none `}
                  >
                    {tab.name}{" "}
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="OpenInNewIcon"
                      className="fill-current"
                      width={"1.5em"}
                      height={"1.5em"}
                    >
                      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
                    </svg>
                  </a>
                ) : (
                  <NavLink
                    to={getHyperlink(tab)}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-indigo-100 text-indigo-500" : undefined
                      }flex inline-block px-2 xl:px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500  focus:outline-none `
                    }
                  >
                    {tab.name}{" "}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden xl:mr-3 space-x-4 lg:flex nav__item"></div>
      </nav>
    </div>
  );
};

export default Header;
