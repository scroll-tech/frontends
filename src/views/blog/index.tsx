import { Box, Typography, Button, Modal, Divider } from "@mui/material";
import { styled } from "@mui/system";
import ArticleCard from "@/components/ArticleCard";
import blogSource from "./data.json";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import WrapperBox from "@/components/WrapperBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Close as CloseIcon,
  Check as CheckIcon,
  Tune as TuneIcon,
} from "@mui/icons-material";

const TitleTypography = styled(Typography)(
  ({ theme }) => `
      text-align: center;
      margin-bottom: 1.4rem; 
      `
);

const BlogContainer = styled(Box)(
  ({ theme }) => `
        margin: 14rem auto;
        ${theme.breakpoints.down("md")} {
          margin: 8rem 0; 
        };
      `
);

const FilterModal = styled(Box)(
  ({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
      `
);

const FilterModalContent = styled(Box)(
  ({ theme }) => `
  background: #fff;
  border-radius: 0.6rem;
  width: 35.8rem;
  height: 64rem;
  background: #fff;
  padding-top: 3rem;
      `
);

const BlogBody = styled(Box)(
  ({ theme }) => `
  display: flex;
  ${theme.breakpoints.down("md")} {
    flex-direction: column-reverse;
  };
      `
);

const SubTitleTypography = styled(Typography)(
  ({ theme }) => `
        text-align: center;
        margin: 0 auto 3.6rem; 
        max-width: 65.6rem;
        `
);

const FilterTypeName = styled(Typography)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
    &:nth-of-type(2) {
      margin-top: 6.8rem;
    }
    ${theme.breakpoints.down("md")} {
      height: 60px;
      line-height: 60px;
      margin-bottom: 0;
      font-size: 1.4rem;
      padding-left: 3.3rem;
    };
    `
);

const FilterItem = styled(Typography)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    cursor: pointer;
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    &.active {
      font-weight: 700;
    }
    &:hover {
      font-weight: 700;
    }
    ${theme.breakpoints.down("md")} {
      height: 60px;
      line-height: 60px;
      margin-bottom: 0;
      font-size: 1.4rem;
      padding-left: 3.3rem;
      &.active {
        color: #EB7106;
        background: rgba(51, 51, 51, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;  
        padding-right: 1.6rem;      
      }
    };
    `
);

const BlogList = styled("ul")(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14rem;
  border-right: 1px solid #C9CBCE;
  width: 100%;
  ${theme.breakpoints.down("md")} {
    border-right: none;
    margin-bottom: 0;
    justify-content: center;
  };
  `
);

const Blog = () => {
  const listType = ["Newest", "Oldest"];
  const categories = ["All", "Announcement", "General", "Technical"];
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isUnderLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const [blogs, setBlogs] = useState(blogSource);
  const [queryForm, setQueryForm] = useState({
    sort: "Newest",
    category: "All",
  });

  useEffect(() => {
    const blogs = orderBy(
      blogSource.filter(
        (blog) =>
          blog.type === queryForm.category || queryForm.category === "All"
      ),
      "date",
      queryForm.sort === "Newest" ? "desc" : "asc"
    );
    setBlogs(blogs);
  }, [queryForm]);

  const hanleFilter = (attr: string, value: string) => {
    handleFilterClose();
    setQueryForm({
      ...queryForm,
      [attr]: value,
    });
  };

  const renderBlogs = () => {
    return (
      <BlogList>
        {blogs.map((blog) => (
          <Box sx={{ marginBottom: "9rem" }} key={blog.title}>
            <ArticleCard small={!isUnderLarge} blog={blog} />
          </Box>
        ))}
      </BlogList>
    );
  };

  const renderFilter = () => {
    if (isDesktop) {
      return (
        <Box sx={{ marginLeft: "4rem", width: "26rem" }}>
          <FilterTypeName>Category</FilterTypeName>
          {categories.map((category) => (
            <FilterItem
              onClick={() => hanleFilter("category", category)}
              key={category}
              className={category === queryForm.category ? "active" : ""}
            >
              {category}
            </FilterItem>
          ))}

          <FilterTypeName sx={{ marginTop: "6.8rem" }}>Order by</FilterTypeName>
          {listType.map((type) => (
            <FilterItem
              onClick={() => hanleFilter("sort", type)}
              key={type}
              className={type === queryForm.sort ? "active" : ""}
            >
              {type}
            </FilterItem>
          ))}
        </Box>
      );
    }
    return (
      <Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          onClick={handleFilterOpen}
          sx={{ marginBottom: "1.7rem", color: "#00A6F2" }}
        >
          <Typography sx={{ marginRight: "0.8rem", color: "#00A6F2" }}>
            Filters
          </Typography>
          <TuneIcon />
        </Box>
        <Modal
          open={filterOpen}
          onClose={handleFilterClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FilterModal>
            <FilterModalContent>
              <Box sx={{ textAlign: "right" }}>
                <CloseIcon
                  onClick={handleFilterClose}
                  sx={{ fontSize: "2.8rem", marginRight: "1rem" }}
                />
              </Box>
              <Typography variant="h3" sx={{ paddingLeft: "3.3rem" }}>
                Filters
              </Typography>
              <FilterTypeName>Category</FilterTypeName>
              {categories.map((category) => (
                <FilterItem
                  onClick={() => hanleFilter("category", category)}
                  key={category}
                  className={category === queryForm.category ? "active" : ""}
                >
                  {category}{" "}
                  {category === queryForm.category ? (
                    <CheckIcon sx={{ fontSize: "3rem" }} />
                  ) : (
                    ""
                  )}
                </FilterItem>
              ))}
              <Divider sx={{ margin: "1rem 1.6rem 1rem 3.3rem" }} />
              <FilterTypeName>Order by</FilterTypeName>
              {listType.map((type) => (
                <FilterItem
                  onClick={() => hanleFilter("sort", type)}
                  key={type}
                  className={type === queryForm.sort ? "active" : ""}
                >
                  {type}{" "}
                  {type === queryForm.sort ? (
                    <CheckIcon sx={{ fontSize: "3rem" }} />
                  ) : (
                    ""
                  )}
                </FilterItem>
              ))}
            </FilterModalContent>
          </FilterModal>
        </Modal>
      </Box>
    );
  };

  return (
    <BlogContainer>
      <WrapperBox>
        <TitleTypography variant="h2">Scroll Blog</TitleTypography>
        <SubTitleTypography variant="subtitle1">
          Learn about Scroll’s technology, research, and latest developments.
        </SubTitleTypography>
      </WrapperBox>

      <BlogBody className="wrapper">
        {renderBlogs()}
        {renderFilter()}
      </BlogBody>
    </BlogContainer>
  );
};

export default Blog;
