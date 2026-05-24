export default function SiteFooter({ copy }) {
  const sc = copy.stayConnected
  const year = new Date().getFullYear()

  return (
    <footer className="siteFooter">
      <section className="siteFooterStayConnected" aria-labelledby="site-footer-stay-connected">
        <h2 id="site-footer-stay-connected" className="siteFooterStayConnectedTitle">
          {sc.title}
        </h2>
        <p className="siteFooterStayConnectedBody">{sc.body}</p>
        <p className="siteFooterStayConnectedIntro">{sc.socialIntro}</p>
        <ul className="siteFooterStayConnectedLinks">
          {sc.socialLinks.map((item) => (
            <li key={item.label}>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.hint || undefined}
                  className="siteFooterSocialLink"
                >
                  {item.label}
                </a>
              ) : (
                <span className="siteFooterSocialLink siteFooterSocialLink--static" title={item.hint} role="note">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
        {sc.socialFootnote ? (
          <p className="siteFooterStayConnectedFootnote">{sc.socialFootnote}</p>
        ) : null}

        <div className="siteFooterCredits muted">
          <p>{copy.footerPhotoCreditLine1}</p>
          <p>{copy.footerPhotoCreditLine2}</p>
        </div>
      </section>

      <p className="siteFooterCopyright muted">{copy.footer(year)}</p>
    </footer>
  )
}
