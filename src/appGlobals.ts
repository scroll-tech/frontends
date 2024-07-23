const scrollRequest = (url: string, options?: RequestInit & { timeout?: number }) => {
  if (options?.timeout) {
    const controller = new AbortController()
    const { signal } = controller
    const optionsWithSignal = { ...options, signal }

    const timeoutId = setTimeout(() => {
      controller.abort()
    }, options.timeout)

    return fetch(url, optionsWithSignal)
      .then(async res => {
        if (res.ok) {
          clearTimeout(timeoutId)
          return res.json()
        }
        // server response but not 200
        const message = await res.text()
        const error = new Error(message)
        error.status = res.status
        clearTimeout(timeoutId)
        throw error
      })
      .then(data => data)
  }

  return fetch(url, options)
    .then(async res => {
      if (res.ok) {
        return res.json()
      }
      // server response but not 200
      const message = await res.text()
      const error = new Error(message)
      error.status = res.status
      throw error
    })
    .then(data => data)
}

window.scrollRequest = scrollRequest
