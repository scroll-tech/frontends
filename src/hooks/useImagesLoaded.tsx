import { useEffect, useState } from "react"

function useImagesLoaded(imageUrls) {
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    let images: HTMLImageElement[] = []
    let loadedCount = 0

    const imageLoaded = () => {
      loadedCount++
      if (loadedCount === imageUrls.length) {
        setAllLoaded(true)
      }
    }

    imageUrls.forEach(url => {
      const img = new Image()
      img.src = url
      img.onload = imageLoaded
      images.push(img)
    })

    return () => {
      images.forEach(img => {
        img.onload = null
      })
    }
  }, [imageUrls])

  return { allLoaded }
}

export default useImagesLoaded
