import { useEffect, useState } from 'react'
import { absMediaUrl, apiUrl } from '../apiBase'

export default function LandingPage({ copy }) {
  const [homeHeroPhotos, setHomeHeroPhotos] = useState([])
  const [homeHeroPhotoIdx, setHomeHeroPhotoIdx] = useState(0)
  const [previousHomeHeroPhotoIdx, setPreviousHomeHeroPhotoIdx] = useState(null)
  const [isHomeHeroAnimating, setIsHomeHeroAnimating] = useState(false)
  const [homeHeroError, setHomeHeroError] = useState('')

  useEffect(() => {
    async function loadHomeHeroPhotos() {
      try {
        const response = await fetch(apiUrl('/api/home-hero/photos'))
        if (!response.ok) {
          setHomeHeroError(copy.homeHeroErrorLoad)
          return
        }
        const data = await response.json()
        const loadedPhotos = (data.photos || []).map((url) => absMediaUrl(url))
        setHomeHeroPhotos(loadedPhotos)
        setHomeHeroPhotoIdx(0)
      } catch {
        setHomeHeroError(copy.homeHeroErrorConnect)
      }
    }

    loadHomeHeroPhotos()
  }, [copy.homeHeroErrorConnect, copy.homeHeroErrorLoad])

  useEffect(() => {
    if (homeHeroPhotos.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setHomeHeroPhotoIdx((prev) => {
        setPreviousHomeHeroPhotoIdx(prev)
        setIsHomeHeroAnimating(true)
        return (prev + 1) % homeHeroPhotos.length
      })
    }, 3500)
    return () => window.clearInterval(timer)
  }, [homeHeroPhotos])

  useEffect(() => {
    if (!isHomeHeroAnimating) return undefined
    const animationTimer = window.setTimeout(() => {
      setIsHomeHeroAnimating(false)
      setPreviousHomeHeroPhotoIdx(null)
    }, 500)
    return () => window.clearTimeout(animationTimer)
  }, [isHomeHeroAnimating])

  return (
    <main id="top" className="siteMain">
      <section id="about" className="section">
        {homeHeroError ? <p className="errorText">{homeHeroError}</p> : null}
        {homeHeroPhotos.length > 0 ? (
          <div className="homeHeroBox">
            <div className="homeHeroTrack">
              {previousHomeHeroPhotoIdx !== null ? (
                <img
                  src={homeHeroPhotos[previousHomeHeroPhotoIdx]}
                  alt={`Homepage slideshow ${previousHomeHeroPhotoIdx + 1}`}
                  className={`homeHeroImage homeHeroImagePrev ${
                    isHomeHeroAnimating ? 'is-animating' : ''
                  }`}
                />
              ) : null}
              <img
                src={homeHeroPhotos[homeHeroPhotoIdx]}
                alt={`Homepage slideshow ${homeHeroPhotoIdx + 1}`}
                className={`homeHeroImage homeHeroImageCurrent ${
                  isHomeHeroAnimating ? 'is-animating' : ''
                }`}
              />
            </div>
          </div>
        ) : null}
        {copy.aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          {copy.stravaLabel}{' '}
          <a href="https://www.strava.com/clubs/chirunners" target="_blank" rel="noreferrer">
            https://www.strava.com/clubs/chirunners
          </a>
        </p>
      </section>

      <section className="section">
        <h2>{copy.routesTitle}</h2>
        <p>{copy.routesParagraph}</p>
        <p className="heatmapPlaceholder">{copy.heatmapPlaceholder}</p>
        <p>{copy.volunteerParagraph}</p>
      </section>

      <section className="section sponsor">
        <h2>{copy.sponsorTitle}</h2>
        <p>{copy.sponsorText}</p>
        <img
          src="https://chirunners.wordpress.com/wp-content/uploads/2022/01/roadrunnersports.png"
          alt="Road Runner Sports discount"
          className="sponsorImage"
        />
        <p className="muted">{copy.sponsorSubtext}</p>
      </section>
    </main>
  )
}

