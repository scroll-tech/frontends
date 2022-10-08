import "./Footer.less";
import Subscribe from "./Subscribe";

const Footer = () => {
  const links = [
    {
      category: "About Scroll",
      items: [
        {
          name: "Scroll.io",
          link: "",
        },
        {
          name: "Team",
          link: "",
        },
        {
          name: "Careers",
          link: "",
        },
      ],
    },
    {
      category: "Community/Help",
      items: [
        {
          name: "Blog",
          link: "",
        },
        {
          name: "User Guide",
          link: "",
        },
      ],
    },
  ];

  const renderLinks = () => {
    return links.map((link: any) => (
      <ul key={link.category} className="mr-100px mt-20px md:(mt-0)">
        <li className="text-md mb-[14px] font-display">{link.category}</li>
        {link.items.map((item: any) => (
          <li key={item.name}>
            <a
              href="https://scrollzkp.notion.site/Scroll-Brand-Assets-PUBLIC-8522d7dbe4c745579d3e3b14f3bbecc0"
              target="_blank"
              className="font-medium leading-[34px] text-body-title"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    ));
  };

  return (
    <div className="footer w-full mt-40 bg-[#EB71060D]">
      <footer className="container box-border relative flex flex-wrap items-start justify-between pt-[90px] pb-[110px] mx-auto lg:justify-between xl:px-0">
        <div>
          <a href="/" className="flex mb-[78px]">
            <img
              src="https://scroll.io/img/logo_with_text.png"
              alt="logo"
              className="cursor-pointer w-[96px]"
            />
          </a>
          <p className="font-display text-md">© Scroll Ltd 2022</p>
        </div>
        {/* <div className="flex mb-[30px] flex-wrap-reverse md:(mb-0)"> */}
        {renderLinks()}
        {/* </div> */}
        <div>
          <Subscribe />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
