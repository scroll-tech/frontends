import { styled } from "@mui/material/styles"

import useNFTBridgeStore from "@/stores/nftBridgeStore"

import GalleryItem from "./GalleryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: max-content;
  margin: 8rem auto;
  grid-auto-columns: 1fr;
  ${theme.breakpoints.down("lg")} {
    grid-template-columns: repeat(5, 1fr);
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

const Gallery = props => {
  const { viewingList } = useNFTBridgeStore()

  return (
    <Container>
      {viewingList.map(item => (
        <GalleryItem key={item.id} id={item.id} name={item.name} image={item.image}></GalleryItem>
      ))}
    </Container>
  )
}

export default Gallery
