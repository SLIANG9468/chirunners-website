import { BOARD_MEMBERS } from '../content/siteContent'

function boardMemberInitials(name) {
  const text = String(name || '').trim()
  if (!text) return '?'
  const firstChar = text[0]
  if (/[\u4e00-\u9fff]/.test(firstChar)) {
    return firstChar
  }
  const parts = text.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const a = parts[0][0] || ''
    const b = parts[parts.length - 1][0] || ''
    return (a + b).toUpperCase()
  }
  return text.slice(0, 2).toUpperCase()
}

export default function BoardMembersPage({ copy }) {
  return (
    <main className="siteMain">
      <section id="board-members" className="section">
        <h2>{copy.boardMembersTitle}</h2>
        <ul className="boardMemberGrid">
          {BOARD_MEMBERS.map((row) => {
            const name = copy.boardMemberNames[row.key]
            const initials = boardMemberInitials(name)
            const photoUrl = row.photoUrl
            return (
              <li key={row.key} className="boardMemberCard">
                <div className="boardMemberAvatarWrap">
                  {photoUrl ? (
                    <img src={photoUrl} alt="" className="boardMemberPhoto" />
                  ) : (
                    <div className="boardMemberAvatarPlaceholder" aria-hidden="true">
                      {initials}
                    </div>
                  )}
                </div>
                <p className="boardMemberName">{name}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
