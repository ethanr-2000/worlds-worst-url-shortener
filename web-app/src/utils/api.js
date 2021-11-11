const axios = require('axios')

const baseUrl = "https://api.url.ethanr.co.uk/"

export const registerUrl = async (shortUrl, destinationUrl) => {
  const body = JSON.stringify({
    destinationUrl,
    shortUrl
  })

  await axios.post(baseUrl + "registerUrl", body).catch(err => err)
}

export const deleteUrl = async (shortUrl) => {
  const body = JSON.stringify({
    shortUrl
  })

  await axios.post(baseUrl + "deleteUrl", body).catch(err => err)
}

export const getUrl = async (shortUrl) => {
  const body = JSON.stringify({
    shortUrl
  })

  const result = await axios.post(baseUrl + "getUrl", body).catch(err => err)
  return result.data
}

export const getAll = async () => {
  const result = await axios.get(baseUrl + "getAll").catch(err => err)
  return result.data
}
