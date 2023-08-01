<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Video Thumbnails API</h1>
      <p>Get thumbnail images from any public video URL.</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="submit()">
      <div>
        <label>
          <span>Public video URL</span>
          <a href="" @click.prevent="tryDemo()">Try example url</a>
        </label>
        <input type="text" v-model="url" placeholder="Eg. https://amazon.com/video.mp4" />
        <div style="text-align: right"></div>
      </div>
      <button type="submit" :disabled="loading">Get Thumbnail</button>
      <img v-if="imgSrc" :src="imgSrc" />
    </form>

    <!-- API Info -->
    <div class="info">
      <div>
        <p><strong>Use via API</strong></p>
        <p>
          Send a <code>GET</code> request to
          <code>https://thumbnail.video/api/get?url={video_url}</code>.
        </p>
        <p>We will send back a buffer for you to download or process the image.</p>
      </div>

      <div>
        <p><strong>Use via browser</strong></p>
        <p>
          In your browser enter
          <code>https://thumbnail.video/api/get?url={video_url}</code>.
        </p>
      </div>

      <div>
        <p><strong>Test video URLs</strong></p>
        <p>
          Here's a list of public video URL's that you can test with:
          <a href="https://gist.github.com/jsturgis/3b19447b304616f18657" target="_blank">
            public video URL's
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const url = ref('')
const loading = ref(false)
const imgSrc = ref('')
const demoURL = ref(
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
)

function tryDemo() {
  url.value = demoURL.value
  submit()
}

async function submit() {
  loading.value = true
  imgSrc.value = ''

  try {
    const response = await $fetch<Buffer>(`/api/get?url=${encodeURIComponent(url.value)}`)
    processImageBuffer(response)
  } catch (error) {
    console.log('Error getting thumbnail:', error)
  }

  loading.value = false
}

function processImageBuffer(imageBuffer: Buffer) {
  const imageBlob = new Blob([imageBuffer], { type: 'image/png' })
  const objectURL = URL.createObjectURL(imageBlob)
  imgSrc.value = objectURL
}
</script>

<style>
body {
  font-size: 16px;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji;
  line-height: 1.7em;
}

p {
  margin: 0;
}

.container {
  margin: 60px auto;
  max-width: 600px;
}

.header {
  text-align: center;
}

form {
  border-radius: 8px;
  box-shadow: 0 4px 8px -2px #091e4240, 0 0 0 1px #091e4214;
  margin-top: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 1.1em;
  width: 100%;
}

button {
  background: #000;
  border: 1px solid #000;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 15px;
}
button:hover:not(:disabled) {
  background: #fff;
  color: #000;
}
button:disabled {
  opacity: 0.4;
}

code {
  background: #ededed;
  border: 1px solid #ededed;
  border-radius: 3px;
  font-size: 14.5px;
  padding: 0.2rem 0.375rem;
  white-space: pre-line;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}
</style>
