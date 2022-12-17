import { Button, Box, Typography } from "@mui/material";
import LogoIcon from "@/assets/images/logo_with_text.png";
import { styled } from "@mui/system";
import { useNavigate, useSearchParams } from "react-router-dom";
import WebpImage from "@/components/WebpImage";

const ArticleInfo = styled(Box)(
  ({ theme }) => `
  max-width: 40rem;
  &.small {
    padding: 0 2rem 4rem;
    ${theme.breakpoints.down("md")} {
      height: 34rem;
    };
  }
  `
);

const ArticleTitle = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        font-weight: 600;
        cursor: pointer;
        line-height: 2.8rem;
        display: table-cell;
        vertical-align: bottom;
        &.small {
          height: 10rem;
        }
        `
);

const Card = styled(Box)(
  ({ theme }) => `
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 84rem;
        text-align: left;
        margin: 0 auto;
        overflow: hidden;
        &.small {
          max-width: 38rem;
          flex-direction: column;
          box-shadow: rgb(0 0 0 / 15%) 5px 5px 3px;
          border-radius: 5px;
          &:hover {
            box-shadow: 8px 16px 8px rgb(0 0 0 / 15%);
          }
        }
    `
);

const Logo = styled("img")(
  ({ theme }) => `
        width: 7.3rem;
      `
);

const PosterTitle = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        font-weight: 700;
        font-size: 4.1rem;
        line-height: 4.6rem;
        height: 16rem;
        display: flex;
        align-items: center;
        &.small {
          font-size: 3.6rem;
          line-height: 4.2rem;
        }
        `
);

const ArticleDate = styled(Typography)(
  ({ theme }) => `
  margin-bottom: 0.5rem;
          `
);

const ArticleSummary = styled(Typography)(
  ({ theme }) => `
    margin-bottom: 2.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
            `
);

const ArticlePoster = styled(WebpImage)(
  ({ theme }) => `
      width: 38rem;
      height: 23.3rem;
      cursor: pointer;
      ${theme.breakpoints.up("lg")} {
        border-radius: .5rem;
      };
    `
);

const ArticleCard = ({ blog, small = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (blog.externalLink) {
      window.location.href = blog.externalLink;
    } else {
      navigate("/blog/" + blog.id);
    }
  };

  return (
    <Card className={small ? "small" : ""}>
      <ArticlePoster
        src={blog.posterImg}
        webpsrc={blog.posterImg.replace(".jpg", ".webp")}
        onClick={handleClick}
      ></ArticlePoster>
      <ArticleInfo className={small ? "small" : ""}>
        <ArticleTitle
          className={small ? "small" : ""}
          onClick={handleClick}
          variant="subtitle1"
        >
          {blog.title}
        </ArticleTitle>
        <ArticleDate className={small ? "small" : ""} variant="body2">
          {blog.date} ・ {blog.type}
        </ArticleDate>
        <ArticleSummary className={small ? "small" : ""} variant="body1">
          {blog.summary}
        </ArticleSummary>
        <Button
          className={small ? "small" : ""}
          onClick={handleClick}
          color="secondary"
        >
          Read More
        </Button>
      </ArticleInfo>
    </Card>
  );
};

export default ArticleCard;
