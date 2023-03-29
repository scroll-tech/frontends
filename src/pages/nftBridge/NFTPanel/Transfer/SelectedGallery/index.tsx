import { styled } from "@mui/material/styles"

import useNFTBridgeStore from "@/stores/nftBridgeStore"

import GalleryItem from "./GalleryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`,
)

const Gallery = props => {
  const selectedList = useNFTBridgeStore(state => state.selectedList())

  return (
    <Container {...props}>
      {selectedList.map(item => (
        <GalleryItem key={item.id} {...item}></GalleryItem>
      ))}
    </Container>
  )
}

export default Gallery
