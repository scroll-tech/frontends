import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";
import { shuffle } from "lodash";
import blogSource from "./data.json";
import Articles from "./articles";

const Link = styled(RouterLink)({
  display: "flex",
  alignItems: "center",
  marginBottom: "4rem",
  "& *": {
    fontWeight: 500,
    color: "#202020",
  },
});

const BlogContainer = styled(Box)(
  ({ theme }) => `
    max-width: 80rem;
    margin: 8rem auto;
  ${theme.breakpoints.down("md")} {
    margin: 4rem auto;
  };
  `
);
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

  return (
    <Box>
      <BlogContainer className="wrapper">
        <Link to="/blog">
          <ArrowBackIosIcon />
          <Typography>All Articles</Typography>
        </Link>
        <ReactMarkdown
          children={blog as string}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          className="markdown-body"
        />
      </BlogContainer>
      <Box sx={{ marginBottom: "8rem" }}>
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
    </Box>
  );
};

export default BlogDetail;
