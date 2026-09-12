export default function Faq({ data }) {
  return (
    <section className="fv-section fv-section--tight fv-faq" id="faq">
      <div className="fv-wrap">
        <div className="fv-head fv-reveal">
          <span className="fv-eyebrow"><span className="n">/</span> {data.eyebrow}</span>
          <h2 className="fv-h2">{data.title}</h2>
        </div>
        {data.items.map((f, i) => (
          <details key={i} className="fv-reveal">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
