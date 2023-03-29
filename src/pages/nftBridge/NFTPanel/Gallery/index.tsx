import { styled } from "@mui/material/styles"

import useNFTBridgeStore from "@/stores/nftBridgeStore"

import GalleryItem from "./GalleryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-column-gap: 1.6rem;
  grid-row-gap: 1.6rem;
`,
)

const Gallery = props => {
  const { viewingList } = useNFTBridgeStore()

  return (
    <Container {...props}>
      {viewingList.map(item => (
        <GalleryItem key={item.id} {...item}></GalleryItem>
      ))}
    </Container>
  )
}

export default Gallery
