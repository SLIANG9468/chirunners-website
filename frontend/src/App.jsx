import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { CONTENT, LANGUAGE_STORAGE_KEY, resolveInitialLanguage } from './content/siteContent'
import './pages/Homepage.css'
import LandingPage from './pages/LandingPage'
import LocalRaceInfoPage from './pages/LocalRaceInfoPage'
import MarathonFaqPage from './pages/MarathonFaqPage'
import ChiHasBeenHerePage from './pages/ChiHasBeenHerePage'
import HistoryPage from './pages/HistoryPage'
import BoardMembersPage from './pages/BoardMembersPage'

export default function App() {
  const [language, setLanguage] = useState(resolveInitialLanguage)
  const copy = useMemo(() => CONTENT[language], [language])

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  return (
    <div className="homepage">
      <Navbar copy={copy} language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<LandingPage copy={copy} />} />
        <Route path="/history" element={<HistoryPage copy={copy} />} />
        <Route path="/board-members" element={<BoardMembersPage copy={copy} />} />
        <Route path="/local-race-info" element={<LocalRaceInfoPage copy={copy} />} />
        <Route path="/chicago-marathon-faq" element={<MarathonFaqPage copy={copy} />} />
        <Route path="/chi-has-been-here" element={<ChiHasBeenHerePage copy={copy} language={language} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="siteFooter">
        <p className="muted">{copy.footer(new Date().getFullYear())}</p>
      </footer>
    </div>
  )
}
