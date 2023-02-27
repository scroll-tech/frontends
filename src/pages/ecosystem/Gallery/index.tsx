import { styled } from "@mui/material/styles"

import data from "../projects.json"
import GalleryItem from "./GalleryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: max-content;
  margin: 8rem auto;
  grid-auto-columns: 1fr;
  ${theme.breakpoints.down("lg")} {
    grid-template-columns: repeat(2, 1fr);
    width: max-content;
    margin: 4rem auto;
  };
  ${theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 2.4rem auto;
  };
`,
)

const Gallery = () => {
  return (
    <Container>
      {data
        // .filter(item => item.Status === "Done")
        .sort((a, b) => b.TwitterFans - a.TwitterFans)
        .map(item => (
          <GalleryItem key={item.Name} item={item}></GalleryItem>
        ))}
    </Container>
  )
}

export default Gallery
