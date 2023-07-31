# Video Thumbnails

[![npm version][npm-version-src]][npm-version-href]

> Get thumbnail images from any public video URL. 

## Features

- 🕑 Take thumbnails from any second of the video (default @ 1s)
- ⚡ Fast & easy to use

## Install

```sh
npm i video-thumbnails --save
```

## Usage

```js
const videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const thumbnail = await getVideoThumbnail(videoURL)
```


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/video-thumbnails/latest.svg
[npm-version-href]: https://npmjs.com/package/video-thumbnails
[npm-downloads-src]: https://img.shields.io/npm/dt/video-thumbnails.svg
[npm-downloads-href]: https://npmjs.com/package/video-thumbnails
