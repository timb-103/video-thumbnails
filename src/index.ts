import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)
ffmpeg.setFfprobePath(ffprobeInstaller.path)

export interface ThumbnailResponse {
  ok: boolean
  error?: string
  buffer?: Buffer
}

/**
 * Get a video thumbnail image via a public video URL.
 *
 * @param url - a public video URL
 * @param coverTime - the seconds mark to take the screenshot (higher = slower)
 */
export default async function getVideoThumbnail(url: string, coverTime: number = 0): Promise<ThumbnailResponse> {
  return new Promise(async (resolve) => {
    // format the cover time
    let coverTimeNew = '00:00:01'
    if (coverTime) {
      coverTimeNew = new Date(coverTime * 1000).toISOString().substring(11, 22)
    }

    try {
      const command = ffmpeg(url)
        .seekInput(coverTimeNew)
        .outputOptions(['-f image2', '-vcodec png', '-f rawvideo'])
        .noAudio()
        .frames(1)
        .size('500x?')
        .on('error', () => {
          resolve({ ok: false, error: 'Error getting video thumbnail.' })
        })

      const ffstream = command.pipe()
      const buffers = []

      ffstream.on('data', (chunk) => {
        buffers.push(chunk)
      })

      ffstream.on('end', async () => {
        const outputBuffer = Buffer.concat(buffers)
        if (buffers.length) {
          resolve({ ok: true, buffer: outputBuffer })
        } else {
          resolve({ ok: false, error: 'No buffers found while getting video thumbnail.' })
        }
      })
    } catch (error) {
      console.log('Error:', error)
      resolve({ ok: false, error: 'Error getting video thumbnail (2).' })
    }
  })
}
