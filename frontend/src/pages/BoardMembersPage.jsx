import { BOARD_MEMBERS, BOARD_MEMBER_LABELS } from '../content/siteContent'

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

export default function BoardMembersPage({ copy, language }) {
  const nameLang = language === 'zh' ? 'zh' : 'en'

  return (
    <main className="siteMain">
      <section id="board-members" className="section">
        <h2>{copy.boardMembersTitle}</h2>
        <ul className="boardMemberGrid">
          {BOARD_MEMBERS.map((row) => {
            const labels = BOARD_MEMBER_LABELS[row.key]
            const name = labels[nameLang]
            const initials = boardMemberInitials(labels.en)
            const photoUrl = row.photoUrl
            return (
              <li key={row.key} className="boardMemberCard">
                <div className="boardMemberAvatarWrap">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={name}
                      className="boardMemberPhoto"
                      style={
                        row.photoOffsetX != null
                          ? { transform: `translateX(${row.photoOffsetX}px)` }
                          : undefined
                      }
                    />
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
