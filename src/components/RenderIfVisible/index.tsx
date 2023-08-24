import React, { useEffect, useMemo, useRef, useState } from "react"

type Props = {
  initialVisible?: boolean
  defaultHeight?: number
  // How far outside the viewport in pixels should elements be considered visible?
  visibleOffset?: number

  root?: HTMLElement | null
  rootElement?: string
  rootElementClass?: string
  children: React.ReactNode
}

const RenderIfVisible = ({
  initialVisible = false,
  defaultHeight = 300,
  visibleOffset = 1000,
  root = null,
  rootElement = "div",
  rootElementClass = "",
  children,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisible)
  const intersectionRef = useRef<HTMLDivElement>(null)

  // if height of the items are not equal
  // const innerRef = useRef<HTMLDivElement>(null)
  const [rootHeight, setRootHeight] = useState<number>(defaultHeight)
  useEffect(() => {
    if (!defaultHeight) {
      setRootHeight(0)
    } else {
      if (intersectionRef.current) {
        const localRef = intersectionRef.current
        const resizeObserver = new ResizeObserver(entries => {
          const resizeEntry = entries[0]

          /* Sets the height of the container if the previous value is the default one or if the current value is greater than its previous value */
          setRootHeight(prev => {
            if ((prev === defaultHeight && resizeEntry?.contentRect.height !== 0) || resizeEntry?.contentRect.height > prev) {
              return resizeEntry?.contentRect.height
            }
            return prev
          })
        })

        resizeObserver.observe(localRef)
        return () => {
          if (localRef) {
            resizeObserver.unobserve(localRef)
          }
        }
      }
    }
  }, [setRootHeight, defaultHeight])

  const rootStyle = useMemo(() => ({ height: rootHeight ? `${rootHeight}px` : "auto" }), [rootHeight])

  // Set visibility with intersection observer
  useEffect(() => {
    if (intersectionRef.current) {
      const localRef = intersectionRef.current
      const observer = new IntersectionObserver(
        entries => {
          if (window.requestIdleCallback) {
            window.requestIdleCallback(() => setIsVisible(entries[0].isIntersecting), {
              timeout: 600,
            })
          } else {
            setIsVisible(entries[0].isIntersecting)
          }
        },
        { root, rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px` },
      )

      observer.observe(localRef)
      return () => {
        if (localRef) {
          observer.unobserve(localRef)
        }
      }
    }
    return () => {}
  }, [])

  const rootClasses = useMemo(() => `renderIfVisible ${rootElementClass}`, [rootElementClass])

  return React.createElement(rootElement, {
    children: isVisible ? <>{children}</> : null,
    ref: intersectionRef,
    className: rootClasses,
    style: rootStyle,
  })
}

export default RenderIfVisible
