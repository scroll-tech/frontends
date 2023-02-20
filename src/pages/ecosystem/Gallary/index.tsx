import { styled } from "@mui/material/styles"

import data from "../projects.json"
import GallaryItem from "./GallaryItem"

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
    // padding: 1rem 0;
    width: 100%;
  };
`,
)

const Gallary = () => {
  return (
    <Container>
      {data
        .filter(item => item.Status === "Done")
        .map(item => (
          <GallaryItem item={item}></GallaryItem>
        ))}
    </Container>
  )
}

export default Gallary
