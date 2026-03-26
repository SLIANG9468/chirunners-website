export default function HistoryPage({ copy }) {
  return (
    <main className="siteMain">
      <section id="history" className="section">
        <h2>{copy.historyTitle}</h2>
        {copy.historyParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </section>
    </main>
  )
}
