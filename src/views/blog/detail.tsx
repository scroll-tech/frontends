import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MarkdownNavbar from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";
import { shuffle } from "lodash";
import blogSource from "./data.json";
import Articles from "./articles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Link = styled(RouterLink)({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
  "& *": {
    fontWeight: 500,
    color: "#202020",
  },
});

const BlogContainer = styled(Box)(
  ({ theme }) => `
    max-width: 100rem;
    padding: 8rem 0;
    overflow: hidden;
    display: flex;
  ${theme.breakpoints.down("md")} {
    padding: 4rem 1.6rem;
    display: block;
  };
  `
);

const BlogNavbar = styled(Box)(({ theme }) => ({
  position: "fixed",
  width: "30rem",
  marginLeft: "6rem",
  paddingLeft: "2rem",
  borderLeft: "1px solid #C9CBCE",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const BlogDetail = () => {
  const [blog, setBlog] = useState<null | string>(null);
  const [moreBlog, setMoreBlog] = useState<any>([]);
  const params = useParams();

  useEffect(() => {
    // @ts-ignore
    let anchors = [...document.querySelectorAll("a")];
    anchors.map((anchor) => {
      if (anchor.href.includes("/blog/")) {
        anchor.setAttribute("target", "");
      }
    });
    try {
      const blogPath = require(`../../assets/blog/${params.blogId}.md`);
      fetch(blogPath)
        .then((response) => response.text())
        .then((text) => {
          setBlog(text);
        });
    } catch (error) {
      console.log(error);
    }
    getMoreBlog();
  }, []);

  const getMoreBlog = () => {
    const blogs = shuffle(
      blogSource.filter((blog) => blog.id !== params.blogId)
    ).slice(0, 3);
    setMoreBlog(blogs);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <BlogContainer className="wrapper">
        <ReactMarkdown
          children={blog as string}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          className="markdown-body"
        />
        <Box sx={{ width: "32rem", flexShrink: 0, position: "relative" }}>
          <BlogNavbar>
            <Link to="/blog">
              <ArrowBackIosIcon />
              <Typography>All Articles</Typography>
            </Link>
            <MarkdownNavbar
              className="markdown-navbar"
              source={blog || ""}
              headingTopOffset={100}
            />
          </BlogNavbar>
        </Box>
      </BlogContainer>
      {isMobile ? (
        <Box sx={{ paddingBottom: "6rem" }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              marginBottom: {
                md: "4rem",
              },
            }}
          >
            More articles from Scroll
          </Typography>
          <Articles blogs={moreBlog} />
        </Box>
      ) : null}
    </Box>
  );
};

export default BlogDetail;
