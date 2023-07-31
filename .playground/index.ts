import getVideoThumbnail from '../src/index'

async function start() {
  try {
    const videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    const thumbnail = await getVideoThumbnail(videoURL)

    console.log('thumbnail:', thumbnail)
  } catch (error) {
    console.log('Error getting video thumbnail:', error)
  }
}

start()
