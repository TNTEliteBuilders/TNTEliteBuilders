export default function Process({ data }) {
  return (
    <section className="fv-section fv-section--tight">
      <div className="fv-wrap">
        <div className="fv-head fv-reveal">
          <span className="fv-eyebrow"><span className="n">/</span> {data.eyebrow}</span>
          <h2 className="fv-h2">{data.title}</h2>
        </div>
        <div className="fv-steps">
          {data.steps.map((s) => (
            <div className="fv-step fv-reveal" key={s.n}>
              <span className="fv-step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
