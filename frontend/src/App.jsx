import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import { CONTENT, LANGUAGE_STORAGE_KEY, resolveInitialLanguage } from './content/siteContent'
import './pages/Homepage.css'
import LandingPage from './pages/LandingPage'
import VolunteerRaceInfoPage from './pages/VolunteerRaceInfoPage'
import ChiHasBeenHerePage from './pages/ChiHasBeenHerePage'
import HistoryPage from './pages/HistoryPage'
import BoardMembersPage from './pages/BoardMembersPage'
import ChicagoMarathonWelcomePage from './pages/ChicagoMarathonWelcomePage'
import ChicagoMarathonTopicPage from './pages/ChicagoMarathonTopicPage'

export default function App() {
  const location = useLocation()
  const [language, setLanguage] = useState(resolveInitialLanguage)
  const copy = useMemo(() => CONTENT[language], [language])

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  return (
    <div className="homepage">
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
        <Route path="/chicago-marathon" element={<ChicagoMarathonWelcomePage copy={copy} />} />
        <Route
          path="/chicago-marathon/carb-loading-dinner"
          element={<ChicagoMarathonTopicPage copy={copy} topicId="carbLoading" />}
        />
        <Route
          path="/chicago-marathon/hotel"
          element={<ChicagoMarathonTopicPage copy={copy} topicId="hotel" />}
        />
        <Route
          path="/chicago-marathon/transportation"
          element={<ChicagoMarathonTopicPage copy={copy} topicId="transportation" />}
        />
        <Route
          path="/chicago-marathon-faq"
          element={<Navigate to="/chicago-marathon" replace />}
        />
        <Route path="/chi-has-been-here" element={<ChiHasBeenHerePage copy={copy} language={language} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="siteFooter">
        <p className="muted">{copy.footer(new Date().getFullYear())}</p>
      </footer>
    </div>
  )
}
