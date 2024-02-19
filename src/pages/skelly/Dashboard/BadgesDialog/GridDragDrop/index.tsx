import { rectSortingStrategy } from "@dnd-kit/sortable"

import { useSkellyContext } from "@/contexts/SkellyContextProvider"

import { MultipleContainers } from "./MultipleContainers"

const Grid = () => {
  const { badgesInstance } = useSkellyContext()

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
