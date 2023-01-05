const scrollRequest = (url: string, options?: object) => {
  return fetch(url, options)
    .then(async res => {
      if (res.ok) {
        return res.json()
      }
      // server response but not 200
      const message = await res.text()
      return Promise.reject({ stauts: res.status, message })
    })
    .then(data => data)
    .catch(Promise.reject)
}

window.scrollRequest = scrollRequest
