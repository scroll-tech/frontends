import { rectSortingStrategy } from "@dnd-kit/sortable"

import { MultipleContainers } from "./MultipleContainers"

const Grid = ({ badgesInstance }) => {
  return (
    <MultipleContainers
      columns={4}
      strategy={rectSortingStrategy}
      wrapperStyle={() => ({
        width: 100,
        height: 100,
      })}
      items={badgesInstance}
    />
  )
}

export default Grid
