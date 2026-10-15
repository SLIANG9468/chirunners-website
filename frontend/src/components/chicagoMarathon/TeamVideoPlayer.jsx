import { useEffect, useRef } from 'react'

/**
 * Plays a team's video: smugmug HLS stream, a YouTube embed, or a plain mp4 file.
 * `autoPlayMuted` starts an HLS video muted (browsers only allow muted autoplay); viewers can unmute from the controls.
 */
export default function TeamVideoPlayer({ video, title, autoPlayMuted = false }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (video.type !== 'hls') return undefined
    const el = videoRef.current
    if (!el) return undefined

    // React doesn't reliably reflect `muted` to the DOM, and autoplay needs it set before playback.
    if (autoPlayMuted) el.muted = true
    const tryPlay = () => {
      if (autoPlayMuted) el.play().catch(() => {})
    }

    let hls
    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = video.src
      tryPlay()
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          hls = new Hls()
          hls.loadSource(video.src)
          hls.attachMedia(el)
          hls.on(Hls.Events.MANIFEST_PARSED, tryPlay)
        }
      })
    }

    return () => {
      if (hls) hls.destroy()
    }
  }, [video, autoPlayMuted])

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

  return (
    <video
      ref={videoRef}
      className="w-full rounded-xl bg-black"
      controls
      autoPlay={autoPlayMuted}
      playsInline={autoPlayMuted}
    />
  )
}
