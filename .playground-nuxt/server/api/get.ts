import { getVideoThumbnail } from '../../../dist/index.js'

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)

  try {
    const response = await getVideoThumbnail(String(url))

    if (response.buffer) {
      setResponseHeader(event, 'content-type', 'image/png')
      setResponseHeader(event, 'content-length', response.buffer.length)
      return response.buffer
    }
  } catch (error) {
    console.log('Error getting thumbnail:', error)
  }

  // return an error
  throw createError({
    statusCode: 400,
    statusMessage: 'Error getting thumbnail.',
  })
})
