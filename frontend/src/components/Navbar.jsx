import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar({ copy, language, setLanguage }) {
  const location = useLocation()
  const [homeMenuOpen, setHomeMenuOpen] = useState(false)

  const homeSectionActive =
    location.pathname === '/history' || location.pathname === '/board-members'

  return (
    <header className="siteHeader">
      <NavLink to="/" className="brand">
        {copy.brand}
      </NavLink>
      <div className="languageSwitch" aria-label="Language switch">
        <button
          type="button"
          className={language === 'en' ? 'active' : ''}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
        <span>|</span>
        <button
          type="button"
          className={language === 'zh' ? 'active' : ''}
          onClick={() => setLanguage('zh')}
        >
          中文
        </button>
      </div>
      <nav aria-label="Primary">
        <ul className="navList">
          <li className="navHomeWrap">
            <button
              type="button"
              className={`navHomeTrigger${homeSectionActive ? ' is-route-active' : ''}`}
              aria-expanded={homeMenuOpen}
              aria-haspopup="menu"
              onClick={() => setHomeMenuOpen((open) => !open)}
            >
              {copy.nav.home}
            </button>
            {homeMenuOpen ? (
              <ul className="navDropdownMenu" role="menu">
                <li role="none">
                  <NavLink
                    to="/history"
                    className="navDropdownLink"
                    role="menuitem"
                    onClick={() => setHomeMenuOpen(false)}
                  >
                    {copy.nav.history}
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink
                    to="/board-members"
                    className="navDropdownLink"
                    role="menuitem"
                    onClick={() => setHomeMenuOpen(false)}
                  >
                    {copy.nav.boardMembers}
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <NavLink to="/local-race-info">{copy.nav.races}</NavLink>
          </li>
          <li>
            <NavLink to="/chicago-marathon-faq">{copy.nav.marathon}</NavLink>
          </li>
          <li>
            <NavLink to="/chi-has-been-here">{copy.nav.checkins}</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
