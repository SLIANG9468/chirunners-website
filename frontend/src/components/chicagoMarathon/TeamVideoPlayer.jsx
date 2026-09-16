import { useEffect, useRef } from 'react'

/** Plays a team's video: smugmug HLS stream, a YouTube embed, or a plain mp4 file. */
export default function TeamVideoPlayer({ video, title }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (video.type !== 'hls') return undefined
    const el = videoRef.current
    if (!el) return undefined

    let hls
    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = video.src
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          hls = new Hls()
          hls.loadSource(video.src)
          hls.attachMedia(el)
        }
      })
    }

    return () => {
      if (hls) hls.destroy()
    }
  }, [video])

  if (video.type === 'youtube') {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (video.type === 'mp4') {
    return (
      <video className="w-full rounded-xl bg-black" controls>
        <source src={video.src} type="video/mp4" />
      </video>
    )
  }

  return <video ref={videoRef} className="w-full rounded-xl bg-black" controls />
}
