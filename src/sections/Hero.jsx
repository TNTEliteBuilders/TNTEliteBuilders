export default function Hero({ data, contact }) {
  return (
    <section className="fv-hero">
      <div className="fv-wrap fv-hero__grid">
        <div className="fv-reveal">
          <span className="fv-eyebrow"><span className="n">//</span> {data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p className="fv-lead">{data.lead}</p>
          <div className="fv-actions">
            {data.ctas.map((c) => (
              <a key={c.href} className={"btn " + (c.primary ? "btn--primary" : "btn--ghost")} href={c.href}>{c.label}</a>
            ))}
            <a className="btn btn--ghost" href={contact.phoneHref}>Call {contact.phone}</a>
          </div>
        </div>
        <aside className="fv-spec fv-spec--sheet fv-reveal" aria-label={data.spec.bar}>
          <span className="fv-spec__reg fv-spec__reg--tl" aria-hidden="true" />
          <span className="fv-spec__reg fv-spec__reg--tr" aria-hidden="true" />
          <span className="fv-spec__reg fv-spec__reg--bl" aria-hidden="true" />
          <span className="fv-spec__reg fv-spec__reg--br" aria-hidden="true" />
          <div className="fv-spec__bar">
            <span className="fv-spec__found" aria-hidden="true">
              <svg viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="1.6" width="20" height="10.8" rx="1.3" />
                <path d="M1 7 H21" />
                <path d="M7.4 7 V12.4 M14 7 V12.4" />
                <path d="M4.4 1.6 V7 M10.8 1.6 V7 M17.4 1.6 V7" />
              </svg>
            </span>
            {data.spec.bar}
          </div>
          {data.spec.rows.map((r) => (
            <div className="fv-spec__row" key={r.k}>
              <span className="k">{r.k}</span>
              <span className="v">{r.v}<small>{r.small}</small></span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
