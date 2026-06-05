import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { absMediaUrl, apiUrl } from '../apiBase'
import HomeExploreCard from '../components/HomeExploreCard'
import HomeExploreSublinks from '../components/HomeExploreSublinks'

export default function LandingPage({ copy }) {
  const location = useLocation()
  const explore = copy.homeExplore
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

  useEffect(() => {
    if (!location.hash) return undefined
    const id = location.hash.replace(/^#/, '')
    if (!id) return undefined
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <main id="top" className="siteMain siteMain--landing">
      <section className="section homeHeroSection">
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
      </section>

      <section className="section homeExploreSection" aria-label={explore.sectionTitle}>
        <div className="homeExploreGrid">
          <HomeExploreCard
            id={explore.raceVolunteer.id}
            title={explore.raceVolunteer.title}
            description={explore.raceVolunteer.description}
            cta={explore.raceVolunteer.cta}
            to={explore.raceVolunteer.to}
          />
          <HomeExploreSublinks
            id={explore.marathon.id}
            title={explore.marathon.title}
            description={explore.marathon.description}
            sublinks={explore.marathon.sublinks}
          />
          <HomeExploreCard
            id={explore.checkins.id}
            title={explore.checkins.title}
            description={explore.checkins.description}
            cta={explore.checkins.cta}
            to={explore.checkins.to}
          />
          <HomeExploreSublinks
            id={explore.about.id}
            title={explore.about.title}
            description={explore.about.description}
            sublinks={explore.about.sublinks}
          />
        </div>
      </section>
    </main>
  )
}
