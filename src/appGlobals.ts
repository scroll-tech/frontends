const scrollRequest = (url: string, options?: object) => {
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
