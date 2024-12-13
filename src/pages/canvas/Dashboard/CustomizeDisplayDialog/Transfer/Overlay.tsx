import Item from "./Item"

const TransferItemDragOverlay = props => {
  const { name, image, id } = props
  return <Item id={id} name={name} image={image} dragging={true} dragOverlay></Item>
}

export default TransferItemDragOverlay
