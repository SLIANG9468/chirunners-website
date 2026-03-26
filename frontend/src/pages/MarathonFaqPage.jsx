export default function MarathonFaqPage({ copy }) {
  return (
    <main className="siteMain">
      <section id="marathon" className="section">
        <h2>{copy.marathonTitle}</h2>
        <p className="muted">{copy.marathonSubtitle}</p>
        {copy.marathonFaq.map((item) => (
          <details key={item.title} className="faqDetails">
            <summary>{item.title}</summary>
            <p>{item.body}</p>
          </details>
        ))}
      </section>
    </main>
  )
}

