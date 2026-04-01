import { VOLUNTEER_RACE_ROWS } from '../content/siteContent'

function formatRaceDate(isoDate, locale) {
  try {
    const d = new Date(`${isoDate}T12:00:00`)
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return isoDate
  }
}

function volunteerLinkFromWebsite(website, volunteerUrl) {
  if (volunteerUrl) return volunteerUrl
  if (website.includes('runsignup.com/Race/')) {
    return website.replace('runsignup.com/Race/', 'runsignup.com/RaceVolunteer/')
  }
  return website
}

export default function VolunteerRaceInfoPage({ copy, language }) {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US'

  return (
    <main className="siteMain">
      <section id="race-volunteer" className="section">
        <h2>{copy.volunteerRacesTitle}</h2>
        <p className="muted">{copy.volunteerRacesSubtitle}</p>

        <table className="raceTable">
          <thead>
            <tr>
              <th>{copy.volunteerTable.date}</th>
              <th>{copy.volunteerTable.location}</th>
              <th>{copy.volunteerTable.race}</th>
              <th>{copy.volunteerTable.website}</th>
              <th>{copy.volunteerTable.volunteerColumn}</th>
            </tr>
          </thead>
          <tbody>
            {VOLUNTEER_RACE_ROWS.map((row) => (
              <tr key={`${row.date}-${row.race}`}>
                <td>{formatRaceDate(row.date, locale)}</td>
                <td>{row.location}</td>
                <td>{row.race}</td>
                <td>
                  <a href={row.website} target="_blank" rel="noreferrer">
                    {copy.volunteerTable.officialSite}
                  </a>
                </td>
                <td>
                  <a
                    className="raceVolunteerButton"
                    href={volunteerLinkFromWebsite(row.website, row.volunteerUrl)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.volunteerTable.volunteerButton}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
