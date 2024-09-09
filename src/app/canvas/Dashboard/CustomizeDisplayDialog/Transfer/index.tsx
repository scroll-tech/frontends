import {
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  MeasuringStrategy,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { Box } from "@mui/material"

import useSnackbar from "@/hooks/useSnackbar"

import TransferItemDragOverlay from "./Overlay"
import TransferItem from "./TransferItem"
import TransferList from "./TransferList"

const BADGE_MAX_NUMBER = 48

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
}

const BadgeTransfer = props => {
  const { titles, value, data, sx, onChange } = props

  const initialIds = {
    left: data.filter(({ id }) => !value.includes(id)).map(item => item.id),
    right: value,
  }

  const alertWarning = useSnackbar()

  const dataMap = new Proxy(data, {
    get(target, prop) {
      return target.find(item => item.id === prop)
    },
  })

  const [items, setItems] = useState(initialIds)

  const [clonedItems, setClonedItems] = useState<any>(null)
  const [containers, setContainers] = useState(Object.keys(items) as UniqueIdentifier[])

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)

  const [disabledDisplayed, setDisabledDisplayed] = useState(false)

  useEffect(() => {
    if (items.right.length < BADGE_MAX_NUMBER) {
      setDisabledDisplayed(false)
    } else {
      setDisabledDisplayed(true)
    }
    onChange(items.right)
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false
    })
  }, [items])

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find(key => items[key].includes(id))
  }

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id)

    if (!container) {
      return -1
    }

    const index = items[container].findIndex(item => item.id === id)

    return index
  }

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems)
    }

    setActiveId(null)
    setClonedItems(null)
  }

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    args => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => container.id in items),
        })
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args)
      let overId = getFirstCollision(intersections, "id")

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId]

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(container => container.id !== overId && containerItems.includes(container.id)),
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeId, items],
  )

  return (
    <DndContext
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        if (!active) {
          return
        }

        setActiveId(active.id)
        setClonedItems(items)
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id

        if (overId == null || active.id in items) {
          return
        }

        const overContainer = findContainer(overId)
        const activeContainer = findContainer(active.id)

        if (!overContainer || !activeContainer) {
          return
        }

        if (activeContainer !== overContainer) {
          setItems(items => {
            const activeItems = items[activeContainer]
            const overItems = items[overContainer]
            const overIndex = overItems.indexOf(overId)
            const activeIndex = activeItems.indexOf(active.id)

            let newIndex: number

            if (overId in items) {
              newIndex = overItems.length + 1
            } else {
              const isBelowOverItem = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

              const modifier = isBelowOverItem ? 1 : 0

              newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }

            recentlyMovedToNewContainer.current = true

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(item => item !== active.id),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(newIndex, items[overContainer].length),
              ],
            }
          })
        }
      }}
      onDragEnd={({ active, over }) => {
        // over -> new
        // active -> old
        if (active.id in items && over?.id) {
          setContainers(containers => {
            const activeIndex = containers.indexOf(active.id)
            const overIndex = containers.indexOf(over.id)

            return arrayMove(containers, activeIndex, overIndex)
          })
        }

        const activeContainer = findContainer(active.id)

        if (!activeContainer) {
          setActiveId(null)
          return
        }

        const overId = over?.id

        if (overId == null) {
          setActiveId(null)
          return
        }

        const overContainer = findContainer(overId)

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id)
          const overIndex = items[overContainer].indexOf(overId)

          if (activeIndex !== overIndex) {
            const overContainerIds = arrayMove(items[overContainer], activeIndex, overIndex)

            setItems(items => ({
              ...items,
              [overContainer]: overContainerIds,
            }))
            if (overContainer === "right" && overContainerIds.length >= BADGE_MAX_NUMBER) {
              alertWarning("The maximum number of badges that Canvas can display has been reached.", "success")
            }
          }
        }

        setActiveId(null)
      }}
      onDragCancel={onDragCancel}
    >
      <Box
        sx={[
          {
            display: "grid",
            gridTemplateColumns: ["1fr", "repeat(2, 1fr)"],
            gridTemplateRows: ["repeat(2, 50%)", "1fr"],
            gridGap: ["1.6rem", "3rem"],
            width: "100%",
            ...sx,
          },
          theme => ({
            [theme.breakpoints.down("sm")]: {
              height: "calc(100% - 6.4rem)",
            },
          }),
        ]}
      >
        {containers.map((containerId, index) => (
          <TransferList key={containerId} id={containerId} label={titles[index]} items={items[containerId]}>
            {items[containerId].map(item => (
              <TransferItem
                key={item}
                id={item}
                disabled={containerId === "left" && disabledDisplayed}
                containerId={containerId}
                name={dataMap[item]?.name}
                image={dataMap[item]?.image}
                getIndex={getIndex}
              ></TransferItem>
            ))}
          </TransferList>
        ))}
      </Box>
      {createPortal(
        <DragOverlay zIndex={1500} dropAnimation={dropAnimation}>
          {activeId ? (
            containers.includes(activeId) ? null : (
              <TransferItemDragOverlay name={dataMap[activeId].name} image={dataMap[activeId].image}></TransferItemDragOverlay>
            )
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}

export default BadgeTransfer
