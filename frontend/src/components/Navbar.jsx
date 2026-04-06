import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar({ copy, language, setLanguage }) {
  const location = useLocation()
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const aboutSectionActive =
    location.pathname === '/history' || location.pathname === '/board-members'

  const menuAriaLabel = mobileNavOpen ? copy.nav.menuClose : copy.nav.menu

  const closeMobileNav = () => setMobileNavOpen(false)

  return (
    <header className="siteHeader">
      <div className="siteHeaderTopBar">
        <NavLink to="/" className="brand">
          {copy.brand}
        </NavLink>
        <div className="siteHeaderActions">
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
          <button
            type="button"
            className={`navMenuToggle${mobileNavOpen ? ' is-open' : ''}`}
            aria-expanded={mobileNavOpen}
            aria-controls="primary-navigation"
            aria-label={menuAriaLabel}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            <span className="navMenuIcon" aria-hidden="true">
              <span className="navMenuIconBar" />
              <span className="navMenuIconBar" />
              <span className="navMenuIconBar" />
            </span>
          </button>
        </div>
      </div>
      <nav
        id="primary-navigation"
        className={`primaryNavPanel${mobileNavOpen ? ' is-open' : ''}`}
        aria-label="Primary"
      >
        <ul className="navList">
          <li>
            <NavLink to="/" end onClick={closeMobileNav}>
              {copy.nav.home}
            </NavLink>
          </li>
          <li>
            <NavLink to="/race-volunteer-info" onClick={closeMobileNav}>
              {copy.nav.raceVolunteer}
            </NavLink>
          </li>
          <li>
            <NavLink to="/chicago-marathon" onClick={closeMobileNav}>
              {copy.nav.marathonWelcome}
            </NavLink>
          </li>
          <li>
            <NavLink to="/chi-has-been-here" onClick={closeMobileNav}>
              {copy.nav.checkins}
            </NavLink>
          </li>
          <li className="navAboutJoinWrap">
            <div className="navAboutJoinRow">
              <div className="navAboutWrap">
                <button
                  type="button"
                  className={`navAboutTrigger${aboutSectionActive ? ' is-route-active' : ''}`}
                  aria-expanded={aboutMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setAboutMenuOpen((open) => !open)}
                >
                  {copy.nav.about}
                </button>
                {aboutMenuOpen ? (
                  <ul className="navDropdownMenu" role="list">
                    <li>
                      <NavLink
                        to="/history"
                        className="navDropdownLink"
                        onClick={() => {
                          setAboutMenuOpen(false)
                          closeMobileNav()
                        }}
                      >
                        {copy.nav.history}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/board-members"
                        className="navDropdownLink"
                        onClick={() => {
                          setAboutMenuOpen(false)
                          closeMobileNav()
                        }}
                      >
                        {copy.nav.boardMembers}
                      </NavLink>
                    </li>
                  </ul>
                ) : null}
              </div>
              <a
                className="navJoinButton"
                href={copy.nav.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileNav}
              >
                {copy.nav.join}
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
