import { rectSortingStrategy } from "@dnd-kit/sortable"

import { BADGES_VISIBLE_TYPE } from "@/constants"

import { MultipleContainers } from "./MultipleContainers"

const Grid = () => {
  const badgesInstance = {
    [BADGES_VISIBLE_TYPE.VISIBLE]: [],
    [BADGES_VISIBLE_TYPE.INVISIBLE]: [],
  }

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
