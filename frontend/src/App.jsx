import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SiteFooter from './components/SiteFooter'
import { CONTENT, LANGUAGE_STORAGE_KEY, resolveInitialLanguage } from './content/siteContent'
import './pages/Homepage.css'
import LandingPage from './pages/LandingPage'
import VolunteerRaceInfoPage from './pages/VolunteerRaceInfoPage'
import ChiHasBeenHerePage from './pages/ChiHasBeenHerePage'
import HistoryPage from './pages/HistoryPage'
import BoardMembersPage from './pages/BoardMembersPage'
import ChicagoMarathonWelcomePage from './pages/ChicagoMarathonWelcomePage'
import CarbLoadingDinnerPage from './pages/CarbLoadingDinnerPage'
import ChicagoMarathonHotelPage from './pages/ChicagoMarathonHotelPage'
import ChicagoMarathonTransportationPage from './pages/ChicagoMarathonTransportationPage'
import ChiStorePage from './pages/ChiStorePage'

export default function App() {
  const location = useLocation()
  const [language, setLanguage] = useState(resolveInitialLanguage)
  const copy = useMemo(() => CONTENT[language], [language])

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  const isChiStore = location.pathname === '/chi-store'

  return (
    <div className={`homepage${isChiStore ? ' homepage--chiStore' : ''}`}>
      <Navbar key={location.pathname} copy={copy} language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<LandingPage copy={copy} />} />
        <Route path="/history" element={<HistoryPage copy={copy} />} />
        <Route
          path="/board-members"
          element={<BoardMembersPage copy={copy} language={language} />}
        />
        <Route path="/local-race-info" element={<Navigate to="/race-volunteer-info" replace />} />
        <Route
          path="/race-volunteer-info"
          element={<VolunteerRaceInfoPage copy={copy} language={language} />}
        />
        <Route path="/chicagomarathon" element={<ChicagoMarathonWelcomePage copy={copy} />} />
        <Route
          path="/chicagomarathon/carb-loading-dinner"
          element={<CarbLoadingDinnerPage copy={copy} language={language} />}
        />
        <Route path="/chicagomarathon/hotel" element={<ChicagoMarathonHotelPage copy={copy} />} />
        <Route
          path="/chicagomarathon/transportation"
          element={<ChicagoMarathonTransportationPage copy={copy} />}
        />
        <Route path="/chicago-marathon-faq" element={<Navigate to="/chicagomarathon" replace />} />
        <Route path="/chicagomarathon-faq" element={<Navigate to="/chicagomarathon" replace />} />
        <Route path="/chicago-marathon" element={<Navigate to="/chicagomarathon" replace />} />
        <Route
          path="/chicago-marathon/carb-loading-dinner"
          element={<Navigate to="/chicagomarathon/carb-loading-dinner" replace />}
        />
        <Route path="/chicago-marathon/hotel" element={<Navigate to="/chicagomarathon/hotel" replace />} />
        <Route
          path="/chicago-marathon/transportation"
          element={<Navigate to="/chicagomarathon/transportation" replace />}
        />
        <Route path="/chi-has-been-here" element={<ChiHasBeenHerePage copy={copy} language={language} />} />
        <Route path="/chi-store" element={<ChiStorePage copy={copy} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isChiStore ? <SiteFooter copy={copy} /> : null}
    </div>
  )
}
