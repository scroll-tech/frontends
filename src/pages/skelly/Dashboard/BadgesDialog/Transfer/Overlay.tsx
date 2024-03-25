import Item from "./Item"

const TransferItemDragOverlay = props => {
  const { name, image } = props
  return <Item name={name} image={image} dragOverlay></Item>
}

export default TransferItemDragOverlay
