import { styled } from "@mui/material/styles"

import data from "../projects.json"
import GallaryItem from "./GallaryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: max-content;
  margin: 8rem auto;
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
