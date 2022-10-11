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
      <ul key={link.category} className="mr-100px mt-20px flex-1 md:(mt-0)">
        <li className="text-md mb-[8px] font-display">{link.category}</li>
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
    <div className="footer w-full bg-[#EB71060D]">
      <footer className="wrapper container box-border relative flex items-start justify-between !pt-[90px] !pb-[110px] mx-auto flex-col md:flex-row">
        <div className="flex-1 w-full flex h-full items-center mb-[30px] md:flex-col md:items-start md:justify-between">
          <a href="/" className="flex flex-1 md:mb-[78px]">
            <img
              src="https://scroll.io/img/logo_with_text.png"
              alt="logo"
              className="cursor-pointer w-[96px]"
            />
          </a>
          <p className="font-display text-md flex-1">© Scroll Ltd 2022</p>
        </div>
        <div className="flex flex-[2] justify-between w-full mb-[30px]">
          {renderLinks()}
        </div>
        <div className="flex-1">
          <Subscribe />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
